// AddUserForm.js
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addUser } from '../usersSlice'

const AddUserForm = () => {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [age, setAge] = useState('')
  const [sex, setSex] = useState('Male')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name.trim() === '' || email.trim() === '' || age.trim() === '') {
      alert('Please fill in all fields.')
      return
    }
    dispatch(addUser({ name, email, age: parseInt(age), sex }))
    setName('')
    setEmail('')
    setAge('')
    setSex('Male')
  }

  return (
    <div>
      <h3>Add User</h3>
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
        <button type='submit'>Add User</button>
      </form>
    </div>
  )
}

export default AddUserForm
