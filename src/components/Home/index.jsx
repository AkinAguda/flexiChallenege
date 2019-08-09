import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import Styles from './index.module.css';
import Navigation from '../Navigation';
import Footer from '../Footer';
import Modal from '../Modal';
import Drawer from '../Drawer';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queryValue: '',
      isLoaded: false,
      data: [],
      isModalOpen: false,
      modalProps: {},
      navOpen: false,
      toQuery: false,
    };
    this.toggelModal = this.toggelModal.bind(this);
  }

  componentDidMount() {
    const {
      match: {
        params: { query },
      },
    } = this.props;
    this.setState({
      queryValue: query,
    });
    this.handleSubmit();
  }

  submit(e) {
    e.preventDefault();
    // eslint-disable-next-line no-unused-expressions
    <Redirect from="/" to={`/search/${this.state.queryValue}`} />;
  }

  handleSubmit() {
    axios.get('https://randomuser.me/api/?results=3').then(res => {
      this.setState({
        isLoaded: true,
        data: [...res.data.results],
      });
    });
  }

  handleChange(e) {
    e.preventDefault();
    console.log(e.keyCode);
    this.setState({
      queryValue: e.target.value,
    });
    if (e.keyCode == 13) {
      // eslint-disable-next-line no-unused-expressions
    }
  }

  toggelModal(data) {
    const { isModalOpen } = this.state;
    this.setState({
      modalProps: { ...data },
      isModalOpen: !isModalOpen,
    });
    console.log(this.isModalOpen);
  }

  toggeleNav() {
    this.setState({
      toggeleNav: !this.state.toggeleNav,
    });
  }

  render() {
    const {
      isSearch,
      match: {
        params: { query },
      },
    } = this.props;
    const { queryValue, isLoaded, data, isModalOpen, modalProps } = this.state;
    return (
      <>
        <div className={Styles.button} onClick={this.toggeleNav} />
        <Navigation />
        <Drawer open={this.state.toggeleNav} />
        <div className={Styles.searchSection}>
          <h1>Get contact information from just a name!</h1>
          <p>Search up to 500,000 records in seconds</p>
          <form>
            <input
              type="search"
              placeholder="Enter a name and hit enter to search, eg. Joseph"
              value={queryValue}
              onChange={this.handleChange.bind(this)}
            />
            {/* <imput type="submit" onClick={() => this.submit} /> */}
            <button onClick={this.submit.bind(this)}>sub</button>
          </form>
        </div>
        {isSearch ? (
          <>
            {isModalOpen && (
              <Modal {...modalProps} closeModal={this.toggelModal} />
            )}
            <div className={Styles.searchRes}>
              <p>
                Top results for
                <span>
                  {" '"}
                  {queryValue}
                  {"'"}
                </span>
              </p>
              <div className={Styles.results}>
                {!isLoaded ? (
                  <>
                    <div className={Styles.placeholder} />
                    <div className={Styles.placeholder} />
                    <div className={Styles.placeholder} />
                  </>
                ) : (
                  data.map((each, i, arr) => (
                    <div
                      key={each.login.uuid}
                      className={Styles.card}
                      onClick={this.toggelModal.bind(this, arr[i])}
                      tabIndex="0"
                      role="button"
                      onKeyPress={this.toggelModal.bind(this, arr)}
                    >
                      <div>
                        <img src={each.picture.medium} alt={each.name.first} />
                      </div>
                      <div>
                        <div className={Styles.row}>
                          <h5>{`${each.name.first} ${each.name.last}`}</h5>
                          <p className={Styles.nat}>{each.nat}</p>
                        </div>
                        <p className={Styles.phone}>{each.phone}</p>
                        <p className={Styles.email}>{each.email}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className={Styles.hiw}>
              <div className={Styles.hiwContainer}>
                <h1>How it works.</h1>
                <div className={Styles.steps}>
                  <div className={Styles.step}>
                    <img src="/images/how-it-works-1.png" alt="hiw1" />
                    <div>
                      <span>1.</span>
                      Type a name and hit enter to start searching
                    </div>
                  </div>
                  <div className={Styles.step}>
                    <img src="/images/how-it-works-2.png" alt="hiw2" />
                    <div>
                      <span>2.</span>
                      Get instant results with contact details
                    </div>
                  </div>
                  <div className={Styles.step}>
                    <img src="/images/how-it-works-3.png" alt="hiw3" />
                    <div>
                      <span>3.</span>
                      Sign up or sign in to reveal more information
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={Styles.contact}>
              <div className={Styles.contactInfo}>
                <h1>Need more information on a contact?</h1>
                <p>
                  Get started with your account today and access up to 500,000
                  records with our instant search. If you already have an
                  account with us, simply
                  <a href="/">sign in</a>
                </p>
                <a href="/" className={Styles.started}>
                  Get Started
                </a>
              </div>
              <div className={Styles.demoContentContainer}>
                <img
                  src="/images/demo-content.png"
                  alt="demo-content"
                  className={Styles.demoContent}
                />
              </div>
            </div>
          </>
        )}
        <Footer />
      </>
    );
  }
}

Home.propTypes = {
  isSearch: PropTypes.bool,
  match: PropTypes.shape({
    params: PropTypes.shape({
      query: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

Home.defaultProps = {
  isSearch: false,
  match: {
    params: {
      query: undefined,
    },
  },
};
export default Home;
