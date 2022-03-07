import {
  AiOutlineGoogle,
  AiOutlineTwitter,
  AiOutlineInstagram,
  AiFillYoutube,
} from 'react-icons/ai'
import './index.css'

const Footer = () => (
  <div className="footer-container footer-style">
    <div>
      <AiOutlineGoogle className="icons" />
      <AiOutlineTwitter className="icons" />
      <AiOutlineInstagram className="icons" />
      <AiFillYoutube className="icons" />
    </div>
    <p className="contact-us-title">Contact Us</p>
  </div>
)

export default Footer
