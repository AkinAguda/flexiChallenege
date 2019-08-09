import React from 'react';
import Styles from './index.module.css';

const Footer = () => (
  <div className={Styles.container}>
    <hr className={Styles.hr} />
    <div className={Styles.footer}>
      <div>
        <div>Terms of Use</div>
        <div>Privacy Policy</div>
      </div>
      <div>
        <div>All rights reserved JXI</div>
        <div className={Styles.last}>ContactID &copy;2019</div>
      </div>
    </div>
  </div>
);

export default Footer;
