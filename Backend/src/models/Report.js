const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MySchema = new Schema({
  type: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  dateTime: {
    type: Date,
    required: true,
    default: Date.now
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }
});

// Create a 2dsphere index on location to enable geospatial queries
MySchema.index({ location: '2dsphere' });

const MyModel = mongoose.model('Report', MySchema);

module.exports = MyModel;
