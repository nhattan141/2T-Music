import React, { Component } from 'react';
import { connect } from 'react-redux';
import './NewRelease_Chart.scss'
import poster1 from '../../../assets/images/poster_1.jpg'

class NewRleaseChart extends Component {

    render() {

        return (
            <div className='new-release-chart-container'>
                <div className='new-release-chart-content'>
                    <div className='new-release-container'>
                        <div className='new-release-content'>
                            <div className='new-release-header'>
                                <div className='new-release-title'>Mới phát hành</div>
                                <div className='new-release-button'>
                                    Xem tất cả
                                    <i className="fas fa-angle-right"></i>
                                </div>
                            </div>
                            <div className='new-release-body'>
                                <div className='new-release-child'>
                                    <div className='child-content'>
                                        <div className='child-left'>
                                            <img src={poster1} />
                                            <div className="middle">
                                                <i className="fas fa-play"></i>
                                            </div>
                                        </div>
                                        <div className='child-mid'>
                                            <div className='child-mid-song-name'>Cảm ơn và xin lỗi</div>
                                            <div className='child-mid-artiss-name'>Melocee</div>
                                        </div>
                                        <div className='child-right'>
                                            <i className="far fa-heart"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className='new-release-child'>
                                    <div className='child-content'>
                                        <div className='child-left'>
                                            <img src={poster1} />
                                            <div className="middle">
                                                <i className="fas fa-play"></i>
                                            </div>
                                        </div>
                                        <div className='child-mid'>
                                            <div className='child-mid-song-name'>Cảm ơn và xin lỗi</div>
                                            <div className='child-mid-artiss-name'>Melocee</div>
                                        </div>
                                        <div className='child-right'>
                                            <i className="far fa-heart"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className='new-release-child'>
                                    <div className='child-content'>
                                        <div className='child-left'>
                                            <img src={poster1} />
                                            <div className="middle">
                                                <i className="fas fa-play"></i>
                                            </div>
                                        </div>
                                        <div className='child-mid'>
                                            <div className='child-mid-song-name'>Cảm ơn và xin lỗi</div>
                                            <div className='child-mid-artiss-name'>Melocee</div>
                                        </div>
                                        <div className='child-right'>
                                            <i className="far fa-heart"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className='new-release-child'>
                                    <div className='child-content'>
                                        <div className='child-left'>
                                            <img src={poster1} />
                                            <div className="middle">
                                                <i className="fas fa-play"></i>
                                            </div>
                                        </div>
                                        <div className='child-mid'>
                                            <div className='child-mid-song-name'>Cảm ơn và xin lỗi</div>
                                            <div className='child-mid-artiss-name'>Melocee</div>
                                        </div>
                                        <div className='child-right'>
                                            <i className="far fa-heart"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className='new-release-child'>
                                    <div className='child-content'>
                                        <div className='child-left'>
                                            <img src={poster1} />
                                            <div className="middle">
                                                <i className="fas fa-play"></i>
                                            </div>
                                        </div>
                                        <div className='child-mid'>
                                            <div className='child-mid-song-name'>Cảm ơn và xin lỗi</div>
                                            <div className='child-mid-artiss-name'>Melocee</div>
                                        </div>
                                        <div className='child-right'>
                                            <i className="far fa-heart"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className='new-release-child'>
                                    <div className='child-content'>
                                        <div className='child-left'>
                                            <img src={poster1} />
                                            <div className="middle">
                                                <i className="fas fa-play"></i>
                                            </div>
                                        </div>
                                        <div className='child-mid'>
                                            <div className='child-mid-song-name'>Cảm ơn và xin lỗi</div>
                                            <div className='child-mid-artiss-name'>Melocee</div>
                                        </div>
                                        <div className='child-right'>
                                            <i className="far fa-heart"></i>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className='chart-container'>
                        <div className='chart-content'>
                            <div className='chart-header'>
                                <div className='chart-title'>
                                    Top 3
                                    <i className="fas fa-crown"></i>
                                </div>
                            </div>
                            <div className='chart-body'>
                                <div className='chart-child'>
                                    <div className='child-content'>
                                        <div className='child-left'>
                                            <i className="fas fa-crown"></i>
                                        </div>
                                        <div className='child-mid'>
                                            <img src={poster1} />
                                        </div>
                                        <div className='child-right'>
                                            <div className='child-mid-song-name'>Cảm ơn và xin lỗi</div>
                                            <div className='child-mid-artiss-name'>Melocee</div>
                                        </div>
                                    </div>
                                </div>
                                <div className='chart-child'>
                                    <div className='child-content'>
                                        <div className='child-left'>
                                            <i className="fas fa-crown"></i>
                                        </div>
                                        <div className='child-mid'>
                                            <img src={poster1} />
                                        </div>
                                        <div className='child-right'>
                                            <div className='child-mid-song-name'>Cảm ơn và xin lỗi</div>
                                            <div className='child-mid-artiss-name'>Melocee</div>
                                        </div>
                                    </div>
                                </div>
                                <div className='chart-child'>
                                    <div className='child-content'>
                                        <div className='child-left'>
                                            <i className="fas fa-crown"></i>
                                        </div>
                                        <div className='child-mid'>
                                            <img src={poster1} />
                                        </div>
                                        <div className='child-right'>
                                            <div className='child-mid-song-name'>Cảm ơn và xin lỗi</div>
                                            <div className='child-mid-artiss-name'>Melocee</div>
                                        </div>
                                    </div>
                                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(NewRleaseChart);
