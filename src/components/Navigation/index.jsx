import React from 'react';
import Styles from './index.module.css';

const Navigation = () => (
  <div className={Styles.navigation}>
    <img src="/images/logo.png" alt="logo" />
    <ul>
      <li>
        <a href="/">home</a>
      </li>
      <li>
        <a href="/">about</a>
      </li>
      <li>
        <a href="/">pricing</a>
      </li>
      <li>
        <a href="/">login</a>
      </li>
      <li>
        <a href="/">sign in</a>
      </li>
    </ul>
  </div>
);
export default Navigation;
