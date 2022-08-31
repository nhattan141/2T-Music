import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { path } from '../../utils'
import './HomeHeader.scss'
import logo from '../../assets/images/neon_2.png'
import avatar from '../../assets/images/avatar.jpg'
import * as actions from "../../store/actions";

class HomeHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    handleBackHome = () => {
        this.props.history.push(path.HomeUser)
    }

    handleViewLogin = () => {
        this.props.history.push(path.LOGIN)
    }

    handleViewUserInfo = () => {
        this.props.history.push(path.USERINFO)
    }

    handleLogout = () => {
        this.props.processLogout()
        this.props.history.push(path.HomeUser)
    }

    handleViewFavorites = () => {
        this.props.history.push(path.FAVORITE)
    }

    render() {
        const { processLogout, userInfo } = this.props;
        return (
            <div className='home-header-container'>
                <div className='home-header-content'>
                    <div className='left-content'
                        onClick={() => this.handleBackHome()}
                    >
                        <img src={logo} />
                    </div>
                    <div className='mid-content'>
                        <div className='search_group'>
                            <i className="fas fa-search"></i>
                            <input type='test' name='search' className='search' />
                        </div>
                    </div>
                    <div className='right-content'>
                        {
                            userInfo && userInfo.roleId === 0 ?
                                <div className='user-info-container'>
                                    <div className='user-info-content'>
                                        <div className='user-info-name'>
                                            {userInfo.firstName} {userInfo.lastName}
                                        </div>
                                        <div className='user-info-avatar'>
                                            <img src={avatar} />
                                            <div className='user-info-control'>
                                                <div className='control'
                                                    onClick={() => this.handleViewUserInfo()}
                                                >
                                                    Thông tin cá nhân
                                                </div>
                                                <div className='control'
                                                    onClick={() => this.handleViewFavorites()}
                                                >
                                                    Nhạc yêu thích
                                                </div>
                                                <div className='control'
                                                    onClick={() => this.handleLogout()}
                                                >
                                                    Đăng xuất
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                :
                                <button className='login-btn'
                                    onClick={() => this.handleViewLogin()}
                                >Login</button>
                        }
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
