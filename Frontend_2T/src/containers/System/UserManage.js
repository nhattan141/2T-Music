import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss'
import { emitter } from '../../utils/emitter'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import * as actions from '../../store/actions/index'
import { ToastContainer, toast } from 'react-toastify';
import { CommonUtils, dateFormat } from '../../utils'
import logo from '../../assets/images/neon_2.png'
import TableMangeUser from './TableMangeUser';
class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usersArr: [],
            id: '',
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

    handleOpenImage = () => {
        if (this.state.previewAvatar) {
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
        const form_data = new FormData();
        form_data.append('email', this.state.email)
        form_data.append('password', this.state.password);
        form_data.append('firstName', this.state.firstName);
        form_data.append('lastName', this.state.lastName);
        form_data.append('gender', this.state.gender);
        form_data.append('roleId', this.state.roleId);
        form_data.append('avatar', this.state.avatar);

        this.props.createNewUser(form_data)
    }

    handleOpenUpdate = (user) => {
        // let imageBase64 = ''
        // if (user.avatar) {
        //     imageBase64 = new Buffer(user.avatar, 'base64').toString('binary')
        // }
        this.setState({
            isUpdate: true,
            id: user.id,
            email: user.email,
            password: 'user.password',
            firstName: user.firstName,
            lastName: user.lastName,
            gender: user.gender,
            roleId: user.roleId,
            avatar: user.avatar,
            previewAvatar: user.avatar
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
        const form_data = new FormData();
        form_data.append('id', user.id);
        form_data.append('email', user.email)
        form_data.append('password', user.password);
        form_data.append('firstName', user.firstName);
        form_data.append('lastName', user.lastName);
        form_data.append('gender', user.gender);
        form_data.append('roleId', user.roleId);
        form_data.append('avatar', user.avatar);
        this.props.updateUser(form_data)
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
