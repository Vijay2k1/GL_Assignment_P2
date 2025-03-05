import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import styled from 'styled-components';

const socket = io("http://localhost:5000");

const TaskDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  
  useEffect(() => {
    // Listen for task updates from the server
    socket.on('loadTasks', (loadedTasks) => {
      setTasks(loadedTasks);
    });
    socket.on('taskUpdated', (updatedTasks) => {
      setTasks(updatedTasks);
    });
    return () => {
      socket.off('loadTasks');
      socket.off('taskUpdated');
    };
  }, []);
  
  const addTask = () => {
    if (newTask.trim()) {
      const task = { id: Date.now(), title: newTask, assignee: "Team Member", deadline: "2025-03-06" };
      socket.emit('addTask', task);
      setNewTask('');
    }
  };

  const deleteTask = (id) => {
    socket.emit('deleteTask', id);
  };

  return (
    <Container>
      <h1>Task Dashboard</h1>
      <Input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Enter task"
      />
      <Button onClick={addTask}>Add Task</Button>
      <TaskList>
        {tasks.map(task => (
          <TaskItem key={task.id}>
            <span>{task.title}</span>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </TaskItem>
        ))}
      </TaskList>
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
  background-color: #f4f4f4;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  width: 300px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
`;

const TaskList = styled.ul`
  list-style-type: none;
`;

const TaskItem = styled.li`
  background-color: #fff;
  margin: 5px 0;
  padding: 10px;
  display: flex;
  justify-content: space-between;
`;

export default TaskDashboard;
