import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, getDocs } from "firebase/firestore"; 
import "./css/table.css";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
  
  try { 
    const usersRef = collection(db, "Tasks");
    const snapshot = await getDocs(usersRef);
    
    const usersData = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setTasks(usersData);
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

fetchTasks();
}, []);


const formatDate = (timestamp) => {
  if (!timestamp?.seconds) {
    return "N/A"; // Default fallback for missing timestamps
  }
const date = new Date(timestamp.seconds * 1000); 
return date.toLocaleString(); 
};
  return (
    <div className='container'>
      <h2>Tasks</h2>
      <table>
        <thead>
          <tr>
            <th>Task Title</th>
            <th>Task Description</th>
            <th>Task List Title</th>
            <th>Created By</th>
            <th>Creation Time</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.todoList}</td>
              <td>{task.userEmail}</td>
              <td>{formatDate(task.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tasks;