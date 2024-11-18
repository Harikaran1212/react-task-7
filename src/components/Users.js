import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, getDocs } from "firebase/firestore";
import "./css/table.css";
const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
  
        const usersRef = collection(db, "users");
        const snapshot = await getDocs(usersRef);
  
        const usersData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  
  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000); 
    return date.toLocaleString(); 
  };
  return (
    <div className="container">
      <h2>Users</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Password</th>
            <th>Signup Time</th>
            <th>IP</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{formatDate(user.createdAt)}</td>
              <td>{user.ip}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;