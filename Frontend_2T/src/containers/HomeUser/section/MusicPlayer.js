import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MusicPlayer.scss'
import poster1 from '../../../assets/images/poster_1.jpg'
import song1 from '../../../assets/audios/song_1.mp3'
import * as actions from '../../../store/actions'
import ModalLyric from './ModalLyric';

class MusicPlayer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isPlaying: false,
            isRepeat: false,
            currentSong: {},
            songsArr: [],
            isOpen: false,
            defaultSong: {
                file: "http://127.0.0.1:8887/audios/1660655236253_song_11.mp3",
                id: 11,
                img: "http://127.0.0.1:8887/images/1660655236253_poster_11.jpg",
                isNewRelease: "1",
                isRecent: "0",
                isTop3: "0",
                lyrics: "I just wanna chill with you tonight\r\nAnd all the sorrow left behind uh-way\r\nSometimes I feel lost in the crowd\r\nLife is full of ups and downs\r\nBut it's alright, I feel peaceful inside\r\nAy, ya\r\nEm dạo này ổn không? Còn đi làm ở công ty cũ?\r\nCòn đi sớm về hôm nhưng mà đồng lương vẫn không khi đủ? (ay)\r\nĐồng nghiệp của em thế nào, trong thang máy có chào với nhau?\r\nCó nói qua nói lại và những cuộc họp có đào bới nhau?\r\nSếp của em thế nào? Dễ tính hay thường gắt gỏng?\r\nAnh ta có thương nhân viên hay thường buông lời sắc mỏng? (ah)\r\nEm còn thiếu ngủ trong những lần phải chạy deadline\r\nEm quên ăn quên uống, quên cả việc chải lại tóc tai (ay)\r\nNhững đôi giày cao gót chắc còn làm đau em\r\nVà tiền bao nhiêu cho đủ, ai biết ngày sau em\r\nMắt em còn mỏi không? Tám tiếng nhìn màn hình\r\nNhững tối đi về đơn độc em thấy lòng mình lặng thinh\r\nVà đừng để đời chỉ là những chuỗi ngày được chấm công (that's right)\r\nMiệng cười như nắng hạ nhưng trong lòng thì chớm đông (yo)\r\nNếu mà mệt quá giữa thành phố sống chồng lên nhau\r\nCùng lắm thì mình về quê, mình nuôi cá và trồng thêm rau (ha-ha)\r\nTrời thả vạt nắng khiến đám tóc em hoe vàng\r\nChiều nay đi giữa thành phố em bỗng thấy sao mơ màng\r\nTìm cho mình một không gian, bật bài nhạc làm em chill\r\nTâm hồn em phiêu dạt theo áng mây bên trời\r\nTrời thả vạt nắng khiến đám tóc em hoe vàng\r\nChiều nay đi giữa thành phố em bỗng thấy sao mơ màng\r\nTìm cho mình một không gian, bật bài nhạc làm em chill\r\nTâm hồn em phiêu dạt theo áng mây bên trời\r\nAnh dạo này cũng bận nhiều và cũng có thêm nhiều đêm diễn\r\nÂm nhạc mở lối cuộc đời anh như là ngọn hải đăng ở trên biển\r\nAnh được gặp những người nổi tiếng trước giờ chỉ thấy trên tivi\r\nGặp H'Hen Niê hoa hậu, gặp cả Sơn Tùng M-TP, ya\r\nĐi hát vui lắm em vì đồng âm của anh họ rất tuyệt (yeah)\r\nBọn anh hát cùng nhau khiến cho thanh xuân này như bất diệt\r\nAnh thấy mình không cô đơn, không áp lực nào buộc chân anh\r\nNhiều khi anh lên sân khấu mà dưới khán giả họ thuộc hơn anh\r\nAnh cũng có những hợp đồng, những điều khoản mà anh phải dần quen\r\nAnh cũng cần tiền, những dự án họ nói họ cần Đen (yeah)\r\nVà những con số nặng tới mức đủ sức làm choáng mình\r\nNhưng em yên tâm anh bán chất xám chứ chưa từng bán mình (ha-ha)\r\nNhưng cũng có lúc mọi thứ không như là những gì ta muốn\r\nThế giới này vận hành theo cái cách luôn ghì ta xuống, oh\r\nNhưng mà mộng mơ anh nhiều như niêu cơm của Thạch Sanh (yeah)\r\nAi muốn lấy cứ lấy-ya, không thể nào mà sạch banh\r\nTrời thả vạt nắng khiến đám tóc em hoe vàng\r\nChiều nay đi giữa thành phố em bỗng thấy sao mơ màng\r\nTìm cho mình một không gian, bật bài nhạc làm em chill\r\nTâm hồn em phiêu dạt theo áng mây bên trời\r\nTrời thả vạt nắng khiến đám tóc em hoe vàng\r\nChiều nay đi giữa thành phố em bỗng thấy sao mơ màng\r\nTìm cho mình một không gian, bật bài nhạc làm em chill\r\nTâm hồn em phiêu dạt theo áng mây bên trời\r\nMình sướng hơn những người giàu nhỉ (ay)\r\nVầng trán mình chưa hề nhàu nhĩ (ay)\r\nDù chênh vênh như là cầu khỉ (ay)\r\nĐời sóng gió mình là tàu thuỷ (ay)\r\nVì một ngày còn sống\r\nLà một ngày đắm say (một ngày đắm say)\r\nNgày đẹp trời nhất\r\nLà ngày mình còn nắm tay (ngày còn nắm tay)\r\nMình sẽ không ngã\r\nVì mình ngã họ hả hê (ay)\r\nBiển người cũng là biển\r\nCho tụi mình tắm thoả thuê\r\nVà chúng ta sẽ không\r\nLà một ai trông giống họ (một ai trông giống họ)\r\nSẽ không rỗng tuếch\r\nNhư một cái chai trong đống lọ (chai trong đống lọ)\r\nSáng chúng ta làm vì tờ bạc nhiều màu trong ví\r\nĐêm về ta chill, riêng mình một bầu không khí\r\nVì tim ta còn trẻ dù thân xác ta sẽ già\r\nNhưng mà ta không ủ rũ như là mấy con sẻ già (yeah)\r\nChúng ta có những chiều vàng, dắt tay nhau lên đồi xa\r\nNắng khoác lên mình lớp áo, nheo mắt lại nhìn trời hoa\r\nVà những đêm đen huyền dịu cho tiếng lòng thêm dõng dạc\r\nTa thấy nhau bằng tâm hồn và không cần nhìn bằng võng mạc (yes)\r\nTa sẽ cố để có được những thứ mà ta chờ mong\r\nDưới ngọn đồi, căn nhà nhỏ, nhìn ra bờ sông (nhìn ra bờ sông)\r\nVì anh chưa từng mơ ngày nào đó mình trở thành siêu sao (siêu sao)\r\nTừ ngày thơ bé anh đã muốn trở thành chưởng môn phái Tiêu Dao\r\nEm ơi vui cười lên vì đời này ai không âu lo\r\n(I just wanna chill with you tonight)\r\nNếu băn khoăn ngày mai mệt nhoài hệt như con sâu đo\r\nEm đi ra ngoài kia tìm về vài chai Strongbow-oh\r\nĐêm nay em cần chill, việc này để cho Đen Vâu lo\r\nTrời thả vạt nắng khiến đám tóc em hoe vàng\r\n(Việc này để cho Đen Vâu lo)\r\nChiều nay đi giữa thành phố em bỗng thấy sao mơ màng\r\nTìm cho mình một không gian, bật bài nhạc làm em chill\r\nTâm hồn em phiêu dạt theo áng mây bên trời\r\nPhiêu dạt theo áng mây bên trời\r\nBài hát này đã có quảng cáo\r\nKhông có tiền thì làm nhạc làm sao?",
                singer: "Min, Đen Vâu",
                songName: "Bài này chill phết",
            }
        }
    }

    componentDidMount() {
        this.props.getAllSongs()
        this.setState({
            isPlaying: false,
            isRepeat: false,
            currentSong: this.props.songPlay,
            songsArr: this.props.listSongs
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.songPlay !== this.props.songPlay) {
            this.setState({
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

    toggleLyricModal = () => {
        let lyrics = document.querySelector('.lyrics')

        this.setState({
            isOpen: !this.state.isOpen
        })

        !this.state.isOpen ?
            lyrics.classList.add('active') :
            lyrics.classList.remove('active')
    }
    render() {
        let { songsArr, currentSong, defaultSong } = this.state
        // console.log('list song: ', songsArr);
        // console.log('song play: ', defaultSong);
        return (
            <>
                {
                    this.state.isOpen &&
                    <ModalLyric
                        isOpen={this.state.isOpen}
                        currentSong={
                            currentSong && defaultSong
                        }
                    />
                }
                <div className='music-player-container'>
                    <div className='music-player-content'>
                        <div className='music-player-left'>
                            <div className='music-player-disk'>
                                <img className='music-player-img'
                                    src={
                                        currentSong ?
                                            currentSong.img :
                                            defaultSong.img
                                    }
                                />
                            </div>
                            <div className='music-player-song'>
                                <div className='song-name'>
                                    {
                                        currentSong ?
                                            currentSong.songName :
                                            defaultSong.songName
                                    }
                                </div>
                                <div className='artiss-name'>
                                    {
                                        currentSong ?
                                            currentSong.singer :
                                            defaultSong.singer
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
                                    <button className="btn-control lyrics"
                                        onClick={() => this.toggleLyricModal()}
                                    >
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
                                            defaultSong.file
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
            </>

        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        songPlay: state.song.songPlay,
        listSongs: state.admin.songs,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllSongs: () => dispatch(actions.getAllSongs()),
        getSongToPlay: (song) => dispatch(actions.getSongToPlay(song)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MusicPlayer);
