import React, { Component } from 'react';
import { connect } from 'react-redux';
import { path } from '../../utils';
import { withRouter } from 'react-router';
import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import './Header.scss';

class Header extends Component {

    handleLogout = () => {
        this.props.processLogout()
        this.props.history.push(path.LOGIN)
    }

    render() {
        const { processLogout, userInfo } = this.props;
        console.log('User infor: ', userInfo);

        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={adminMenu} />
                </div>
                <span>
                    Welcome
                    {userInfo && userInfo.roleId === 1 && userInfo.firstName ? userInfo.lastName : ''}
                </span>
                {/* nút logout */}
                <div className="btn btn-logout" onClick={() => this.handleLogout()}>
                    <i className="fas fa-sign-out-alt"></i>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
