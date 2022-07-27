import { result, uniq } from 'lodash';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { handleCreateNewUser } from '../../services/userService'
import './Modal.scss'
import { emitter } from '../../utils/emitter'
import _ from 'lodash'


class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            gender: this.props.currentUser.gender,
            roleId: this.props.currentUser.roleId,
            avatar: ''
        }
    }

    componentDidMount() {
        let user = this.props.currentUser
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                password: 'hashpassword',
                firstName: user.firstName,
                lastName: user.lastName,
                gender: user.gender,
                roleId: user.roleId,
                avatar: user.avatar,
            })

        }
    }

    toggle = () => {
        this.props.toggleUserModal()
    }

    handleOnchangeInput = (e, id) => {
        let copyState = { ...this.state }
        copyState[id] = e.target.value
        this.setState({
            ...copyState,
        })
        console.log(e.target.value);
    }

    handleEditNewUser = async () => {
        await this.props.updateUser(this.state)
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
                <ModalHeader toggle={() => { this.toggle() }}>Edit user</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className="input-container">
                            <label>Email</label>
                            <input type="text"
                                name='email'
                                value={this.state.email}
                                disabled
                            />
                        </div>
                        <div className="input-container">
                            <label>Password</label>
                            <input
                                type="password"
                                name='password'
                                value={this.state.password}
                                disabled
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
                            <select name="gender" defaultValue={this.state.gender}
                                onChange={(event) => { this.handleOnchangeInput(event, 'gender') }}
                            >
                                <option value="1" >Male</option>
                                <option value="0">Female</option>
                            </select>
                        </div>
                        <div className="input-container">
                            <label>Role</label>
                            <select name="roleId" defaultValue={this.state.roleId}
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
                            <img src={this.state.avatar} alt='avatar'></img>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => { this.handleEditNewUser() }}>Edit</Button>{' '}
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



