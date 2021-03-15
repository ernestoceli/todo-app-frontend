import React, { useState } from 'react';
import NavBar from '../../components/NavBar/navbar.view';
import SideBar from '../../components/SideBar/sidebar.view';
import TaskList from '../../components/TaskList/tasklist.view';
import Modal from '../../components/Modal/modal.view';
import styles from './window.module.css';

const Window = () => {
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState();

  return (
    <div className={styles.main}>
      {openModal && (
        <Modal open modalType={modalType} handleCloseModal={() => setOpenModal(false)} />
      )}
      <NavBar
        profileClicked={() => {
          setModalType('profile');
          setOpenModal(true);
        }}
      />
      <div className={styles.row}>
        <SideBar
          triggerRefresh={openModal}
          buttonClicked={() => {
            setModalType('collection');
            setOpenModal(true);
          }}
        />
        <TaskList
          triggerRefresh={openModal}
          newTaskClicked={() => {
            setModalType('task');
            setOpenModal(true);
          }}
        />
      </div>
    </div>
  );
};

export default Window;
