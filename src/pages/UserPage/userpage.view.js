import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UserForm from '../../components/UserForm';
import styles from './userpage.module.css';

const UserPage = ({ userNameFunc }) => {
  const [userArray, setUserArray] = useState();

  const getUserFirstName = (fullName) => {
    const fullNameArray = fullName.split(' ');
    return fullNameArray[0];
  };

  useEffect(() => {
    fetch('http://localhost:3001/user')
      .then((res) => res.json())
      .then((data) => {
        setUserArray(data);
        console.log(userArray);
      });
  }, []);

  return (
    <div className={styles.mainPage}>
      <p className={styles.pHere}>Create User</p>
      <UserForm />
      <p className={styles.pHere}>Select User</p>
      <select name="Users" onChange={(e) => userNameFunc(getUserFirstName(e.target.value))}>
        <option value="none" selected disabled hidden>
          Select User
        </option>
        {userArray && userArray.map((user) => <option>{user.name}</option>)}
      </select>
      <Link to="/" className={styles.button}>
        Go to tasks
      </Link>
    </div>
  );
};

export default UserPage;
