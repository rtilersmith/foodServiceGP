import React, { Component } from 'react';
// import axios from 'axios'
import './Landing.css'
import Modal from 'react-modal'
import Map from '../../RP/Map'
import { connect } from 'react-redux'
import { getRestaurants } from '../../../Redux/reducers/rest'
import { Link } from 'react-router-dom'
import RandomBtn from '../../Reuse/RandomBtn';


class Landing extends Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: true
    }
  }

  login = () => {
    let auth0domain = `https://${process.env.REACT_APP_AUTH0_DOMAIN}`
    let clientId = process.env.REACT_APP_AUTH0_CLIENT_ID
    let scope = encodeURIComponent('openid profile email')
    let redirectUri = encodeURIComponent(`${window.location.origin}/auth/callback`)

    let location = `${auth0domain}/authorize?client_id=${clientId}&scope=${scope}&redirect_uri=${redirectUri}&response_type=code`

    window.location = location
  }

  openModal = () => {
    this.setState({ modalIsOpen: true })
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false })
  }
  componentWillMount() {
    Modal.setAppElement('body');
  }

geoFindMe=()=> {
  var output = document.getElementById("out");

  if (!navigator.geolocation){
    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }

  function success(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;
    console.log(latitude, "lat", longitude, "long")
  }

  function error() {
    alert('cannot find your location')
  }
  navigator.geolocation.watchPosition(success, error);
}


  render() {
    return (
      <div className="App">
        <Modal
          isOpen={this.state.modalIsOpen}
          className='modal'
          overlayClassName='Overlay'
        >
          <div className='dropdown'>
            <button className='dropbtn'>Price</button>
            <div className='dropdown-content'>
              <span>Random</span>
              <span>$</span>
              <span>$$</span>
              <span>$$$</span>
              <span>$$$$</span>
            </div>
          </div>
          <div className='type-drop'>
            <button className='type-dropbtn'>Cuisine</button>
            <div className='type-dropcontent'>
              <span>Ethiopian</span>
            </div>
          </div>

          <button onClick={this.geoFindMe}>Location</button>

          <span>- or -</span>
          <input placeholder='zipcode' />
          <button >Search</button>

          <br />

          <Link to='/restaurants'><button>Randomize!</button></Link>
          {/* This button will later be replaced with the RandomBtn component */}

          <br />

          <button onClick={this.login}>Login</button>
          {/* Login successfully logs you in as well as takes you directly to favorites */}

          <button onClick={() => this.props.getRestaurants()}>Get Rest</button>
          {/* This 'Get Rest' button replaces the functionality of the location button or the zip input. What it does it put the 20 restaurants onto state, which get location will later do while also submitting lat and lon onto the variables */}

          <RandomBtn />
        </Modal>
        <Map styles={{ height: 'calc(120vh - 175px)' }} />
      </div>
    );
  }
}

export default connect(null, { getRestaurants })(Landing);