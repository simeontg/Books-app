import React from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <section className='form-container'>
    <form>
        <div className="form-data-container">
            <h1>Register</h1>
            <label htmlFor="username">Username:</label>
            <input
                type="text"
                id="username"
                name="username"
                placeholder="username"
            />
            <label htmlFor="email">Email:</label>
            <input
                type="email"
                id="email"
                name="email"
                placeholder="email@gmail.com"
            />
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" />
            <label htmlFor="repeat-password">Confirm password:</label>
            <input type="password" id="repeat-password" name="repeat-password" />
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