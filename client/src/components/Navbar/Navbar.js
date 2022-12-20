import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import { AuthContext } from '../../context/AuthContext'
import styles from './Navbar.module.css'
import { BiSearch } from 'react-icons/bi'

const Navbar = () => {
    const {isAuthenticated} = useContext(AuthContext)
    const [searchValue, setSearchValue] = useState('')
    const navigate = useNavigate()
    const {userLogout} = useContext(AuthContext)


    const onLogoutHandler = () => {
        userLogout()
        navigate('/')
    }

    const userNavBar = (
        <div className={styles.links}>
        <Link to="/create">Add Books</Link>
        <Link to="/profile">My Profile</Link>
        <Link onClick={onLogoutHandler}>Logout</Link>
        </div>
    )
    const gusetNavBar = (
        <div className={styles.links}>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        </div>
    )

    const onSearchSubmit = (e) => {
        e.preventDefault()
        navigate(`/search/${searchValue}`)
        setSearchValue('')
    }


  return (
    <header className={styles['main-header']}>
        <div className={styles['logo-container']}>
            <Link className="home" to="/">
                <img src={logo} alt='logo'/>
            </Link>
        </div>
        <div className={styles['form-container']}>
            <form className={styles['form']} onSubmit={onSearchSubmit}>
                <input 
                className={styles['search']} 
                type="text" 
                placeholder='Search books by title or author'
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                />
                <BiSearch onClick={onSearchSubmit} className={styles['icon']} />
            </form>
        </div>
        <nav>
            <Link to="/catalog">All books</Link>
            {isAuthenticated ? userNavBar : gusetNavBar}
        </nav>
    </header>
  )
}

export default Navbar