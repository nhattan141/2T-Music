import React, { Component } from 'react';
import { connect } from 'react-redux';
import { path } from '../../../utils'
import './UserInfor.scss'
import * as actions from '../../../store/actions'
import HomeHeader from '../HomeHeader'
import { withRouter } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import Lightbox from 'react-image-lightbox';

class UserInfor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            email: '',
            firstName: '',
            lastName: '',
            gender: 1,
            avatar: '',
            previewAvatar: '',
            isOpen: false,
            isUpdate: false
        }
    }

    componentDidMount() {
        if (this.props.userInfo) {
            const { userInfo } = this.props;
            this.setState({
                id: userInfo.id,
                email: userInfo.email,
                firstName: userInfo.firstName,
                lastName: userInfo.lastName,
                gender: userInfo.gender,
                avatar: userInfo.avatar,
                previewAvatar: userInfo.avatar,
                isOpen: false,
                isUpdate: false
            })
            console.log('userInfo did mount', userInfo);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.userInfo && prevProps.userInfo !== this.props.userInfo) {
            const { userInfo } = this.props;
            this.setState({
                id: userInfo.id,
                email: userInfo.email,
                firstName: userInfo.firstName,
                lastName: userInfo.lastName,
                gender: userInfo.gender,
                avatar: userInfo.avatar,
                previewAvatar: userInfo.avatar,
                isOpen: false,
                isUpdate: false
            })
            console.log('userInfo did update', userInfo);
        }
    }

    handleBackHome = () => {
        this.props.history.push(path.HomeUser)
    }

    handleOpenImage = () => {
        if (this.state.previewAvatar) {
            this.setState({
                isOpen: true
            })
        }
    }

    resetFill = () => {

        const { userInfo } = this.props;
        this.setState({
            id: userInfo.id,
            email: userInfo.email,
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            gender: userInfo.gender,
            avatar: userInfo.avatar,
            previewAvatar: userInfo.avatar,
            isOpen: false,
            isUpdate: false
        })

    }

    handleOnchangeInput = async (e, id) => {
        if (id == 'avatar') {
            let data = e.target.files
            let file = data[0]
            console.log(file);
            if (file) {
                let onjectUrl = URL.createObjectURL(file)
                this.setState({
                    previewAvatar: onjectUrl,
                    avatar: file
                })
            }
        } else {
            let copyState = { ...this.state }
            copyState[id] = e.target.value
            this.setState({
                ...copyState,
            })
            console.log(e.target.value);
        }

    }

    handleUpdateUser = (user) => {
        const form_data = new FormData();
        form_data.append('id', user.id);
        form_data.append('email', user.email)
        form_data.append('firstName', user.firstName);
        form_data.append('lastName', user.lastName);
        form_data.append('gender', user.gender);
        form_data.append('avatar', user.avatar);
        this.props.updateUserInfo(form_data)
        this.setState({
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            gender: user.gender,
            avatar: user.avatar,
            previewAvatar: user.avatar,
            isOpen: false,
            isUpdate: false
        })
    }

    render() {
        let {
            email,
            password,
            firstName,
            lastName,
            gender, } = this.state
        // console.log('user info: ', this.props.userInfo);
        return (
            <>
                <HomeHeader />
                <div className='user-infor-container'>
                    <div className='user-infor-content'>
                        <div className='user-infor-header'>
                            <div className='user-infor-button'
                                onClick={() => this.handleBackHome()}
                            >
                                <i className="fas fa-angle-left"></i>
                                Trang chủ
                            </div>
                        </div>
                        <div className='user-infor-body'>
                            <div className="user-infor-title">Thông tin cá nhân</div>
                            <div className="user-infor-form">
                                <div className="user-infor-avatar">
                                    <div className="input-container-avatar">
                                        <label>Ảnh đại diện</label>
                                        <input hidden={true}
                                            type="file"
                                            name='avatar'
                                            id='avatar'
                                            onChange={(event) => { this.handleOnchangeInput(event, 'avatar') }}
                                        />
                                        <label htmlFor="avatar" className="input-container avatar-btn">Chọn hình</label>
                                        <div className="show-img">
                                            <img src={this.state.previewAvatar} alt='avatar'
                                                onClick={() => this.handleOpenImage()}
                                            ></img>
                                        </div>
                                    </div>
                                </div>
                                <div className="user-infor-details">
                                    <div className="input-container">
                                        <label>Email</label>
                                        <input type="text"
                                            name='email'
                                            value={email}
                                            disabled={true}
                                            onChange={(event) => { this.handleOnchangeInput(event, 'email') }}
                                        />
                                    </div>
                                    <div className="input-container">
                                        <label>Họ và tên đệm</label>
                                        <input
                                            type="text"
                                            name='firstName'
                                            value={firstName}
                                            onChange={(event) => { this.handleOnchangeInput(event, 'firstName') }}
                                        />
                                    </div>
                                    <div className="input-container">
                                        <label>Tên</label>
                                        <input
                                            type="text"
                                            name='lastName'
                                            value={lastName}

                                            onChange={(event) => { this.handleOnchangeInput(event, 'lastName') }}

                                        />
                                    </div>
                                    <div className="input-container">
                                        <label>Giới tính</label>
                                        <select name="gender" value={gender}
                                            onChange={(event) => { this.handleOnchangeInput(event, 'gender') }}
                                        >
                                            <option value="1" >Nam</option>
                                            <option value="0">Nữ</option>
                                        </select>
                                    </div>
                                    <div className="btn-save">
                                        <div className="btn-save-content">
                                            <button type="button"
                                                onClick={() => this.handleUpdateUser(this.state)}
                                            >Cập nhật</button>
                                            <button type="button" className='btn-cancel'
                                                onClick={() => this.resetFill()}
                                            >Hủy</button>

                                        </div>
                                    </div>
                                </div>
                            </div>


                            {
                                this.state.isOpen === true &&
                                <Lightbox
                                    mainSrc={this.state.previewAvatar}
                                    onCloseRequest={() => this.setState({ isOpen: false })}
                                />
                            }
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
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateUserInfo: (user) => dispatch(actions.updateUserInfo(user)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserInfor));
