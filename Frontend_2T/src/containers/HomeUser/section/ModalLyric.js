import { result, uniq } from 'lodash';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './Modal.scss'
import CustomScrollbars from '../../../components/CustomScrollbars';


class ModalLyric extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentSong: {},
            lyrics: [],
        }
    }


    componentDidMount() {
        if (this.props.songPlay && this.props.songPlay.lyrics) {

            let lyrics = this.props.songPlay.lyrics
            setTimeout(() => {
                this.setState({
                    currentSong: this.props.songPlay,
                    lyrics: lyrics.split(/\r?\n/),
                })
            }, 100)

        }
        // console.log("song play from modal dismount", this.props.songPlay);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.isOpen !== this.props.isOpen) {

            let lyricModal = document.querySelector('.lyric-container')
            let hide = document.querySelector('.hide')

            // class hide disabled modal
            // class hide-lyric-container slide down modal

            //when the modal is opened, remove class hide
            if (this.props.isOpen) {
                lyricModal.classList.remove('hide')
            } else {
                //when the modal is closed, add class hide-lyric-container
                lyricModal.classList.add('hide-lyric-container')
                //wait 3s to disabled modal
                setTimeout(() => {
                    lyricModal.classList.add('hide')
                    lyricModal.classList.remove('hide-lyric-container')
                }, 3000)
            }
        }

        if (prevProps.songPlay !== this.props.songPlay) {
            let lyrics = this.props.songPlay.lyrics

            this.setState({
                currentSong: this.props.songPlay,
                lyrics: lyrics.split(/\r?\n/),
            })
        }
    }


    render() {
        let { currentSong, lyrics } = this.state

        return (
            <div className='lyric-container hide'>
                <div className="lyric-content">
                    <div className="lyric-content-left">
                        <div className="song-info">
                            <div className="img-song">
                                <img
                                    src={currentSong.img}
                                />
                            </div>
                            <div className="name-singer">
                                <div className='song-name'>
                                    {currentSong.songName}
                                </div>
                                <div className='singer'>
                                    {currentSong.singer}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lyric-content-right">



                        <div className="lyrics-song">
                            <CustomScrollbars style={{ height: '100vh', width: '100%' }}>
                                {
                                    lyrics && lyrics.length > 0 &&
                                    lyrics.map((lyric, index) => (
                                        <div className="lyric" key={index}>
                                            {lyric}
                                        </div>
                                    ))
                                }
                            </CustomScrollbars>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        songPlay: state.song.songPlay,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalLyric);



