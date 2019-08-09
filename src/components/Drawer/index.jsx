import React, { Component } from 'react';
import Styles from './index.module.css';

class Drawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  toggleNave() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    const { open } = this.props;
    return (
      <div className={open ? Styles.drawer : Styles.drawerClose}>
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
  }
}

export default Drawer;
