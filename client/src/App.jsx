// App.js
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import HomePage from './pages/HomePage'
import UsersPage from './pages/UsersPage'

import './App.css'

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul className='navbar'>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/users'>Users</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/users' element={<UsersPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
