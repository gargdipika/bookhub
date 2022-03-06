import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userdata = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const option = {
      method: 'POST',
      body: JSON.stringify(userdata),
    }
    const response = await fetch(url, option)
    const loginResponse = await response.json()
    if (response.ok) {
      const jwtToken = loginResponse.jwt_token
      Cookies.set('jwt_token', jwtToken, {expires: 30})
      const {history} = this.props
      history.replace('/')
    } else {
      const errorMsg = loginResponse.error_msg
      this.setState({errorMsg})
    }
  }

  render() {
    const {errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-page">
        <div>
          <img
            className="image-login"
            src="https://res.cloudinary.com/dfpu8h7gi/image/upload/v1646300085/Rectangle_1467_shqyh2.png"
            alt="website login"
          />
        </div>
        <form className="group7558" onSubmit={this.onSubmitForm}>
          <img
            className="bookhub-logo"
            src="https://res.cloudinary.com/dfpu8h7gi/image/upload/v1646301304/Group_7731_oo0h5u.png"
            alt="login website logo"
          />
          <div className="input-container">
            <label className="label" htmlFor="username">
              Username*
            </label>
            <input
              onChange={this.onChangeUsername}
              className="input-login"
              type="text"
              id="username"
            />
            <label className="label" htmlFor="password">
              Password*
            </label>
            <input
              onChange={this.onChangePassword}
              className="input-login"
              type="password"
              id="password"
            />
            <button type="submit" className="login-button">
              Login
            </button>
            <p className="error-message">{errorMsg}</p>
          </div>
        </form>
      </div>
    )
  }
}

export default Login
