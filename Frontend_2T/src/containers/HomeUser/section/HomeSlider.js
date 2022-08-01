import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './HomeSlider.scss'
import poster1 from '../../../assets/images/poster_1.jpg'


class HomeSlider extends Component {

    render() {

        let settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1
        };

        return (
            <div className='slider-container'>
                <div className='slider-content'>
                    <Slider {...settings}>
                        <div className='slider-img'>
                            <img src={poster1} />
                        </div>
                        <div className='slider-img'>
                            <img src={poster1} />
                        </div>
                        <div className='slider-img'>
                            <img src={poster1} />
                        </div>
                        <div className='slider-img'>
                            <img src={poster1} />
                        </div>
                        <div className='slider-img'>
                            <img src={poster1} />
                        </div>
                        <div className='slider-img'>
                            <img src={poster1} />
                        </div>
                    </Slider>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeSlider);
