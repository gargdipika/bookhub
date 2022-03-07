import {Switch, Route, Redirect} from 'react-router-dom'
import Login from './components/Login'
import './App.css'
import NotFound from './components/NotFound'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import BookShelves from './components/Bookshelves'
import BookDetail from './components/BookDetailRoute'

// use the below bookshelvesList for rendering read status of book items in Bookshelves Route

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/shelf" component={BookShelves} />
    <ProtectedRoute exact path="/books/:id" component={BookDetail} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
)

export default App
