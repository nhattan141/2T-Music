import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLoginApi, handleSignupApi } from "../../services/userService"
import { reject } from 'lodash';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            usernameSignup: '',
            passwordSignup: '',
            confirm: '',
            errMessage: '',
        }
    }


    tranferSignup = () => {
        const loginText = document.querySelector(".title-text .login");
        const loginForm = document.querySelector("form.login");
        loginForm.style.marginLeft = "-50%";
        loginText.style.marginLeft = "-50%";
    }

    tranferLogin = () => {
        const loginText = document.querySelector(".title-text .login");
        const loginForm = document.querySelector("form.login");
        loginForm.style.marginLeft = "0%";
        loginText.style.marginLeft = "0%";
    }

    handleOnchangeUsername = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    handleOnchangePassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }
    handleOnchangeUsernameSignup = (e) => {
        this.setState({
            usernameSignup: e.target.value
        })
    }

    handleOnchangePasswordSignup = (e) => {
        this.setState({
            passwordSignup: e.target.value
        })
    }

    handleOnchangeConfirmPassword = (e) => {
        this.setState({
            confirm: e.target.value
        })
    }

    handleLogin = async (event) => {
        event.preventDefault()
        this.setState({
            errMessage: ''
        })
        try {
            let data = await handleLoginApi(this.state.username, this.state.password)
            if (data && data.errCode != 0) {
                this.setState({
                    errMessage: data.message
                })
            }

            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user)
            }
        } catch (e) {
            if (e.response) {
                if (e.response.data) {
                    this.setState({
                        errMessage: e.response.data.message
                    })
                }
            }
        }
        return false;
    }

    handleSignup = async (event) => {
        event.preventDefault();
        this.setState({
            errMessage: ''
        })
        try {
            let data = await handleSignupApi(this.state.usernameSignup, this.state.passwordSignup, this.state.confirm)
            if (data && data.errCode != 0) {
                this.setState({
                    errMessage: data.message
                })
            }
            if (data && data.errCode == 0) {
                this.props.userSignupSuccess(data.user)
            }
        } catch (e) {
            if (e.response) {
                if (e.response.data) {
                    this.setState({
                        errMessage: e.response.data.message
                    })
                }
            }
        }
        return false;
    }
    render() {

        return (
            <div className="form-group">
                <div className='wrapper'>
                    <div className='title-text'>
                        <div className='title login'>Login</div>
                        <div className='title signup'>Signup</div>
                    </div>
                    <div className='form-container'>
                        <div className='slide-controls'>
                            <input type='radio' name='slider' id='login' />
                            <input type='radio' name='slider' id='signup' />
                            <label htmlFor='login'
                                className='slide login'
                                onClick={() => this.tranferLogin()}
                            >
                                Login
                            </label>
                            <label htmlFor='signup'
                                className='slide signup'
                                onClick={() => this.tranferSignup()}
                            >
                                Signup
                            </label>
                            <div className='slide-tab'></div>
                        </div>
                        <div className='form-inner'>
                            {/* // form login */}
                            <form action='#' className='login'>
                                <div className='filed'>
                                    <input type='text'
                                        name='email'
                                        placeholder='Email'
                                        value={this.state.email}
                                        onChange={(event) => { this.handleOnchangeUsername(event) }}
                                    />
                                </div>
                                <div className='filed'>
                                    <input type='password'
                                        name='password'
                                        placeholder='Password'
                                        value={this.state.password}
                                        onChange={(event) => { this.handleOnchangePassword(event) }}
                                    />
                                </div>
                                <div className='pass-link'>
                                    <a href='#'>
                                        Forgot password
                                    </a>
                                </div>
                                <div className='social'>
                                    <i className="fab fa-facebook"></i>
                                    <i className="fab fa-google"></i>
                                    <i className="fab fa-instagram"></i>
                                </div>
                                <div className="err" style={{ color: 'red', textAlign: 'center' }}>
                                    {this.state.errMessage}
                                </div>
                                <div className='filed'>
                                    <input type='submit'
                                        value='Login'
                                        onClick={(event) => { this.handleLogin(event) }}
                                    />
                                </div>
                            </form>

                            {/* form sign up */}
                            <form action='#' className='signup'>
                                <div className='filed'>
                                    <input type='text'
                                        name='emailSignup'
                                        placeholder='Email'
                                        value={this.state.usernameSignup}
                                        onChange={(event) => this.handleOnchangeUsernameSignup(event)}
                                    />
                                </div>
                                <div className='filed'>
                                    <input type='password'
                                        name='passwordSignup'
                                        placeholder='Password'
                                        value={this.state.passwordSignup}
                                        onChange={(event) => this.handleOnchangePasswordSignup(event)}
                                    />
                                </div>
                                <div className='filed'>
                                    <input type='password'
                                        name='confirm'
                                        placeholder='Confirm password'
                                        value={this.state.confirm}
                                        onChange={(event) => this.handleOnchangeConfirmPassword(event)}
                                    />
                                </div>
                                <div className="err" style={{ color: 'red', textAlign: 'center' }}>
                                    {this.state.errMessage}
                                </div>
                                <div className='filed'>
                                    <input
                                        type='submit'
                                        value='Signup'
                                        onClick={(event) => { this.handleSignup(event) }}
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}



const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
        userSignupSuccess: (userInfo) => dispatch(actions.userSignupSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
