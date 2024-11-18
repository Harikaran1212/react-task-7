import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, getDocs, query, where} from "firebase/firestore";
import "./css/table.css";

const TaskList = () => {
  const [taskLists, setTaskLists] = useState([]);

  useEffect(() => {
    const fetchTaskLists = async () => {
      try {
        const taskListsRef = collection(db, "TodoLists");
        const snapshot = await getDocs(taskListsRef);

        const taskListsData = await Promise.all(snapshot.docs.map(async (doc) => {
          const tasksRef = collection(db, "Tasks");
          const tasksSnapshot = await getDocs(query(tasksRef, where("todoList", "==", doc.data().title)));
          const numberOfTasks = tasksSnapshot.docs.length;

          return {
            id: doc.id,
            ...doc.data(),
            numberOfTasks: numberOfTasks
          };
        }));

        setTaskLists(taskListsData);
      } catch (error) {
        console.error('Error fetching task lists:', error);
      }
    };

    fetchTaskLists();
  }, []);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleString();
  };

  return (
    <div className='container'>
      <h2>Task Lists</h2>
      <table>
        <thead>
          <tr>
            <th>Task List Title</th>
            <th>Created By</th>
            <th>No of Tasks</th>
            <th>Creation Time</th>
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {taskLists.map(taskList => (
            <tr key={taskList.id}>
              <td>{taskList.title}</td>
              <td>{taskList.userEmail}</td>
              <td>{taskList.numberOfTasks}</td>
              <td>{formatDate(taskList.createdAt)}</td>
              <td>{formatDate(taskList.updateAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;