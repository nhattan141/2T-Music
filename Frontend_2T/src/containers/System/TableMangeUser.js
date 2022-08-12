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
            previewAvatar: 'http://127.0.0.1:8887/images/profile_pic-1660225668467.jpg',
            isOpen: false,
            isUpdate: false,
        }
    }

    async componentDidMount() {
        this.props.getAllUser()
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                usersArr: this.props.listUsers,
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                gender: 1,
                roleId: 1,
                avatar: '',
                previewAvatar: logo
            })
        }
    }

    handleDeleteUser = (user) => {
        this.props.deleteUser(user.id)
    }

    render() {
        let { usersArr } = this.state
        console.log('usersArr: ', usersArr);
        return (
            <div className="user-manage-table">
                <table className="table table-striped table-hover">
                    <thead style={{ background: '#21d5a2', color: '#FFFFFF' }}>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Email</th>
                            <th scope="col">First name</th>
                            <th scope="col">Last name</th>
                            <th scope="col">Gender</th>
                            <th scope="col">Role</th>
                            <th scope="col">Avatar</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            usersArr && usersArr.length > 0 &&
                            usersArr.map((user, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index}</td>
                                        <td>{user.email}</td>
                                        <td>{user.firstName}</td>
                                        <td>{user.lastName}</td>
                                        <td>
                                            {
                                                user.gender === 1 ? 'Male' : 'Female'
                                            }
                                        </td>
                                        <td>
                                            {
                                                user.roleId === 1 ? 'Admin' : 'User'
                                            }
                                        </td>
                                        <td>
                                            <div className="user-avatar">
                                                <img src={user.avatar}>
                                                </img>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='control'>
                                                <button type="button" className="btn-edit"
                                                    onClick={() => this.props.handleOpenUpdate(user)}
                                                >
                                                    <i className="fas fa-edit"></i>
                                                </button>
                                                <button type="button" className="btn-delete"
                                                    onClick={() => this.handleDeleteUser(user)}
                                                >
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllUser: () => dispatch(actions.getAllUser()),
        deleteUser: (userId) => dispatch(actions.deleteUser(userId)),
        updateUser: (user) => dispatch(actions.updateUser(user)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
