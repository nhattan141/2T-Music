import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class HomeAdmin extends Component {

    render() {
        const { isLoggedIn, userInfo } = this.props;
        let linkToRedirect = '/login'
        if (isLoggedIn) {
            linkToRedirect = userInfo.roleId === 0 ? '/home' : '/system/user-manage'
        }
        // if (isLoggedIn && userInfo.roleId === 0) {
        //     linkToRedirect = '/home'
        // } else {
        //     linkToRedirect = '/system/user-manage'
        // }

        return (
            <Redirect to={linkToRedirect} />
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeAdmin);
