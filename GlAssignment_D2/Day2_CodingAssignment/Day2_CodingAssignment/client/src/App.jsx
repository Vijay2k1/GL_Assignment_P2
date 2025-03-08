import React, { useState } from "react";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";

const App = () => {
  const [users, setUsers] = useState([]);

  const handleUserAdded = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  return (
    <div>
      <h1>User Management System</h1>
      <UserForm onUserAdded={handleUserAdded} />
      <UserList key={users.length} />
    </div>
  );
};

export default App;
