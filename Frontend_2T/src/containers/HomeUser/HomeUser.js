import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import HomeSlider from './section/HomeSlider';
import Recent from './section/Recent';
import NewRelease_Chart from './section/NewRelease_Chart';
import MusicPlayer from './section/MusicPlayer';

import './HomeUser.scss'

class HomeUser extends Component {

    render() {
        return (
            <>
                <HomeHeader />
                <HomeSlider />
                <Recent />
                <NewRelease_Chart />
                <MusicPlayer />
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeUser);
