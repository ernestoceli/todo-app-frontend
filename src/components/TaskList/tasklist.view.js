import React, { useState, useEffect } from 'react';
import styles from './tasklist.module.css';
import Task from '../Task/task.view';

const TaskList = ({ newTaskClicked, triggerRefresh, fromCollection }) => {
  const [allTasksArray, setAllTasksArray] = useState();
  const [pendingTasksArray, setPendingTasksArray] = useState();
  const [completedTasksArray, setCompletedTasksArray] = useState();
  const [taskChangeStatus, setTaskChangeStatus] = useState(false);

  // Refresh coming from new task created on modal

  useEffect(() => {
    const options = {
      method: 'POST',
      headers: new Headers({ Accept: 'apllication/json', 'Content-type': 'application/json' }),
      mode: 'cors',
      body: JSON.stringify({ parentCollection: fromCollection }),
    };

    fetch('http://localhost:3001/task/search', options)
      .then((response) => response.json())
      .then((data) => {
        setAllTasksArray(data);
        setPendingTasksArray(allTasksArray.filter((task) => task.completed === false));
        setCompletedTasksArray(allTasksArray.filter((task) => task.completed === true));
      })
      .catch((error) => console.log(error));
  }, [triggerRefresh]);

  // Finally could make it refresh on a single click when task changes status, to refactor later

  useEffect(() => {
    const options = {
      method: 'POST',
      headers: new Headers({ Accept: 'apllication/json', 'Content-type': 'application/json' }),
      mode: 'cors',
      body: JSON.stringify({ parentCollection: fromCollection }),
    };

    fetch('http://localhost:3001/task/search', options)
      .then((response) => response.json())
      .then((data) => {
        setAllTasksArray(data);
      })
      .catch((error) => console.log(error));
  }, [taskChangeStatus, fromCollection, triggerRefresh]);

  useEffect(() => {
    if (allTasksArray) {
      setPendingTasksArray(allTasksArray.filter((task) => task.completed === false));
      setCompletedTasksArray(allTasksArray.filter((task) => task.completed === true));
    }
  }, [allTasksArray]);

  const handleTaskClicked = (taskId) => {
    const clickedTask = allTasksArray.find((element) => element._id === taskId); //eslint-disable-line

    const options = {
      method: 'POST',
      headers: new Headers({ Accept: 'apllication/json', 'Content-type': 'application/json' }),
      mode: 'cors',
      body: JSON.stringify({ parentCollection: fromCollection }),
    };

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

    fetch('http://localhost:3001/task/search', options)
      .then((response) => response.json())
      .then((data) => {
        setAllTasksArray(data);
      })
      .catch((error) => console.log(error));
  };

  const handleTaskDelete = (taskId) => {
    fetch(`http://localhost:3001/task/${taskId}`, { method: 'DELETE' })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  return (
    <>
      {fromCollection && (
        <>
          <div className={styles.taskListContainer}>
            <h3 className={styles.taskListTitle}>{fromCollection.name}</h3>
            <div className={styles.taskListHeader}>
              <li className={styles.floatLeft}>Pending</li>
              <li className={styles.floatRight}>
                {pendingTasksArray ? `${pendingTasksArray.length} ` : 'loading'}
                tasks
              </li>
            </div>
            {pendingTasksArray && pendingTasksArray.length > 0 ? (
              pendingTasksArray.map((task) => (
                <Task
                  taskClicked={(id) => {
                    handleTaskClicked(id);
                    setTaskChangeStatus(!taskChangeStatus);
                  }}
                  taskInfo={task}
                />
              ))
            ) : (
              <p>No pending tasks</p>
            )}
            <div className={styles.taskListHeader}>
              <li className={styles.floatLeft}>Completed</li>
              <li className={styles.floatRight}>
                {completedTasksArray ? `${completedTasksArray.length} ` : 'loading'}
                tasks
              </li>
            </div>
            {completedTasksArray && completedTasksArray.length > 0 ? (
              completedTasksArray.map((task) => (
                <Task
                  taskClicked={(id) => {
                    handleTaskClicked(id);
                    setTaskChangeStatus(!taskChangeStatus);
                  }}
                  taskInfo={task}
                  deleteTask={handleTaskDelete}
                />
              ))
            ) : (
              <p>No completed tasks</p>
            )}
          </div>
          <button type="button" className={styles.addNew} onClick={newTaskClicked}>
            + Add task
          </button>
        </>
      )}
    </>
  );
};

export default TaskList;
