import React, { useState } from 'react';
import styles from './userform.module.css';

const UserForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const createUser = () => {
    const url = 'http://localhost:3001/user';
    const body = {
      email,
      password,
      name,
    };

    const options = {
      method: 'POST',
      headers: new Headers({ Accept: 'apllication/json', 'Content-type': 'application/json' }),
      mode: 'cors',
      body: JSON.stringify(body),
    };

    fetch(url, options)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  const handleName = (value) => {
    setName(value);
  };

  const handlePassword = (value) => {
    setPassword(value);
  };

  const handleEmail = (value) => {
    setEmail(value);
  };

  return (
    <form className={styles.userform}>
      <p>Email</p>
      <input type="text" onChange={(e) => handleEmail(e.target.value)} />
      <p>Password</p>
      <input type="password" onChange={(e) => handlePassword(e.target.value)} />
      <p>Name</p>
      <input type="text" onChange={(e) => handleName(e.target.value)} />
      <p />
      <button type="button" onClick={createUser}>
        Create User
      </button>
    </form>
  );
};

export default UserForm;
