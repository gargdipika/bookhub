import {Component} from 'react'
import {Link} from 'react-router-dom'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const statusConstant = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {booksDetail: [], apiStatus: statusConstant.initial}

  componentDidMount = () => {
    this.getData()
  }

  getData = async () => {
    this.setState({apiStatus: statusConstant.inProgress})
    const url = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const jwtToken = Cookies.get('jwt_token')
    const option = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(url, option)
    const data = await response.json()
    if (response.ok) {
      const updateData = data.books.map(eachBook => ({
        authorName: eachBook.author_name,
        coverPic: eachBook.cover_pic,
        id: eachBook.id,
        title: eachBook.title,
      }))
      this.setState({
        booksDetail: updateData,
        apiStatus: statusConstant.success,
      })
    } else {
      this.setState({apiStatus: statusConstant.failure})
    }
  }

  renderLoader = () => (
    <div testid="loader">
      <Loader type="ThreeDots" color="#000000" height="50" width="50" />
    </div>
  )

  renderSuccess = () => {
    const {booksDetail} = this.state
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
    }
    return (
      <Slider {...settings}>
        {booksDetail.map(eachBook => {
          const {authorName, title, id, coverPic} = eachBook
          return (
            <Link className="link-element" key={id} to={`/books/${id}`}>
              <div className="slick-item" key={id}>
                <img className="cover-pic" src={coverPic} alt="company logo" />
                <h1 className="title">{title}</h1>
                <p className="author">{authorName}</p>
              </div>
            </Link>
          )
        })}
      </Slider>
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
      case statusConstant.inProgress:
        return this.renderLoader()
      case statusConstant.success:
        return this.renderSuccess()
      case statusConstant.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  onClickFindBook = () => {
    const {history} = this.props
    history.replace('/bookshelves')
  }

  render() {
    return (
      <div className="background-home">
        <Header active="Home" />
        <div className="home">
          <h1 className="heading-home">Find Your Next Favorite Books?</h1>
          <p className="des-home">
            You are in the right place. Tell us what titles or genres you have
            enjoyed in the past, and we will give you surprisingly insightful
            recommendations.
          </p>
          <div className="top-rated-book-details">
            <div className="top-rated-book-details-header">
              <h1 className="top-rated-heading">Top Rated Books</h1>
              <Link to="/bookshelves">
                <button
                  className="find-book-button"
                  onClick={this.onClickFindBook}
                  type="button"
                >
                  Find Books
                </button>
              </Link>
            </div>
            {this.renderResult()}
          </div>
          <Footer />
        </div>
      </div>
    )
  }
}

export default Home
