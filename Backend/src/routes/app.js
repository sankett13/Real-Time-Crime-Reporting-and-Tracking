const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('../../../config');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const Report = require('../models/Report')




const port = process.env.PORT || 8080;
const app = express();
const mongoURI = config.mongoURI;
const sec = '47qc65noqieal674tinsxjknfakqwjr;odkw589p8';

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(session({
  secret: 'yourSessionSecret', // Replace with your own secret
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set secure to true if using https
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(mongoURI) // Corrected dbName option
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from this origin
  credentials: true // Enable credentials (cookies, authorization headers, etc.)
}));

const salt = bcrypt.genSaltSync(10);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(new GoogleStrategy({
  clientID: '186323848512-q3mbqm3nkph6ab885oj4fnnh1m279q76.apps.googleusercontent.com',
  clientSecret: ' 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',
  callbackURL: '/'
}, async (accessToken, refreshToken, profile, done) => {
  const existingUser = await User.findOne({ googleId: profile.id });
  if (existingUser) {
    return done(null, existingUser);
  }

  const user = new User({
    googleId: profile.id,
    username: profile.displayName,
    email: profile.emails[0].value
  });
  await user.save();
  done(null, user);
}));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      console.log('User not found');
      return res.status(401).json({ message: 'User not found' });
    }
    const validatePassword = await bcrypt.compare(password, user.password);
    if (validatePassword) {
      jwt.sign({ username, id: user._id, isAdmin: user.isAdmin }, sec, {}, (err, token) => {
        if (err) throw err;
        res.cookie('token', token).json({
          id: user._id,
          username,
          isAdmin: user.isAdmin, // Sending isAdmin status to the client
        });
      });
      console.log('Logged in');
    } else {
      res.status(401).json({ message: 'Invalid password' });
    }
  } catch (error) {
    console.error('Error logging in:', error.message);
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
});
app.post('/signup', async (req, res) => {
  console.log("into signup");
  const { email, username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      username: username,
      password: hashedPassword,
      email: email
    });
    console.log(user);
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
});

app.post('/logout', (req, res) => {
  req.logout(); // Logout user using Passport
  res.cookie('token', '').json('ok');
});

app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
  res.redirect('/');
});



app.post('/report', async (req, res) => {
  const { type, location, dateTime, description } = req.body;

  // Create a new instance of the MyModel with the data from the request body
  const newReport = new Report({
    type,
    description,
    dateTime: new Date(dateTime),
    location: {
      type: 'Point',
      coordinates: location.coordinates // Assuming location.coordinates is an array of [longitude, latitude]
    }
  });

  try {
    // Save the new report to the database
    await newReport.save();
    res.status(200).json({ message: 'Report saved successfully' });
  } catch (error) {
    console.error('Error saving report:', error);
    res.status(500).json({ message: 'Failed to save the report', error: error.message });
  }
});


app.post('/des', (req, res) => {
  res.cookie('token', '').json('Logout successful');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});