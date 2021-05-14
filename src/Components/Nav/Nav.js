import React, { Component } from 'react';
import axios from 'axios';
import homeLogo from './../../assets/home_logo.png';
import newLogo from './../../assets/new_logo.png';
import logoutLogo from './../../assets/shut_down.png';
import './Nav.css';
import { Link, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import { updateUser, logout} from '../../redux/reducer'

class Nav extends Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
    this.getUser = this.getUser.bind(this);
  }

  componentDidMount() {
    this.getUser()
  }

  getUser() {
    axios.get('/api/auth/me')
    .then(res=>{
      console.log('test')
      this.props.reducer.updateUser(res.data)

    })
    .catch(err=>{
      console.log(err)
    })
  }
  
  logout() {
    axios.post('/api/auth/logout')
      .then(res=> this.props.reducer.logout())
      .catch(err=>console.log(err))
  }
  
  render() {
    // console.log(this.props.reducer.profilePic)
      return this.props.location.pathname !== '/' &&
        <div className='nav'>
          <div className='nav-profile-container'>
            <div className='nav-profile-pic' style={{backgroundImage:`url('${this.props.reducer.profilePic}')`}}></div>
            <p>{this.props.reducer.username}</p>
          </div>
          <div className='nav-links'>
            <Link to='/dash'><img className='nav-img' src={homeLogo} alt='home' /></Link>
            <Link to='/form'><img className='nav-img' src={newLogo} alt='new post' /></Link>
          </div>
          <Link to='/'><img className='nav-img logout' src={logoutLogo} alt='logout' onClick={this.logout} /></Link>
        </div>
  }
}

const mapStateToProps =(state) => state 

export default withRouter(connect(mapStateToProps, {updateUser, logout})(Nav));