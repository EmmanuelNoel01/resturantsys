import React from 'react';
import './delete.css';

const DeletePage = () => {
  const handleDelete = () => {
    fetch('/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log('User deleted successfully');
        } else {
          console.error('Error deleting user');
        }
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
      });
  };

  return (
    <div className="delete-page">
      <h1>Delete</h1>
      <button className="delete-button" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default DeletePage;
