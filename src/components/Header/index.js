import {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {BsList} from 'react-icons/bs'
import {TiDelete} from 'react-icons/ti'
import Cookies from 'js-cookie'
import './index.css'

class Header extends Component {
  state = {isShowList: false}

  onCLickList = () => {
    this.setState({isShowList: true})
  }

  notToShow = () => {
    this.setState({isShowList: false})
  }

  render() {
    const {isShowList} = this.state
    console.log(isShowList)
    const {active} = this.props
    let specialStyleHome = 'list-element'
    if (active === 'Home') {
      specialStyleHome = 'list-element-home'
    }
    let specialStyleBookShelves = 'list-element'
    if (active === 'Bookshelves') {
      specialStyleBookShelves = 'list-element-home'
    }
    const onClickLogout = () => {
      const {history} = this.props
      Cookies.remove('jwt_token')
      history.replace('/login')
    }

    return (
      <>
        <nav className="navbar-element">
          <Link to="/">
            <img
              className="home-logo"
              src="https://res.cloudinary.com/dfpu8h7gi/image/upload/v1646301304/Group_7731_oo0h5u.png"
              alt="website logo"
            />
          </Link>
          <BsList onClick={this.onCLickList} className="list-icon" />
          <ul className="list">
            <Link to="/" className="link-element">
              <li className={`${specialStyleHome}`}>Home</li>
            </Link>
            <Link to="/shelf" className="link-element">
              <li className={`${specialStyleBookShelves}`}>Bookshelves</li>
            </Link>
            <button
              type="button"
              onClick={onClickLogout}
              className="logout-button"
            >
              Logout
            </button>
          </ul>
        </nav>
        {isShowList && (
          <ul className="list-mobile-view">
            <Link to="/" className="link-element">
              <li className={`${specialStyleHome}`}>Home</li>
            </Link>
            <Link to="/shelf" className="link-element">
              <li className={`${specialStyleBookShelves}`}>Bookshelves</li>
            </Link>
            <button
              type="button"
              onClick={onClickLogout}
              className="logout-button"
            >
              Logout
            </button>
            <TiDelete onClick={this.notToShow} className="ti-delete" />
          </ul>
        )}
      </>
    )
  }
}

export default withRouter(Header)
