import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './Favorites.scss'
import * as actions from '../../../store/actions'
import HomeHeader from '../HomeHeader'
import MusicPlayer from './MusicPlayer'
import { withRouter } from 'react-router';
import { path } from '../../../utils'

class Favorites extends Component {
    constructor(props) {
        super(props)
        this.state = {
            favoriteSongs: [],
            userInfo: {},
            favoriteSongIds: [],
        }
    }

    componentDidMount() {
        if (this.props.userInfo) {
            // setTimeout(() => {
            this.props.getFavoriteSongOfUser(this.props.userInfo.id)
            // }, 10)
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
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
        this.props.history.push(path.HomeUser)
    }

    handleDeleteFavoriteSong = (favoriteId, userId) => {
        this.props.deleteFavoriteSongOfUser(favoriteId, userId)
    }

    render() {

        let { favoriteSongs, currentSong } = this.state
        let { userInfo } = this.props
        return (
            <>
                <HomeHeader />
                <div className='favorites-container'>
                    <div className='favorites-content'>
                        <div className='favorites-header'>
                            <div className='favorites-button'
                                onClick={() => this.handleBackHome()}
                            >
                                <i className="fas fa-angle-left"></i>
                                Trang chủ
                            </div>
                            <div className='favorites-title'>Danh sách yêu thích</div>
                        </div>
                        <div className='favorites-body'>
                            {
                                favoriteSongs && favoriteSongs.length > 0 &&
                                favoriteSongs.map((song, index) => (
                                    <div className='favorites-child' key={index}>
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
                                                onClick={() => this.handleDeleteFavoriteSong(song.id, userInfo.id)}
                                            >
                                                <i className="fas fa-trash"></i>
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
        songPlay: state.song.songPlay,
        userInfo: state.user.userInfo,
        favoriteSongs: state.song.favoriteSongs
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getSongToPlay: (song) => dispatch(actions.getSongToPlay(song)),
        getFavoriteSongOfUser: (userId) => dispatch(actions.getFavoriteSongOfUser(userId)),
        deleteFavoriteSongOfUser: (favoriteId, userId) => dispatch(actions.deleteFavoriteSongOfUser(favoriteId, userId))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Favorites));
