import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ListSearch.scss'
import * as actions from '../../../store/actions'
import { withRouter } from 'react-router';
import CustomScrollbars from '../../../components/CustomScrollbars';

class ListSearch extends Component {
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
        if (prevProps.isOpenListSearch !== this.props.isOpenListSearch) {
            let listSearch = document.querySelector('.list-search-container')
            if (this.props.isOpenListSearch) {
                listSearch.classList.remove('hide')
            } else {
                listSearch.classList.add('hide')
            }
        }
    }

    handleGetSongToPlay = (song) => {
        this.props.getSongToPlay(song)
    }

    render() {

        let { songsArr, currentSong } = this.state
        let { inputSearch } = this.props;

        let filteredData = inputSearch === '' ?
            songsArr :
            songsArr.filter((song) => {
                //return the item which contains the user input
                let songLowerCase = song.songName.toLowerCase()
                return songLowerCase.includes(inputSearch)
            })
        return (
            <>
                <div className='list-search-container hide'>
                    <div className='list-search-content'>
                        <CustomScrollbars style={{ height: '95%', width: '90%' }}>
                            <div className='list-search-body'>
                                {
                                    filteredData && filteredData.length > 0 &&
                                    filteredData.map((song, index) => (
                                        <div className='list-search-child' key={index}>
                                            <div className='child-content'>
                                                <div className='child-left'
                                                    onClick={() => this.handleGetSongToPlay(song)}
                                                >
                                                    <img src={song.img} />
                                                    <div className="middle">
                                                        <i className="fas fa-play"></i>
                                                    </div>
                                                </div>
                                                <div className='child-right'>
                                                    <div className='child-liright-song-name'>{song.songName}</div>
                                                    <div className='child-liright-artiss-name'>{song.singer}</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </CustomScrollbars>
                    </div>
                </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListSearch));
