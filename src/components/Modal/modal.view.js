import React, { useState } from 'react';
import styles from './modal.module.css';

// eslint-disable-next-line
const Modal = ({ open, handleCloseModal, modalType }) => {
  const [descriptionInput, setDescriptionInput] = useState();
  const [iconInput, setIconInput] = useState('coffee');
  const [colorInput, setColorInput] = useState('#000000');

  const create = () => {
    const url = `http://localhost:3001/${modalType}`;
    let bodyContent = {};

    if (modalType === 'task') {
      bodyContent = {
        description: descriptionInput,
        completed: false,
      };
    } else if (modalType === 'collection') {
      bodyContent = {
        name: descriptionInput,
        isDefaultCollection: false,
        icon: iconInput,
        color: colorInput,
      };
    }

    const options = {
      method: 'POST',
      headers: new Headers({ Accept: 'apllication/json', 'Content-type': 'application/json' }),
      mode: 'cors',
      body: JSON.stringify(bodyContent),
    };

    fetch(url, options)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  if (open) {
    return modalType === 'profile' ? (
      <div className={styles.overlay} onClick={handleCloseModal}>
        <div className={styles.modalBody}>
          <p className={styles.p}>Profile Modal</p>
          <button type="button" onClick={handleCloseModal}>
            Close
          </button>
        </div>
      </div>
    ) : (
      <div className={styles.overlay} onClick={handleCloseModal}>
        <div className={styles.modalBody}>
          <p className={styles.modalTitle}>{`+ Add new ${modalType}`}</p>
          <p className={styles.inputLabel}>{`${modalType} description`}</p>
          <input
            className={styles.mainInput}
            type="text"
            placeholder={`Write new ${modalType}`}
            onChange={(e) => setDescriptionInput(e.target.value)}
          />
          {modalType === 'collection' && (
            <>
              <p className={styles.p}>Select Icon</p>
              <select name="icons" onChange={(e) => setIconInput(e.target.value)}>
                <option value="coffee">Coffee</option>
                <option value="car">Car</option>
                <option value="user">User</option>
                <option value="chalkboard-teacher">Chalkboard</option>
                <option value="desktop">Screen</option>
                <option value="camera">Camera</option>
                <option value="dog">Dog</option>
              </select>
              <p className={styles.p}>Select Color</p>
              <input type="color" onChange={(e) => setColorInput(e.target.value)} />
            </>
          )}
          <div className={styles.buttonsRow}>
            <button type="button" onClick={handleCloseModal}>
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                create();
                handleCloseModal();
              }}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default Modal;