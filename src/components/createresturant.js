import React, { useState, useEffect } from "react";
import axios from "axios";
import "./createresturant.css";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    cuisine: "",
    location: "",
    image: null,
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("password", formData.password);
      formDataToSend.append("cuisine", formData.cuisine);
      formDataToSend.append("location", formData.location);
      formDataToSend.append("image", formData.image);
      formDataToSend.append("username", formData.username);

      
      const response = await axios.post("/login", formDataToSend);
      
      console.log(response.data);
    } catch (error) {
      setError(error.response.data.message);
      console.error(error);
    }
  };

  useEffect(() => {
  }, []);

  return (
    <div className="cover">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter User Name"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Enter Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Enter Cuisine Type"
          name="cuisine"
          value={formData.cuisine}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Enter Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />
        <input
          type="file"
          accept="image/*"
          name="image"
          onChange={handleChange}
        />
        {error && <p className="error">{error}</p>}
        <button type="submit" className="login-btn">
          LOG IN
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
