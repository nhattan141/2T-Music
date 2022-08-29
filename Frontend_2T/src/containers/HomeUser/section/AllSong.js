import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './AllSong.scss'
import * as actions from '../../../store/actions'
import HomeHeader from '../HomeHeader'
import MusicPlayer from './MusicPlayer'
import { withRouter } from 'react-router';

class AllSong extends Component {
    constructor(props) {
        super(props)
        this.state = {
            songsArr: [],
        }
    }

    componentDidMount() {
        this.props.getAllSongs()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listSongs !== this.props.listSongs) {
            this.setState({
                songsArr: this.props.listSongs
            })
        }
    }

    handleGetSongToPlay = (song) => {
        this.props.getSongToPlay(song)
    }

    handleBackHome = () => {
        this.props.history.push('/home')
    }

    render() {

        let { songsArr, currentSong } = this.state
        return (
            <>
                <HomeHeader />
                <div className='all-song-container'>
                    <div className='all-song-content'>
                        <div className='all-song-header'>
                            <div className='all-song-button'
                                onClick={() => this.handleBackHome()}
                            >
                                <i className="fas fa-angle-left"></i>
                                Trang chủ
                            </div>
                        </div>
                        <div className='all-song-body'>
                            {
                                songsArr && songsArr.length > 0 &&
                                songsArr.map((song, index) => (
                                    <div className='all-song-child' key={index}
                                        onClick={() => this.handleGetSongToPlay(song)}
                                    >
                                        <div className='child-content'>
                                            <div className='child-left'>
                                                <img src={song.img} />
                                                <div className="middle">
                                                    <i className="fas fa-play"></i>
                                                </div>
                                            </div>
                                            <div className='child-mid'>
                                                <div className='child-mid-song-name'>{song.songName}</div>
                                                <div className='child-mid-artiss-name'>{song.singer}</div>
                                            </div>
                                            <div className='child-right'>
                                                <i className="far fa-heart"></i>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <MusicPlayer />
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        listSongs: state.admin.songs,
        songPlay: state.song.songPlay,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllSongs: () => dispatch(actions.getAllSongs()),
        getSongToPlay: (song) => dispatch(actions.getSongToPlay(song)),

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllSong));
