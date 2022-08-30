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
            favoriteSongs: [],
            userInfo: {},
            favoriteSongIds: [],
        }
    }

    componentDidMount() {
        this.props.getAllSongs()
        if (this.props.userInfo) {

            setTimeout(() => {
                this.props.getFavoriteSongOfUser(this.props.userInfo.id)
            }, 10)
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listSongs !== this.props.listSongs) {
            this.setState({
                songsArr: this.props.listSongs
            })
        }
        if (prevProps.userInfo !== this.props.userInfo) {
            this.props.userInfo &&
                this.props.getFavoriteSongOfUser(this.props.userInfo.id)

        }
        if (prevProps.favoriteSongs !== this.props.favoriteSongs) {
            this.setState({
                favoriteSongs: this.props.favoriteSongs
            })

            for (let i = 0; i < this.props.favoriteSongs.length; i++)
                this.state.favoriteSongIds.push(this.props.favoriteSongs[i].songID)
        }
    }

    handleGetSongToPlay = (song) => {
        this.props.getSongToPlay(song)
    }

    handleBackHome = () => {
        this.props.history.push('/home')
    }

    handleAddFavoriteSong = (song) => {
        let { userInfo } = this.props
        if (userInfo) {
            this.isExistFavoriteSong(song)
            let heart = document.getElementById(song.id)
            heart.classList.add('fas')
            heart.classList.add('active')
            heart.classList.remove('far')
            this.props.addFavoriteSong(song.id, userInfo.id)
        }
    }

    isExistFavoriteSong = (song) => {
        return this.state.favoriteSongIds.find((favoriteSongId) =>
            favoriteSongId === song.id
        )
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
                                    <div className='all-song-child' key={index}>
                                        <div className='child-content'>
                                            <div className='child-left'
                                                onClick={() => this.handleGetSongToPlay(song)}
                                            >
                                                <img src={song.img} />
                                                <div className="middle">
                                                    <i className="fas fa-play"></i>
                                                </div>
                                            </div>
                                            <div className='child-mid'>
                                                <div className='child-mid-song-name'>{song.songName}</div>
                                                <div className='child-mid-artiss-name'>{song.singer}</div>
                                            </div>
                                            <div className='child-right'
                                                onClick={() => this.handleAddFavoriteSong(song)}
                                            >
                                                {
                                                    this.isExistFavoriteSong(song) ?
                                                        <i className="fas fa-heart active"></i> :
                                                        <i className="far fa-heart " id={song.id}></i>
                                                }
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
        userInfo: state.user.userInfo,
        favoriteSongs: state.song.favoriteSongs
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllSongs: () => dispatch(actions.getAllSongs()),
        getSongToPlay: (song) => dispatch(actions.getSongToPlay(song)),
        addFavoriteSong: (songId, userId) => dispatch(actions.addFavoriteSong(songId, userId)),
        getFavoriteSongOfUser: (userId) => dispatch(actions.getFavoriteSongOfUser(userId)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllSong));
