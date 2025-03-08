import React, { Component } from "react";
import axios from "axios";

class UserList extends Component {
  state = { users: [] };

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users");
      this.setState({ users: response.data });
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  render() {
    return (
      <div>
        <h2>User List</h2>
        <ul>
          {this.state.users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default UserList;
