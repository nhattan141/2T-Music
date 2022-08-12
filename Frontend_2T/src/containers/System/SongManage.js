import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './SongManage.scss'
import { emitter } from '../../utils/emitter'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import * as actions from '../../store/actions/index'
import { ToastContainer, toast } from 'react-toastify';
import { CommonUtils } from '../../utils'
import poster1 from '../../assets/images/poster_1.jpg'
import song1 from '../../assets/audios/song_1.mp3'
import TableManageSong from './TableManageSong';
class SongManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            songName: '',
            singer: '',
            lyrics: '',
            img: '',
            file: '',
            isRecent: 1,
            isTop3: 1,
            isNewRelease: 1,
            previewImage: poster1,
            previewAudio: song1,
            isUpdate: false,
            isOpen: false,
        }
    }

    async componentDidMount() {
        // this.props.getAllSongs()
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listSongs !== this.props.listSongs) {
            this.setState({
                songName: '',
                singer: '',
                lyrics: '',
                img: '',
                file: '',
                isRecent: 1,
                isTop3: 1,
                isNewRelease: 1,
                previewImage: poster1,
                previewAudio: song1
            })
        }
    }

    handleOpenImage = () => {
        if (this.state.previewImage) {
            this.setState({
                isOpen: true
            });
        }
    }

    handleOnchangeInput = async (e, id) => {
        if (id == 'img') {
            let data = e.target.files
            let file = data[0]
            if (file) {
                let base64 = await CommonUtils.getBase64(file)
                console.log('base64 img', base64);
                let onjectUrl = URL.createObjectURL(file)
                this.setState({
                    previewImage: onjectUrl,
                    img: base64
                })
            }
        } else {
            if (id == 'file') {
                let data = e.target.files
                let file = data[0]
                if (file) {
                    let base64 = await CommonUtils.getBase64(file)
                    console.log('base64 file', base64);
                    let onjectUrl = URL.createObjectURL(file)
                    this.setState({
                        previewAudio: onjectUrl,
                        file: base64
                    })
                }
            }
            else {
                let copyState = { ...this.state }
                copyState[id] = e.target.value
                this.setState({
                    ...copyState,
                })
                console.log(e.target.value);
            }
        }

    }

    emptyFill = () => {
        this.setState({
            songName: '',
            singer: '',
            lyrics: '',
            img: '',
            file: '',
            isRecent: 1,
            isTop3: 1,
            isNewRelease: 1,
            previewImage: poster1,
            previewAudio: song1,
            isUpdate: false,
        })
    }

    checkValidate = () => {
        let isValid = true
        let arrCheck = [
            'songName',
            'singer',
            'lyrics',
            'img',
            'file',
            'isRecent',
            'isTop3',
            'isNewRelease',
        ]
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false
                toast.error('Please fill in the ' + arrCheck[i])
                break
            }
        }
        return isValid
    }

    handleSubmit = () => {
        let isValid = this.checkValidate()
        if (isValid === false) return
        this.props.createNewSong({
            songName: this.state.songName,
            singer: this.state.singer,
            lyrics: this.state.lyrics,
            img: this.state.img,
            file: this.state.file,
            isRecent: this.state.isRecent,
            isTop3: this.state.isTop3,
            isNewRelease: this.state.isNewRelease,
        })
    }

    handleOpenUpdate = (song) => {
        let imageBase64 = ''
        if (song.img) {
            imageBase64 = new Buffer(song.img, 'base64').toString('binary')
        }
        let audioBase64 = ''
        if (song.file) {
            audioBase64 = new Buffer(song.file, 'base64').toString('binary')
        }
        this.setState({
            isUpdate: true,
            id: song.id,
            songName: song.songName,
            singer: song.singer,
            lyrics: song.lyrics,
            isRecent: song.isRecent,
            isTop3: song.isTop3,
            isNewRelease: song.isNewRelease,
            previewImage: imageBase64,
            previewAudio: audioBase64,
        })
        console.log('State user update: ', this.state);
    }

    handleUpdateSong = (data) => {
        this.props.updateSong(data)
        this.emptyFill()
    }

    render() {
        const { songName, singer, lyrics, isRecent, isTop3, isNewRelease } = this.state;
        console.log('song list', this.props.listSongs);


        return (
            <div className="song-manage-container">
                <div className="song-manage-content">
                    <div className="song-manage-title">Manage Song</div>
                    <div className="song-manage-form">
                        <div className="input-container">
                            <label>Name</label>
                            <input type="text"
                                name='songName'
                                value={songName}
                                onChange={(event) => { this.handleOnchangeInput(event, 'songName') }}
                            />
                        </div>
                        <div className="input-container">
                            <label>Singer</label>
                            <input
                                type="text"
                                name='singer'
                                value={singer}
                                onChange={(event) => { this.handleOnchangeInput(event, 'singer') }}
                            />
                        </div>
                        <div className="input-container">
                            <label>Recent</label>
                            <select name="isRecent" value={isRecent}
                                onChange={(event) => { this.handleOnchangeInput(event, 'isRecent') }}
                            >
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </select>
                        </div>
                        <div className="input-container">
                            <label>Top 3</label>
                            <select name="isTop3" value={isTop3}
                                onChange={(event) => { this.handleOnchangeInput(event, 'isTop3') }}
                            >
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </select>
                        </div>
                        <div className="input-container">
                            <label>New release</label>
                            <select name="isNewRelease" value={isNewRelease}
                                onChange={(event) => { this.handleOnchangeInput(event, 'isNewRelease') }}
                            >
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </select>
                        </div>
                        <div className="input-container">
                            <label>Image</label>
                            <input hidden={true}
                                type="file"
                                name='img'
                                id='img'
                                onChange={(event) => { this.handleOnchangeInput(event, 'img') }}
                            />
                            <label htmlFor="img" className="input-container image-btn">Upload</label>
                            <div className="show-img">
                                <img src={this.state.previewImage} alt='avatar'
                                    onClick={() => this.handleOpenImage()}
                                ></img>
                            </div>
                        </div>
                        <div className="input-container">
                            <label>Audio</label>
                            <input hidden={true}
                                type="file"
                                name='file'
                                id='file'
                                onChange={(event) => { this.handleOnchangeInput(event, 'file') }}
                            />
                            <label htmlFor="file" className="input-container audio-btn">Upload</label>
                            <div className="show-audio">
                                <audio controls src={this.state.previewAudio} alt='audio'></audio>
                            </div>
                        </div>
                        <div className="input-container">
                            <label>Lyrics</label>
                            <textarea
                                name='lyrics'
                                value={lyrics}
                                onChange={(event) => { this.handleOnchangeInput(event, 'lyrics') }}
                            />
                        </div>
                    </div>
                    <div className="btn-save">
                        <div className="btn-save-content">
                            {
                                this.state.isUpdate === false ?
                                    <button type="button"
                                        onClick={() => this.handleSubmit()}
                                    >Add new</button> :
                                    <button type="button"
                                        onClick={() => this.handleUpdateSong(this.state)}
                                    >Update</button>
                            }
                            <button type="button" className='btn-cancel'
                                onClick={() => this.emptyFill()}
                            >Cancel</button>

                        </div>
                    </div>
                    <TableManageSong
                        handleOpenUpdate={this.handleOpenUpdate}
                    />
                    {
                        this.state.isOpen === true &&
                        <Lightbox
                            mainSrc={this.state.previewImage}
                            onCloseRequest={() => this.setState({ isOpen: false })}
                        />
                    }
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        listSongs: state.admin.songs
    };
};

const mapDispatchToProps = dispatch => {
    return {
        createNewSong: (data) => dispatch(actions.createNewSong(data)),
        updateSong: (data) => dispatch(actions.updateSong(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SongManage);