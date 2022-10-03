import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <section className='form-container'>
            <form>
                <div className="form-data-container">
                    <h1>Login</h1>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="email@gmail.com"
                    />
                    <label htmlFor="password">Password:</label>
                    <input type="password" id='password' name="password" />
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