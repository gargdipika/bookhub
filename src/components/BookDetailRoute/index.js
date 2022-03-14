import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsFillStarFill} from 'react-icons/bs'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const statusConstant = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

class BookDetail extends Component {
  state = {bookDetail: {}, apiStatus: statusConstant.initial}

  componentDidMount = () => {
    this.getData()
  }

  getData = async () => {
    this.setState({apiStatus: statusConstant.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/book-hub/books/${id}`
    const option = {
      method: 'GET',
      headers: {
        Authorization: `Bearers ${jwtToken}`,
      },
    }
    const response = await fetch(url, option)
    const responseData = await response.json()
    if (response.ok) {
      const updatedData = {
        aboutAuthor: responseData.book_details.about_author,
        aboutBook: responseData.book_details.about_book,
        authorName: responseData.book_details.author_name,
        coverPic: responseData.book_details.cover_pic,
        id: responseData.book_details.id,
        rating: responseData.book_details.rating,
        readStatus: responseData.book_details.read_status,
        title: responseData.book_details.title,
      }
      console.log(updatedData)
      this.setState({
        bookDetail: updatedData,
        apiStatus: statusConstant.success,
      })
    } else {
      this.setState({apiStatus: statusConstant.failure})
    }
  }

  renderLoader = () => (
    <div testid="loader" className="loader">
      <Loader type="Oval" color="#0284c7" height="50" width="50" />
    </div>
  )

  renderSuccess = () => {
    const {bookDetail} = this.state
    const {
      coverPic,
      title,
      authorName,
      rating,
      readStatus,
      aboutAuthor,
      aboutBook,
    } = bookDetail
    return (
      <div className="book-detail-success-container">
        <div className="top-container">
          <img className="book-detail-cover-pic" src={coverPic} alt={title} />
          <div>
            <h1 className="book-detail-title">{title}</h1>
            <p className="book-detail-author-name">{authorName}</p>
            <div className="book-detail-rating-container">
              <p className="book-detail-author-name">Avg Rating</p>
              <BsFillStarFill className="book-detail-star-icon" />
              <p className="rate">{rating}</p>
            </div>
            <div className="book-detail-rating-container">
              <p className="book-detail-author-name">Status:</p>
              <p className="status-detail">{readStatus}</p>
            </div>
          </div>
        </div>
        <hr className="horizontal-line" />
        <h1 className="about-author">About Author</h1>
        <p className="author-detail">{aboutAuthor}</p>
        <h1 className="about-author">About Book</h1>
        <p className="author-detail">{aboutBook}</p>
      </div>
    )
  }

  renderFailure = () => {
    const onClickTryAgain = () => {
      this.setState({apiStatus: statusConstant.inProgress}, this.getData)
    }
    return (
      <div className="failure-container">
        <img
          src="https://res.cloudinary.com/dfpu8h7gi/image/upload/v1646582637/Group_7522_bqmvgl.png"
          alt="failure view"
        />
        <p className="issue-message">Something went wrong. Please try again</p>
        <button
          onClick={onClickTryAgain}
          className="try-again-button"
          type="button"
        >
          Try Again
        </button>
      </div>
    )
  }

  renderResult = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case statusConstant.failure:
        return this.renderFailure()
      case statusConstant.success:
        return this.renderSuccess()
      case statusConstant.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="book-detail-container">
          {this.renderResult()}
          <Footer className="footer-style" />
        </div>
      </div>
    )
  }
}

export default BookDetail
