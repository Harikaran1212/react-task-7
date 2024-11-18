// AdminDashboard.js
import React,{useState, useEffect} from "react";
import Navbar from "./Navbar";
import Users from "./Users";
import TaskList from "./TaskList";
import Tasks from "./Tasks";


const AdminDashboard = () => {
  const [activeMenuItem, setActiveMenuItem] = useState('users');

  useEffect(() => {
    
  }, [activeMenuItem]);

  return (
    <div>
      <Navbar setActiveMenuItem={setActiveMenuItem} />
      {activeMenuItem === 'users' && <Users/>}
      {activeMenuItem === 'taskLists' && <TaskList/>}
      {activeMenuItem === 'tasks' && <Tasks />}
    </div>
 
  );

};

export default AdminDashboard;