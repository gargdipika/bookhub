import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const {active} = props
  let specialStyleHome = 'list-element'
  if (active === 'Home') {
    specialStyleHome = 'list-element-home'
  }
  let specialStyleBookShelves = 'list-element'
  if (active === 'Bookshelves') {
    specialStyleBookShelves = 'list-element-home'
  }
  const onClickLogout = () => {
    const {history} = props
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
    </>
  )
}

export default withRouter(Header)
