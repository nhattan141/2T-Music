import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss'
import logo from '../../assets/images/neon_2.png'
import avatar from '../../assets/images/avatar.jpg'
import * as actions from "../../store/actions";

class HomeHeader extends Component {



    render() {
        const { processLogout, userInfo } = this.props;
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
                                                <div className='control'>
                                                    Thông tin cá nhân
                                                </div>
                                                <div className='control'>
                                                    Nhạc yêu thích
                                                </div>
                                                <div className='control'
                                                    onClick={processLogout}
                                                >
                                                    Đăng xuất
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                :
                                <button className='login-btn'
                                    onClick={() => { }}
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
