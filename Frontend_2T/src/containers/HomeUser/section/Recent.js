import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Recent.scss'
import poster1 from '../../../assets/images/poster_1.jpg'


class Recent extends Component {

    render() {

        return (
            <div className='recent-container'>
                <div className='recent-content'>
                    <div className='recent-header'>
                        <div className='recent-title'>Gần đây</div>
                        <div className='recent-button'>
                            Xem tất cả
                            <i className="fas fa-angle-right"></i>
                        </div>
                    </div>
                    <div className='recent-body'>
                        <div className='recent-child'>
                            <img src={poster1} />
                            <div className="middle">
                                <i className="far fa-play-circle"></i>
                            </div>
                        </div>
                        <div className='recent-child'>
                            <img src={poster1} />
                            <div className="middle">
                                <i className="far fa-play-circle"></i>
                            </div>
                        </div>
                        <div className='recent-child'>
                            <img src={poster1} />
                            <div className="middle">
                                <i className="far fa-play-circle"></i>
                            </div>
                        </div>
                        <div className='recent-child'>
                            <img src={poster1} />
                            <div className="middle">
                                <i className="far fa-play-circle"></i>
                            </div>
                        </div>
                        <div className='recent-child'>
                            <img src={poster1} />
                            <div className="middle">
                                <i className="far fa-play-circle"></i>
                            </div>
                        </div>
                        <div className='recent-child'>
                            <img src={poster1} />
                            <div className="middle">
                                <i className="far fa-play-circle"></i>
                            </div>
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Recent);
