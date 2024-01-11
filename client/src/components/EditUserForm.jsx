// EditUserForm.js
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateUser } from '../usersSlice'
import PropTypes from 'prop-types'
const EditUserForm = ({ user, onClose }) => {
  const dispatch = useDispatch()
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [age, setAge] = useState(user.age)
  const [sex, setSex] = useState(user.sex)
  const handleSubmit = (e) => {
    e.preventDefault()
    // if (name.trim() === '' || email.trim() === '' || age !== 0) {
    //   alert('Please fill in all fields.')
    //   return
    // }
    dispatch(updateUser({ id: user._id, name, email, age: parseInt(age), sex }))
    onClose()
  }

  return (
    <div>
      <h3>Edit User</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='name'>Name:</label>
          <input
            type='text'
            id='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='age'>Age:</label>
          <input
            type='number'
            id='age'
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='sex'>Sex:</label>
          <select id='sex' value={sex} onChange={(e) => setSex(e.target.value)}>
            <option value='Male'>Male</option>
            <option value='Female'>Female</option>
          </select>
        </div>
        <button type='submit'>Update User</button>
        <button type='button' onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  )
}

EditUserForm.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    sex: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
}

export default EditUserForm
