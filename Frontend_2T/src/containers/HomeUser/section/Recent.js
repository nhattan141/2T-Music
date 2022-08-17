import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Recent.scss'
import * as actions from '../../../store/actions/index'


class Recent extends Component {

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
        // console.log("songsArr: ", this.props.recentSongs);
        // console.log("songsArr state: ", this.state.songsArr);

        let { songsArr } = this.state
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
                        {
                            songsArr && songsArr.length > 0 &&
                            songsArr.map((song, index) => (
                                <div className='recent-child' key={index}>
                                    <img src={song.img} />
                                    <div className="middle">
                                        <i className="far fa-play-circle"></i>
                                    </div>
                                </div>
                            ))
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
        recentSongs: state.song.recentSongs,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getRecentSongs: () => dispatch(actions.getRecentSongs())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Recent);
