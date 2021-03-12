import React from 'react';
import styles from './task.module.css';

// eslint-disable-next-line
const Task = ({ taskInfo, taskClicked }) => (
  <button
    type="button"
    // eslint-disable-next-line
    className={!taskInfo.completed ? styles.taskPending : styles.taskCompleted}
    // eslint-disable-next-line
    onClick={() => taskClicked(taskInfo._id)}
  >
    {/* eslint-disable-next-line */}
    {taskInfo.description}
  </button>
);

export default Task;
