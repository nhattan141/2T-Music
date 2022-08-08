import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss'
import { emitter } from '../../utils/emitter'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import * as actions from '../../store/actions/index'
import { ToastContainer, toast } from 'react-toastify';
import { CommonUtils } from '../../utils'
import logo from '../../assets/images/neon_2.png'
import TableMangeUser from './TableMangeUser';
class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usersArr: [],
            Id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            gender: 1,
            roleId: 1,
            avatar: '',
            previewAvatar: logo,
            isOpen: false,
            isUpdate: false
        }
    }

    async componentDidMount() {
        this.props.getAllUser()
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        // if (prevProps.listUsers !== this.props.listUsers) {
        //     this.setState({
        //         usersArr: this.props.listUsers,
        //         email: '',
        //         password: '',
        //         firstName: '',
        //         lastName: '',
        //         gender: 1,
        //         roleId: 1,
        //         avatar: '',
        //         previewAvatar: logo
        //     })
        // }
    }

    handleOnchangeInput = async (e, id) => {
        if (id == 'avatar') {
            let data = e.target.files
            let file = data[0]
            console.log(file);
            if (file) {
                let base64 = await CommonUtils.getBase64(file)
                console.log('base64 img', base64);
                let onjectUrl = URL.createObjectURL(file)
                this.setState({
                    previewAvatar: onjectUrl,
                    avatar: base64
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

    handleOpenImage = () => {
        if (this.state.avatar) {
            this.setState({
                isOpen: true
            })
        }
    }

    checkValidate = () => {
        let isValid = true
        let arrCheck = ['email', 'password', 'firstName', 'lastName', 'gender', 'roleId']
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
        this.props.createNewUser({
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            gender: this.state.gender,
            roleId: this.state.roleId,
            avatar: this.state.avatar,
        })
    }

    handleOpenUpdate = (user) => {
        let imageBase64 = ''
        if (user.avatar) {
            imageBase64 = new Buffer(user.avatar, 'base64').toString('binary')
        }
        this.setState({
            isUpdate: true,
            id: user.id,
            email: user.email,
            password: 'user.password',
            firstName: user.firstName,
            lastName: user.lastName,
            gender: user.gender,
            roleId: user.roleId,
            avtar: user.avtar,
            previewAvatar: imageBase64
        })
        console.log('State user update: ', this.state);
    }

    emptyFill = () => {
        if (this.state.isUpdate === true) {
            this.setState({
                isUpdate: false
            })
        }
        this.setState({
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            gender: 1,
            roleId: 1,
            avatar: '',
            previewAvatar: logo,
        })

    }

    handleUpdateUser = (user) => {
        this.props.updateUser(user)
        this.emptyFill()
    }

    render() {
        let { usersArr,
            email,
            password,
            firstName,
            lastName,
            gender,
            roleId } = this.state
        console.log('usersArr: ', usersArr);
        return (
            <div className="user-manage-container">
                <div className="user-manage-content">
                    <div className="user-manage-title">Manage User</div>
                    <div className="user-manage-form">
                        <div className="input-container">
                            <label>Email</label>
                            <input type="text"
                                name='email'
                                value={email}
                                disabled={this.state.isUpdate ? true : false}
                                onChange={(event) => { this.handleOnchangeInput(event, 'email') }}
                            />
                        </div>
                        <div className="input-container">
                            <label>Password</label>
                            <input
                                type="password"
                                name='password'
                                value={password}
                                disabled={this.state.isUpdate ? true : false}
                                onChange={(event) => { this.handleOnchangeInput(event, 'password') }}
                            />
                        </div>
                        <div className="input-container">
                            <label>Firstname</label>
                            <input
                                type="text"
                                name='firstName'
                                value={firstName}
                                onChange={(event) => { this.handleOnchangeInput(event, 'firstName') }}
                            />
                        </div>
                        <div className="input-container">
                            <label>Lastname</label>
                            <input
                                type="text"
                                name='lastName'
                                value={lastName}

                                onChange={(event) => { this.handleOnchangeInput(event, 'lastName') }}

                            />
                        </div>
                        <div className="input-container">
                            <label>Gender</label>
                            <select name="gender" value={gender}
                                onChange={(event) => { this.handleOnchangeInput(event, 'gender') }}
                            >
                                <option value="1" >Male</option>
                                <option value="0">Female</option>
                            </select>
                        </div>
                        <div className="input-container">
                            <label>Role</label>
                            <select name="roleId" value={roleId}
                                onChange={(event) => { this.handleOnchangeInput(event, 'roleId') }}
                            >
                                <option value="1">Admin</option>
                                <option value="0">User</option>
                            </select>
                        </div>
                        <div className="input-container">
                            <label>Avatar</label>
                            <input hidden={true}
                                type="file"
                                name='avatar'
                                id='avatar'
                                onChange={(event) => { this.handleOnchangeInput(event, 'avatar') }}
                            />
                            <label htmlFor="avatar" className="input-container avatar-btn">Upload</label>
                            <div className="show-img">
                                <img src={this.state.previewAvatar} alt='avatar'
                                    onClick={() => this.handleOpenImage()}
                                ></img>
                            </div>
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
                                        onClick={() => this.handleUpdateUser(this.state)}
                                    >Update</button>
                            }
                            <button type="button" className='btn-cancel'
                                onClick={() => this.emptyFill()}
                            >Cancel</button>

                        </div>
                    </div>
                    <TableMangeUser
                        handleOpenUpdate={this.handleOpenUpdate}
                    />
                    {
                        this.state.isOpen === true &&
                        <Lightbox
                            mainSrc={this.state.previewAvatar}
                            onCloseRequest={() => this.setState({ isOpen: false })}
                        />
                    }
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        getAllUser: () => dispatch(actions.getAllUser()),
        updateUser: (user) => dispatch(actions.updateUser(user)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
