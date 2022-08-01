import { result } from 'lodash';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { CommonUtils } from '../../utils'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { handleCreateNewUser } from '../../services/userService'
import './Modal.scss'
import { emitter } from '../../utils/emitter'

class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            gender: 1,
            roleId: 1,
            avatar: '',
            previewAvatar: ''
        }
        this.listenToEmitter()
    }

    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                gender: 1,
                roleId: 1,
                avatar: '',
                previewAvatar: ''
            })
        })
    }

    componentDidMount() {
    }

    toggle = () => {
        this.props.toggleUserModal()
    }

    handleOnchangeInput = async (e, id) => {
        if (id == 'avatar') {
            let data = e.target.files
            let file = data[0]

            if (file) {
                let base64 = await CommonUtils.getBase64(file)
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

    validate = () => {
        let isValid = true
        let arrInput = ["email", "password",
            "firstName", "lastName",
            "gender", "roleId", "avatar"]
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false
                alert("Missing input " + arrInput[i])
                break
            }
        }

        return isValid
    }

    handleCreateNewUser = () => {
        let isValidate = this.validate()
        if (isValidate === true) {
            this.props.createNewUser(this.state)
        }
    }

    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                size="lg"
                centered
                className='modal-user-container'
            >
                <ModalHeader toggle={() => { this.toggle() }}>Add new user</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className="input-container">
                            <label>Email</label>
                            <input type="text"
                                name='email'
                                value={this.state.email}
                                onChange={(event) => { this.handleOnchangeInput(event, 'email') }}
                            />
                        </div>
                        <div className="input-container">
                            <label>Password</label>
                            <input
                                type="password"
                                name='password'
                                value={this.state.password}
                                onChange={(event) => { this.handleOnchangeInput(event, 'password') }}
                            />
                        </div>
                        <div className="input-container">
                            <label>Firstname</label>
                            <input
                                type="text"
                                name='firstName'
                                value={this.state.firstName}
                                onChange={(event) => { this.handleOnchangeInput(event, 'firstName') }}
                            />
                        </div>
                        <div className="input-container">
                            <label>Lastname</label>
                            <input
                                type="text"
                                name='lastName'
                                value={this.state.lastName}

                                onChange={(event) => { this.handleOnchangeInput(event, 'lastName') }}

                            />
                        </div>
                        <div className="input-container">
                            <label>Gender</label>
                            <select name="gender"
                                onChange={(event) => { this.handleOnchangeInput(event, 'gender') }}
                            >
                                <option value="1">Male</option>
                                <option value="0">Female</option>
                            </select>
                        </div>
                        <div className="input-container">
                            <label>Role</label>
                            <select name="roleId"
                                onChange={(event) => { this.handleOnchangeInput(event, 'roleId') }}
                            >
                                <option value="1">Admin</option>
                                <option value="0">User</option>
                            </select>
                        </div>
                        <div className="input-container">
                            <label>Avatar</label>
                            <input
                                type="file"
                                name='avatar'
                                onChange={(event) => { this.handleOnchangeInput(event, 'avatar') }}
                            />
                        </div>
                        <div className="show-img">
                            <img src={this.state.previewAvatar} alt='avatar'></img>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => { this.handleCreateNewUser() }}>Add new</Button>{' '}
                    <Button color="secondary" onClick={() => { this.toggle() }}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);



