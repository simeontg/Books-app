import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'
import Error from '../components/Error/Error'

const baseUrl = "http://localhost:5000/api/v1/auth"

const Register = () => {
    const navigate = useNavigate()

    const {userLogin} = useContext(AuthContext)

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        repass: ''
    })
    const [error, setError] = useState('')

    const onChangeHandler = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })

    }

    const onSubmit = async (e) => {
        e.preventDefault()
        const {username, email, password, repass} = formData

        try{
            const {data} = await axios.post(`${baseUrl}/register`, {username, email, password, repass})
            console.log(data)
            if(data){
                userLogin(data)
                navigate('/')
            } 
        } catch(err) {
            setError(err.response.data.msg)
        }
    }
    

  return (
    <section className='form-container'>
    <form onSubmit={onSubmit}>
        <div className="form-data-container">
            <h1>Register</h1>
            {error && <Error message={error}/>}
            <label htmlFor="username">Username:</label>
            <input
                type="text"
                id="username"
                name="username"
                placeholder="username"
                value={formData.username}
                onChange={onChangeHandler}
            />
            <label htmlFor="email">Email:</label>
            <input
                type="email"
                id="email"
                name="email"
                placeholder="email@gmail.com"
                value={formData.email}
                onChange={onChangeHandler}
            />
            <label htmlFor="password">Password:</label>
            <input 
            type="password"
            id="password" 
            name="password" 
            value={formData.password}
            onChange={onChangeHandler}
            />
            <label htmlFor="repass">Confirm password:</label>
            <input 
            type="password" 
            id="repass" 
            name="repass" 
            value={formData.repass}
            onChange={onChangeHandler}
            />
            <input type="submit" className="btn register" value="Register" />
            <p className="field">
                <span>
                    Have an account already? Click <Link to='/login'>here</Link>
                </span>
            </p>
        </div>
    </form>
   </section>
  )
}

export default Register