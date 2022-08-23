import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MusicPlayer.scss'
import poster1 from '../../../assets/images/poster_1.jpg'
import song1 from '../../../assets/audios/song_1.mp3'
import * as actions from '../../../store/actions'

class MusicPlayer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            songIndex: '',
            isPlaying: false,
            isRepeat: false,
            currentSong: {},
            songsArr: [],
        }
    }

    componentDidMount() {
        this.props.getAllSongs()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.songPlay !== this.props.songPlay) {
            this.setState({
                songIndex: '',
                isPlaying: false,
                isRepeat: false,
                currentSong: this.props.songPlay,
            })

            const timeline = document.querySelector('.timeline')
            const img = document.querySelector('.music-player-img')
            const repeat = document.querySelector('.rebeat')
            const playerbtn = document.querySelector('.player-button')
            timeline.value = 0
            timeline.style.backgroundSize = '0% 100%'
            img.classList.remove('rotate-img')
            repeat.classList.remove('active')
            playerbtn.classList.remove('active')
        }

        if (prevProps.listSongs !== this.props.listSongs) {
            this.setState({
                songsArr: this.props.listSongs
            })
        }
    }

    toggleAdudio = () => {
        const audio = document.querySelector('audio')
        const img = document.querySelector('.music-player-img')
        const playerbtn = document.querySelector('.player-button')

        playerbtn.classList.add('active')

        if (audio.paused) {
            audio.play()

            this.setState({
                isPlaying: !this.state.isPlaying
            })

            if (!this.state.isPlaying) {
                this.handleRotateImg()
            }
        } else {
            audio.pause()
            img.style.animationPlayState = 'paused';

            this.setState({
                isPlaying: !this.state.isPlaying
            })
        }
    }

    handleRotateImg = () => {
        const img = document.querySelector('.music-player-img')

        img.classList.add('rotate-img')
        img.style.animationPlayState = 'running';
    }

    changeTimeline = () => {
        const audio = document.querySelector('audio')
        const timeline = document.querySelector('.timeline')
        const percentagePosition = (100 * audio.currentTime) / audio.duration;
        const img = document.querySelector('.music-player-img')

        // thay doi timeline theo thoi gian thuc
        timeline.style.backgroundSize = `${percentagePosition}% 100%`;
        timeline.value = percentagePosition;

        // chay het bai thi reset lai trang thai ban dau
        if (percentagePosition === 100) {
            timeline.value = 0
            timeline.style.backgroundSize = '0% 100%'
            img.classList.remove('rotate-img')

            // repeat bai hat
            if (this.state.isRepeat) {
                audio.currentTime = 0
                audio.play()
                this.setState({
                    isPlaying: true,
                })
                this.handleRotateImg()
            } else {
                this.setState({
                    isPlaying: false,
                })
            }
        }
    }

    changeSeek = () => {
        const audio = document.querySelector('audio')
        const timeline = document.querySelector('.timeline')
        const time = (timeline.value * audio.duration) / 100;
        audio.currentTime = time;
    }

    handleRepeat = () => {
        const repeat = document.querySelector('.rebeat')

        this.setState({
            isRepeat: !this.state.isRepeat
        })

        !this.state.isRepeat ?
            repeat.classList.add('active') :
            repeat.classList.remove('active')

        console.log(this.state.isRepeat);
    }

    handleRandom = () => {
        let { songsArr, currentSong } = this.state
        let randomIndex = Math.floor(Math.random() * songsArr.length);
        const nextSong = songsArr[randomIndex]
        this.props.getSongToPlay(nextSong)
    }

    nextSong = () => {
        let { songsArr, currentSong } = this.state
        let index = songsArr.map((song) => song.id).indexOf(currentSong.id)
        let nextIndex = index + 1
        const nextSong = songsArr[nextIndex]
        this.props.getSongToPlay(nextSong)
        if (nextIndex >= songsArr.length) {
            const nextSong = songsArr[0]
            this.props.getSongToPlay(nextSong)
        }
    }

    preSong = () => {
        let { songsArr, currentSong } = this.state
        let index = songsArr.map((song) => song.id).indexOf(currentSong.id)
        let prevIndex = index - 1
        const nextSong = songsArr[prevIndex]
        this.props.getSongToPlay(nextSong)
        // console.log(nextSong);
        if (prevIndex <= -1) {
            const nextSong = songsArr[songsArr.length - 1]
            this.props.getSongToPlay(nextSong)
        }
    }


    render() {
        console.log('list sonmg: ', this.state.songsArr);
        console.log('song play: ', this.state.currentSong);
        let { songsArr, currentSong } = this.state
        return (
            <div className='music-player-container'>
                <div className='music-player-content'>
                    <div className='music-player-left'>
                        <div className='music-player-disk'>
                            <img className='music-player-img'
                                src={
                                    currentSong ?
                                        currentSong.img :
                                        songsArr[0].img
                                }
                            />
                        </div>
                        <div className='music-player-song'>
                            <div className='song-name'>
                                {
                                    currentSong ?
                                        currentSong.songName :
                                        songsArr[0].songName
                                }
                            </div>
                            <div className='artiss-name'>
                                {
                                    currentSong ?
                                        currentSong.singer :
                                        songsArr[0].singer
                                }
                            </div>
                        </div>
                    </div>
                    <div className='music-player-right'>
                        <div className='music-player-controls'>
                            <div className='control-child'>
                                <button className='btn-control rebeat'
                                    onClick={() => { this.handleRepeat() }}
                                >
                                    <i className="fas fa-undo"></i>
                                </button>
                                <button className='btn-control'
                                    onClick={() => { this.preSong() }}
                                >
                                    <i className="fas fa-backward"></i>
                                </button>
                                <button className="player-button" onClick={() => this.toggleAdudio()}>
                                    {
                                        !this.state.isPlaying ?
                                            <i className="fas fa-play"></i> :
                                            <i className="fas fa-pause"></i>
                                    }
                                </button>
                                <button className="btn-control"
                                    onClick={() => this.nextSong()}
                                >
                                    <i className="fas fa-forward"></i>
                                </button>
                                <button className="btn-control random"
                                    onClick={() => this.handleRandom()}
                                >
                                    <i className="fas fa-random"></i>
                                </button>
                                <button className="btn-control">
                                    <i className="fas fa-music"></i>
                                </button>
                            </div>
                        </div>
                        {/* <div className='music-player-time'>
                            <p className="song-time">
                                {this.state.current}/{this.state.length}
                            </p>
                        </div> */}
                        <div className='music-player-audio'>
                            <audio
                                src=
                                {
                                    currentSong ?
                                        currentSong.file :
                                        songsArr[0].file
                                }
                                onTimeUpdate={() => this.changeTimeline()}
                            ></audio>
                            <input type="range" className="timeline"
                                max="100" value="0"
                                onChange={() => this.changeSeek()}
                            ></input>
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
        songPlay: state.song.songPlay,
        listSongs: state.admin.songs
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllSongs: () => dispatch(actions.getAllSongs()),
        getSongToPlay: (song) => dispatch(actions.getSongToPlay(song))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MusicPlayer);
