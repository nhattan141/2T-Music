import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss'
import logo from '../../assets/images/neon_2.png'

class HomeHeader extends Component {

    render() {

        return (
            <div className='home-header-container'>
                <div className='home-header-content'>
                    <div className='left-content'>
                        <img src={logo} />
                    </div>
                    <div className='mid-content'>
                        <div className='search_group'>
                            <i className="fas fa-search"></i>
                            <input type='test' name='search' className='search' />
                        </div>
                    </div>
                    <div className='right-content'>
                        <button className='login-btn'>Login</button>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
