import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/dfpu8h7gi/image/upload/v1646668431/Group_7484_e6hpi0.png"
      alt="not found"
    />
    <h1 className="heading">Page Not Found</h1>
    <p className="para">
      we are sorry, the page you requested could not be found Please go back to
      home page
    </p>
    <Link to="/">
      <button className="homepage-button" type="button">
        Go Back To Home
      </button>
    </Link>
  </div>
)

export default NotFound
