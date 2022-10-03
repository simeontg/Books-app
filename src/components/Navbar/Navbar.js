import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import styles from './Navbar.module.css'

const Navbar = () => {
  return (
    <header className={styles['main-header']}>
        <div className={styles['logo-container']}>
            <Link className="home" to="/">
                <img src={logo} alt='logo'/>
            </Link>
        </div>
        <nav>
            <Link to="/catalog">All books</Link>

            <div className={styles.links}>
                <Link to="/create">Add Books</Link>
                <Link to="/create">My Profile</Link>
                <Link to="/logout">Logout</Link>
            </div>

            <div className={styles.links}>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </div>
        </nav>
    </header>
  )
}

export default Navbar