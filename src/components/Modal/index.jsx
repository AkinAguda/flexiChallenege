import React from 'react';
import Styles from './index.module.css';

const Modal = ({
  name: { first, last },
  gender,
  dob: { age },
  nat,
  phone,
  email,
  location: { street },
  picture: { large },
  closeModal,
}) => (
  <div className={Styles.container}>
    <div
      className={Styles.close}
      onClick={closeModal}
      onKeyPress={closeModal}
      tabIndex="0"
      role="button"
    />
    <div className={Styles.modal}>
      <img src={large} alt="profile" />
      <p className={Styles.name}>{`${first} ${last}`}</p>
      <p className={Styles.gender}>{`${gender}, ${age}`}</p>
      <p className={Styles.nat}>{nat}</p>
      <div className={Styles.row}>
        <p>{phone}</p>
        <p>{email}</p>
        <p>{street}</p>
      </div>
    </div>
  </div>
);

export default Modal;
