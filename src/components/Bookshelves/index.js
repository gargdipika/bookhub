import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import {BsSearch, BsFillStarFill} from 'react-icons/bs'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

const statusConstant = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

class BookShelves extends Component {
  state = {
    activeTab: 'ALL',
    searchText: '',
    booksList: [],
    apiStatus: statusConstant.initial,
  }

  componentDidMount = () => {
    this.getData()
  }

  getData = async () => {
    this.setState({apiStatus: statusConstant.inProgress})
    const {activeTab, searchText} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/book-hub/books?shelf=${activeTab}&search=${searchText}`
    const option = {
      method: 'GET',
      headers: {
        Authorization: `Bearers ${jwtToken}`,
      },
    }
    const response = await fetch(url, option)
    const responseData = await response.json()
    if (response.ok) {
      const updatedBookList = responseData.books.map(eachBook => ({
        authorName: eachBook.author_name,
        coverPic: eachBook.cover_pic,
        id: eachBook.id,
        rating: eachBook.rating,
        readStatus: eachBook.read_status,
        title: eachBook.title,
      }))
      console.log(updatedBookList)
      this.setState({
        apiStatus: statusConstant.success,
        booksList: updatedBookList,
      })
    } else {
      this.setState({apiStatus: statusConstant.failure})
    }
  }

  onChangeSearchText = event => {
    this.setState({searchText: event.target.value})
  }

  onClickSearchIcon = () => {
    this.getData()
  }

  renderLoader = () => (
    <div testid="loader" className="loader">
      <Loader type="Oval" color="#0284c7" height="50" width="50" />
    </div>
  )

  renderEmpty = () => {
    const {searchText} = this.state

    return (
      <div className="empty-container">
        <img
          src="https://res.cloudinary.com/dfpu8h7gi/image/upload/v1646666863/Group_uroew1.png"
          alt="no books"
        />
        <p className="empty-text">
          Your search for {searchText} did not find any matches.
        </p>
      </div>
    )
  }

  renderSuccess = () => {
    const {booksList} = this.state
    const isEmpty = booksList.length === 0

    return (
      <ul className="books-list">
        {isEmpty
          ? this.renderEmpty()
          : booksList.map(eachBookDetail => {
              const {
                authorName,
                coverPic,
                title,
                id,
                readStatus,
                rating,
              } = eachBookDetail
              return (
                <Link to={`/books/${id}`} className="link" key={id}>
                  <li className="list-style-second" key={id}>
                    <img
                      className="cover-pic-style"
                      src={coverPic}
                      alt={title}
                    />
                    <div className="success-inside-container">
                      <h1 className="book-detail-heading">{title}</h1>
                      <p className="author-book">{authorName}</p>
                      <div className="rating-container">
                        <p className="avg-rating">Avg Rating</p>
                        <BsFillStarFill className="start-icon" />
                        <p className="rating">{rating}</p>
                      </div>
                      <div className="rating-container">
                        <p className="status-style">Status:</p>
                        <p className="status">{readStatus}</p>
                      </div>
                    </div>
                  </li>
                </Link>
              )
            })}
      </ul>
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

  renderSideContainer = () => (
    <div className="side-container">
      <h1 className="bookshelves">Bookshelves</h1>
      <ul className="unordered-list">
        {bookshelvesList.map(eachData => {
          const {activeTab} = this.state
          const isClick = activeTab === eachData.value
          const style = isClick ? 'is-click-style' : ''
          const changeActiveTab = () => {
            this.setState({activeTab: eachData.value}, this.getData)
          }
          return (
            <button
              type="button"
              className={`list-style ${style}`}
              key={eachData.id}
              value={eachData.value}
              onClick={changeActiveTab}
            >
              {eachData.label}
            </button>
          )
        })}
      </ul>
    </div>
  )

  render() {
    const {activeTab} = this.state

    let heading = ''
    if (activeTab === 'ALL') {
      heading = 'All'
    } else if (activeTab === 'READ') {
      heading = 'Read'
    } else if (activeTab === 'CURRENTLY_READING') {
      heading = 'Currently Reading'
    } else if (activeTab === 'WANT_TO_READ') {
      heading = 'Want to Read'
    }
    console.log(heading)
    return (
      <div>
        <Header active="Bookshelves" />
        <div className="Bookshelves-container">
          <div className="search-container for-mobile-view">
            <input
              onChange={this.onChangeSearchText}
              className="search-input "
              type="search"
              placeholder="Search"
            />
            <button
              testid="searchButton"
              className="button"
              type="button"
              onClick={this.onClickSearchIcon}
            >
              <BsSearch className="search-icon" />
            </button>
          </div>
          {this.renderSideContainer()}
          <div className="success-container">
            <div className="books-list for-desktop-view">
              <h1 className="heading-books for-desktop-view">
                {heading} Books
              </h1>
              <div className="search-container for-desktop-view">
                <input
                  onChange={this.onChangeSearchText}
                  className="search-input"
                  type="search"
                  placeholder="Search"
                />
                <button
                  testid="searchButton"
                  className="button"
                  type="button"
                  onClick={this.onClickSearchIcon}
                >
                  <BsSearch className="search-icon" />
                </button>
              </div>
            </div>
            <div className="bottom-container-book-shelves">
              {this.renderResult()}
            </div>{' '}
            <Footer />
          </div>
        </div>
      </div>
    )
  }
}

export default BookShelves
