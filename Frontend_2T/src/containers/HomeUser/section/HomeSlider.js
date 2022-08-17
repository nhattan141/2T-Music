import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './HomeSlider.scss'
import poster1 from '../../../assets/images/poster_1.jpg'
import * as actions from '../../../store/actions/index'


class HomeSlider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            songsArr: [],
        }
    }

    componentDidMount() {
        this.props.getRecentSongs()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.recentSongs !== this.props.recentSongs) {
            this.setState({
                songsArr: this.props.recentSongs
            })
        }
    }

    render() {

        let settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1
        };
        let { songsArr } = this.state
        return (
            <div className='slider-container'>
                <div className='slider-content'>
                    <Slider {...settings}>
                        {
                            songsArr && songsArr.length > 0 &&
                            songsArr.map((song, index) => (
                                <div className='slider-img' key={index}>
                                    <img src={song.img} />
                                </div>
                            ))
                        }
                    </Slider>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        recentSongs: state.song.recentSongs,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getRecentSongs: () => dispatch(actions.getRecentSongs())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeSlider);
