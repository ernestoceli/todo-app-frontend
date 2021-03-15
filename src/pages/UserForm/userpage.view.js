import React from 'react';
import UserForm from '../../components/UserForm';
import styles from './userpage.module.css';

const UserPage = () => (
  <div>
    <UserForm />
    <p className={styles.pHere}>Somthing Else I Guess</p>
  </div>
);

export default UserPage;
