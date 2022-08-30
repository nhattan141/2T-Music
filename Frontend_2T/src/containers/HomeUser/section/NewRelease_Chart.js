import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { path } from '../../../utils'
import './NewRelease_Chart.scss'
import poster1 from '../../../assets/images/poster_1.jpg'
import * as actions from '../../../store/actions/index'

class NewRleaseChart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newReleaseSongs: [],
            top3Songs: [],
            favoriteSongs: [],
            userInfo: {},
            favoriteSongIds: [],
        };
    }



    componentDidMount() {
        this.props.getNewReleaseSongs()
        this.props.getTop3Songs()
        if (this.props.userInfo) {

            setTimeout(() => {
                this.props.getFavoriteSongOfUser(this.props.userInfo.id)
            }, 10)
        }

    }

    componentDidUpdate(prevProps, prevState, nextProps) {
        if (prevProps.newReleaseSongs !== this.props.newReleaseSongs) {
            this.setState({
                newReleaseSongs: this.props.newReleaseSongs
            });
        }
        if (prevProps.top3Songs !== this.props.top3Songs) {
            this.setState({
                top3Songs: this.props.top3Songs
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
            if (!this.props.userInfo) {
                this.setState({
                    favoriteSongs: [],
                    userInfo: {},
                    favoriteSongIds: [],
                })
            }
        }
    }

    handleGetSongToPlay = (song) => {
        this.props.getSongToPlay(song)
    }

    handleViewAllSongs = () => {
        this.props.history.push(path.ALLSONGS)
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

        console.log('favorite songs: ', this.state.favoriteSongs);
        console.log('favorite song ids: ', this.state.favoriteSongIds);
        let { newReleaseSongs, top3Songs } = this.state
        return (
            <div className='new-release-chart-container'>
                <div className='new-release-chart-content'>
                    <div className='new-release-container'>
                        <div className='new-release-content'>
                            <div className='new-release-header'>
                                <div className='new-release-title'>Mới phát hành</div>
                                <div className='new-release-button'
                                    onClick={() => this.handleViewAllSongs()}
                                >
                                    Xem tất cả
                                    <i className="fas fa-angle-right"></i>
                                </div>
                            </div>
                            <div className='new-release-body'>
                                {
                                    newReleaseSongs && newReleaseSongs.length > 0 &&
                                    newReleaseSongs.map((song, index) => (
                                        <div className='new-release-child' key={index}>
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
                    <div className='chart-container'>
                        <div className='chart-content'>
                            <div className='chart-header'>
                                <div className='chart-title'>
                                    Top 3
                                    <i className="fas fa-crown"></i>
                                </div>
                            </div>
                            <div className='chart-body'>
                                {
                                    top3Songs && top3Songs.length > 0 &&
                                    top3Songs.map((song, index) => (
                                        <div className='chart-child' key={index}
                                            onClick={() => this.handleGetSongToPlay(song)}
                                        >
                                            <div className='child-content'>
                                                <div className='child-left'>
                                                    <i className="fas fa-crown"></i>
                                                </div>
                                                <div className='child-mid'>
                                                    <img src={song.img} />
                                                </div>
                                                <div className='child-right'>
                                                    <div className='child-mid-song-name'>{song.songName}</div>
                                                    <div className='child-mid-artiss-name'>{song.singer}</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
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
        isLoggedIn: state.user.isLoggedIn,
        newReleaseSongs: state.song.newReleaseSongs,
        top3Songs: state.song.top3Songs,
        songPlay: state.song.songPlay,
        userInfo: state.user.userInfo,
        favoriteSongs: state.song.favoriteSongs
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getNewReleaseSongs: () => dispatch(actions.getNewReleaseSongs()),
        getTop3Songs: () => dispatch(actions.getTop3Songs()),
        getSongToPlay: (song) => dispatch(actions.getSongToPlay(song)),
        addFavoriteSong: (songId, userId) => dispatch(actions.addFavoriteSong(songId, userId)),
        getFavoriteSongOfUser: (userId) => dispatch(actions.getFavoriteSongOfUser(userId)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewRleaseChart));
