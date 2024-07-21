import { useState } from "react";

const CreateUserForm = ({ onUserCreate }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "", // "admin" or "police"
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Replace with your API call to create a new user
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // User created successfully, clear form and notify parent component
        setFormData({ email: "", password: "", role: "" });
        onUserCreate(formData); // Pass created user data to parent component
      } else {
        console.error("Error creating user:", await response.text());
        // Handle error (e.g., display error message to user)
      }
    } catch (error) {
      console.error("Error creating user:", error);
      // Handle error (e.g., display error message to user)
    }
  };

  return (
    <>
      <div className="flex h-screen justify-center h-auto">
        <form onSubmit={handleSubmit} className="bg-white w-[40vw] p-10 rounded shadow-md">
          <div className="mb-4 ">
            <label htmlFor="email" className="block mb-2 text-sm font-medium">
              Email:
            </label>
            <input
              id="email"
              type="email"
              name="email"
              className="px-3 py-2 border rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 w-full"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 text-sm font-medium">
              Password:
            </label>
            <input
              id="password"
              type="password"
              name="password"
              className="px-3 py-2 border rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 w-full"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="role" className="block mb-2 text-sm font-medium">
              Role:
            </label>
            <select
              id="role"
              name="role"
              className="border rounded px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 w-full"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="police">Police</option>
            </select>
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white font-bold rounded shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 disabled:opacity-50"
          >
            Create User
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateUserForm;
