// UserList.js
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers, deleteUser } from '../usersSlice'
import EditUserForm from './EditUserForm'
import AddUserForm from './AddUserForm'

const UserList = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users.users)
  const loading = useSelector((state) => state.users.loading)
  const error = useSelector((state) => state.users.error)

  const [searchTerm, setSearchTerm] = useState('')
  const [sortOrder, setSortOrder] = useState('asc')
  const [ageFilter, setAgeFilter] = useState('')
  const [sexFilter, setSexFilter] = useState('')
  const [editUserId, setEditUserId] = useState(null)

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  const handleDeleteUser = (userId) => {
    dispatch(deleteUser(userId))
  }

  const handleEditUser = (userId) => {
    setEditUserId(userId)
  }

  const handleCloseEditForm = () => {
    setEditUserId(null)
  }

  const handleSortOrderChange = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
  }

  const handleAgeFilterChange = (e) => {
    setAgeFilter(e.target.value)
  }

  const applyAgeFilter = (userAge) => {
    if (!ageFilter) return true
    const [minAge, maxAge] = ageFilter.split('-').map(Number)
    return userAge >= minAge && userAge <= maxAge
  }

  const handleSexFilterChange = (e) => {
    setSexFilter(e.target.value)
  }

  const applySexFilter = (userSex) => {
    if (!sexFilter) return true
    return userSex === sexFilter
  }

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sortedUsers = filteredUsers.slice().sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.age - b.age
    } else {
      return b.age - a.age
    }
  })

  const filteredUsersByAge = sortedUsers.filter((user) =>
    applyAgeFilter(user.age)
  )

  const filteredUsersBySex = filteredUsersByAge.filter((user) =>
    applySexFilter(user.sex)
  )

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div>
      <h2>User List</h2>
      <div className='search-container'>
        <input
          type='text'
          placeholder='Search by name...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className='filter-container'>
        <select value={ageFilter} onChange={handleAgeFilterChange}>
          <option value=''>All Ages</option>
          <option value='18-24'>18-24</option>
          <option value='25-30'>25-30</option>
          <option value='31-36'>31-36</option>
          <option value='37-42'>37-42</option>
        </select>
        <select value={sexFilter} onChange={handleSexFilterChange}>
          <option value=''>All Sexes</option>
          <option value='Male'>Male</option>
          <option value='Female'>Female</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Sex</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsersBySex.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.age}</td>
              <td>{user.sex}</td>
              <td>
                <button
                  className='update-button'
                  onClick={() => handleEditUser(user._id)}
                >
                  Edit
                </button>
                <button
                  className='delete-button'
                  onClick={() => handleDeleteUser(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleSortOrderChange}>
        Sort by Age {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
      </button>

      {editUserId ? (
        <EditUserForm
          user={users.find((user) => user._id === editUserId)}
          onClose={handleCloseEditForm}
        />
      ) : (
        <AddUserForm />
      )}
    </div>
  )
}

export default UserList
