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

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            songsArr: [],
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
        this.props.getAllSongs()
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listSongs !== this.props.listSongs) {
            this.setState({
                songsArr: this.props.listSongs
            })
        }
    }

    handleDeleteUser = (song) => {
        this.props.deleteSong(song.id)
    }

    render() {
        let { songsArr } = this.state
        console.log('songsArr: ', songsArr);
        return (
            <div className="song-manage-table">
                <table className="table table-striped table-hover">
                    <thead style={{ background: '#21d5a2', color: '#FFFFFF' }}>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Song Name</th>
                            <th scope="col">Singer</th>
                            <th scope="col">Recent</th>
                            <th scope="col">Top 3</th>
                            <th scope="col">New Release</th>
                            <th scope="col">Image</th>
                            <th scope="col">Audio</th>
                            <th scope="col">Lyrics</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            songsArr && songsArr.length > 0 &&
                            songsArr.map((song, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index}</td>
                                        <td>{song.songName}</td>
                                        <td>{song.singer}</td>
                                        <td>
                                            {
                                                song.isRecent == 1 ? 'Yes' : 'No'
                                            }
                                        </td>
                                        <td>
                                            {
                                                song.isTop3 == 1 ? 'Yes' : 'No'
                                            }
                                        </td>
                                        <td>
                                            {
                                                song.isNewRelease == 1 ? 'Yes' : 'No'
                                            }
                                        </td>
                                        <td>
                                            <div className="song-avatar">
                                                <img src={song.img}>
                                                </img>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="song-audio">
                                                <audio controls src={song.file} >
                                                </audio>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='lyrics'>
                                                {song.lyrics}
                                            </div>
                                        </td>
                                        <td>
                                            <div className='control'>
                                                <button type="button" className="btn-edit"
                                                    onClick={() => this.props.handleOpenUpdate(song)}
                                                >
                                                    <i className="fas fa-edit"></i>
                                                </button>
                                                <button type="button" className="btn-delete"
                                                    onClick={() => this.handleDeleteUser(song)}
                                                >
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
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
        getAllSongs: () => dispatch(actions.getAllSongs()),
        deleteSong: (songId) => dispatch(actions.deleteSong(songId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
