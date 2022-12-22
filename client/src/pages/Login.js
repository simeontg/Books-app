import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../components/UI/Input';
import { AuthContext } from '../context/AuthContext'
// import useInput from '../hooks/useInput';
import axios from 'axios'
import Error from '../components/Error/Error'
import hideError from '../utils/hideError';
const baseUrl = "http://localhost:5000/api/v1/auth"



const Login = () => {
    const navigate = useNavigate()
    const { userLogin } = useContext(AuthContext);
    // const {value} = useInput()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const onSubmit = async (e) => { 
        e.preventDefault()
        // if(password.trim().length < 6){
        //     setError('Password must be at least 6 characters long')
        // }
            try{
                const {data} = await axios.post(`${baseUrl}/login`, { email, password })
                if(data){
                    userLogin(data)
                    navigate('/')
                }
            }catch(err){
                setError(err.response.data.msg)
                hideError(setError, 2000)
            }
       
    }

  return (
    <section className='form-container'>
            <form onSubmit={onSubmit}>
                <div className="form-data-container">
                    <h1>Login</h1>
                    {error && <Error message={error}/>}
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="password">Password:</label>
                    <input 
                    type="password" 
                    id='password' 
                    name="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                    <input type="submit" className="btn login" value="Login" />
                    <p className="field">
                        <span>
                            If you don't have profile click <Link to='/register'>here</Link>
                        </span>
                    </p>
                </div>
            </form>
        </section>
  )
}

export default Login