import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
    }

    toggle = () => {
        this.props.toggleUserModal()
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
                <ModalHeader toggle={() => { this.toggle() }}>Modal title</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className="input-container">
                            <label>Email</label>
                            <input type="text" name='email' />
                        </div>
                        <div className="input-container">
                            <label>Password</label>
                            <input type="password" name='password' />
                        </div>
                        <div className="input-container">
                            <label>Firstname</label>
                            <input type="text" name='firstName' />
                        </div>
                        <div className="input-container">
                            <label>Lastname</label>
                            <input type="text" name='lastName' />
                        </div>
                        <div className="input-container">
                            <label>Gender</label>
                            <select name="gender">
                                <option value="1">Male</option>
                                <option value="0">Female</option>
                            </select>
                        </div>
                        <div className="input-container">
                            <label>Role</label>
                            <select name="roleId">
                                <option value="1">Admin</option>
                                <option value="0">User</option>
                            </select>
                        </div>
                        <div className="input-container">
                            <label>Avatar</label>
                            <input type="file" name='avatar' />
                        </div>
                        <div className="show-img">
                            <img></img>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => { this.toggle() }}>Do Something</Button>{' '}
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



