import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Styles from './index.module.css';
import Navigation from '../Navigation';
import Footer from '../Footer';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queryValue: '',
      isLoaded: false,
      data: [],
    };
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

  handleSubmit() {
    axios.get('https://randomuser.me/api/?results=3').then(res => {
      console.log(res);
      this.setState({
        isLoaded: true,
        data: [...res.data.results],
      });
    });
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      queryValue: e.target.value,
    });
  }

  render() {
    const {
      isSearch,
      match: {
        params: { query },
      },
    } = this.props;
    const { queryValue, isLoaded, data } = this.state;
    return (
      <>
        <Navigation />
        <div className={Styles.searchSection}>
          <h1>Get contact information from just a name!</h1>
          <p>Search up to 500,000 records in seconds</p>
          <input
            type="search"
            placeholder="Enter a name and hit enter to search, eg. Joseph"
            value={queryValue}
            onChange={this.handleChange.bind(this)}
          />
        </div>
        {isSearch ? (
          <>
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
                  data.map(each => (
                    <div key={each.login.uuid} className={Styles.card}>
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
