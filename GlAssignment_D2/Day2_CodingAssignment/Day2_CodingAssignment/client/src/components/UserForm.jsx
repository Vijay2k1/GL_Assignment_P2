import React, { useState } from "react";
import axios from "axios";

const UserForm = ({ onUserAdded }) => {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:5000/users", { name });
    onUserAdded(response.data);
    setName("");
  };

  return (
    <div>
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
          required
        />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default UserForm;
