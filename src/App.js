import {Switch, Route} from 'react-router-dom'
import Login from './components/Login'
import './App.css'

import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import BookShelves from './components/Bookshelves'

// use the below bookshelvesList for rendering read status of book items in Bookshelves Route

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/shelf" component={BookShelves} />
  </Switch>
)

export default App
