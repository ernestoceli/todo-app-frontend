import React, { useState, useEffect } from 'react';
import styles from './tasklist.module.css';
import Task from '../Task/task.view';

const TaskList = () => {
  const [allTasksArray, setAllTasksArray] = useState();
  const [pendingTasksArray, setPendingTasksArray] = useState();
  const [completedTasksArray, setCompletedTasksArray] = useState();

  useEffect(() => {
    fetch('http://localhost:3001/task')
      .then((response) => response.json())
      .then((data) => {
        setAllTasksArray(data);
        setPendingTasksArray(allTasksArray.filter((task) => task.completed === false));
        setCompletedTasksArray(allTasksArray.filter((task) => task.completed === true));
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (allTasksArray) {
      setPendingTasksArray(allTasksArray.filter((task) => task.completed === false));
      setCompletedTasksArray(allTasksArray.filter((task) => task.completed === true));
    }
  }, [allTasksArray]);

  const handleTaskClicked = (taskId) => {
    const clickedTask = allTasksArray.find((element) => element._id === taskId); //eslint-disable-line

    if (!clickedTask.completed) {
      fetch(`http://localhost:3001/task/${taskId}`, {
        method: 'PUT',
        headers: new Headers({ Accept: 'apllication/json', 'Content-type': 'application/json' }),
        mode: 'cors',
        body: JSON.stringify({ completed: true }),
      });
    } else if (clickedTask.completed) {
      fetch(`http://localhost:3001/task/${taskId}`, {
        method: 'PUT',
        headers: new Headers({ Accept: 'apllication/json', 'Content-type': 'application/json' }),
        mode: 'cors',
        body: JSON.stringify({ completed: false }),
      });
    }

    fetch('http://localhost:3001/task')
      .then((response) => response.json())
      .then((data) => {
        setAllTasksArray(data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className={styles.taskListContainer}>
      <h3>Work</h3>
      <div className={styles.taskListHeader}>
        <li className={styles.floatLeft}>Pending</li>
        <li className={styles.floatRight}>
          {pendingTasksArray ? `${pendingTasksArray.length} ` : 'loading'}
          tasks
        </li>
      </div>
      {pendingTasksArray && pendingTasksArray.length > 0 ? (
        pendingTasksArray.map((task) => <Task taskClicked={handleTaskClicked} taskInfo={task} />)
      ) : (
        <p>Nothing yet</p>
      )}
      <div className={styles.taskListHeader}>
        <li className={styles.floatLeft}>Completed</li>
        <li className={styles.floatRight}>
          {completedTasksArray ? `${completedTasksArray.length} ` : 'loading'}
          tasks
        </li>
      </div>
      {completedTasksArray && completedTasksArray.length > 0 ? (
        completedTasksArray.map((task) => <Task taskClicked={handleTaskClicked} taskInfo={task} />)
      ) : (
        <p>Nothing yet</p>
      )}
    </div>
  );
};

export default TaskList;
