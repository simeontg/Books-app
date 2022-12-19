import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import * as authService from '../services/authService'

const Register = () => {
    const navigate = useNavigate()

    const {userLogin} = useContext(AuthContext)

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        repass: ''
    })

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
            const data = await authService.register(username, email, password,repass)
            if(data){
                userLogin(data)
                navigate('/')
            }
        }catch(err){
            console.log(err)
        }


    }
    

  return (
    <section className='form-container'>
    <form onSubmit={onSubmit}>
        <div className="form-data-container">
            <h1>Register</h1>
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