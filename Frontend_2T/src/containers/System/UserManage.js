import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { handleGetAllUsersApi } from '../../services/userService'
import './UserManage.scss'
import ModalUser from './ModalUser';
class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usersArr: [],
            isOpenModalUser: false,
        }
    }

    async componentDidMount() {
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

    render() {
        let usersArr = this.state.usersArr
        return (
            <div className="user-manage-container">
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleUserModal={this.toggleUserModal}
                />
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
                                            <th scope="row">{user.id}</th>
                                            <td>{user.email}</td>
                                            <td>{user.firstName}</td>
                                            <td>{user.lastName}</td>
                                            <td>{user.gender === 1 ? 'Male' : 'Female'}</td>
                                            <td>{user.roleId === 1 ? 'Admin' : 'User'}</td>
                                            <td>{user.avatar.data}</td>
                                            <td>
                                                <button className='btn-edit'>
                                                    <i className="fas fa-edit"></i>
                                                </button>
                                                <button className='btn-delete'>
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
