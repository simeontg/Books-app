import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import { AuthContext } from '../../context/AuthContext'
import styles from './Navbar.module.css'

const Navbar = () => {
    const {isAuthenticated} = useContext(AuthContext)
    const userNavBar = (
        <div className={styles.links}>
        <Link to="/create">Add Books</Link>
        <Link to="/profile">My Profile</Link>
        <Link to="/logout">Logout</Link>
        </div>
    )
    const gusetNavBar = (
        <div className={styles.links}>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        </div>
    )



  return (
    <header className={styles['main-header']}>
        <div className={styles['logo-container']}>
            <Link className="home" to="/">
                <img src={logo} alt='logo'/>
            </Link>
        </div>
        <nav>
            <Link to="/catalog">All books</Link>
            {isAuthenticated ? userNavBar : gusetNavBar}
        </nav>
    </header>
  )
}

export default Navbar