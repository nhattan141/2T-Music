import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { handleGetAllUsersApi, handleCreateNewUser, handleDeleteUser, handleUpdateUser } from '../../services/userService'
import './UserManage.scss'
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import { emitter } from '../../utils/emitter'
class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usersArr: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit: {}
        }
    }

    async componentDidMount() {
        await this.handleGetAllUser()
    }

    handleGetAllUser = async () => {
        let res = await handleGetAllUsersApi('All')
        if (res && res.errCode === 0) {
            this.setState({
                usersArr: res.users
            })

        }

        console.log(this.state.usersArr);
    }

    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true
        })
    }

    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser
        })
    }
    toggleUserModalEdit = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser
        })
    }

    createNewUser = async (data) => {
        try {
            let res = await handleCreateNewUser(data)
            if (res && res.errCode !== 0) {
                alert(res.message)
            } else {
                await this.handleGetAllUser()
                this.setState({
                    isOpenModalUser: false
                })

                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }
        } catch (e) {
            console.log(e);
        }
    }

    handleDeleteUser = async (userId) => {
        try {
            let res = await handleDeleteUser(userId)
            if (res && res.errCode !== 0) {
                alert(res.message)
            } else {
                await this.handleGetAllUser()
            }
        } catch (e) {
            console.log(e);
        }
    }

    handleUpdateUser = async (user) => {
        console.log(user);
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user
        })
    }

    updateUser = async (data) => {
        try {
            let res = await handleUpdateUser(data)
            if (res && res.errCode !== 0) {
                alert(res.message)
            } else {
                await this.handleGetAllUser()
                this.setState({
                    isOpenModalEditUser: false
                })
            }
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        let usersArr = this.state.usersArr
        return (
            <div className="user-manage-container">
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleUserModal={this.toggleUserModal}
                    createNewUser={this.createNewUser}
                />
                {this.state.isOpenModalEditUser &&
                    <ModalEditUser
                        isOpen={this.state.isOpenModalEditUser}
                        toggleUserModal={this.toggleUserModalEdit}
                        updateUser={this.updateUser}
                        currentUser={this.state.userEdit}
                    />
                }
                <div className='title'>Manage User</div>
                <div className='mx-2'>
                    <button type="button"
                        style={{ backgroundColor: '#1ca47d' }}
                        className="btn btn-success btn_add"
                        onClick={() => this.handleAddNewUser()}
                    >
                        <i className="fas fa-plus"></i>
                        Add new user
                    </button>
                </div>
                <div className='users-table mt-4 mx-2'>
                    <table className="table table-hover table-fixed table-striped table-bordered">
                        <thead className="table-dark">
                            <tr>
                                <th>#</th>
                                <th>Email</th>
                                <th>Firstname</th>
                                <th>Lastname</th>
                                <th>Gender</th>
                                <th>Role</th>
                                <th>Avatar</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                usersArr && usersArr.map((user, index) => {
                                    return (
                                        <tr key={index}>
                                            <th scope="row">{index}</th>
                                            <td>{user.email}</td>
                                            <td>{user.firstName}</td>
                                            <td>{user.lastName}</td>
                                            <td>{user.gender === 1 ? 'Male' : 'Female'}</td>
                                            <td>{user.roleId === 1 ? 'Admin' : 'User'}</td>
                                            <td>
                                                <img src={user.avatar.buffer} alt='avatar'></img>
                                            </td>
                                            <td>
                                                <button className='btn-edit'
                                                    onClick={() => { this.handleUpdateUser(user) }}
                                                >
                                                    <i className="fas fa-edit"></i>
                                                </button>
                                                <button className='btn-delete'
                                                    onClick={() => { this.handleDeleteUser(user.id) }}
                                                >
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>


                    </table>

                </div>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
