import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../components/UI/Input';
import { AuthContext } from '../context/AuthContext';
// import useInput from '../hooks/useInput';
import * as authService from '../services/authService'




const Login = () => {
    const navigate = useNavigate()
    const { userLogin } = useContext(AuthContext);
    // const {value} = useInput()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmit = async (e) => { 
        e.preventDefault()
        try {
            const data = await authService.login(email, password)
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
                    <h1>Login</h1>
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