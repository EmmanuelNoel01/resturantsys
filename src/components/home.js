import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './home.css'; 

function RestaurantList() {
  const [users, setusers] = useState([]);

  useEffect(() => {
    fetch('/data')
      .then(response => response.json())
      .then(data => setusers(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div className="restaurant-list-container">
      <h1>Restaurant List</h1>
      <ul className="restaurant-list">
        {users.map((users, index) => (
          <li key={index} className="users-item">
            <Link to={`/delete/${users.id}`}>
              <p>Cuisine: {users.cuisine}</p>
              <p>Location: {users.location}</p>
              <p>Name: {users.username}</p>
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/login" className="create-button">Create</Link>
    </div>
  );
}

export default RestaurantList;
