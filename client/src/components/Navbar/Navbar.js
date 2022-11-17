import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import { AuthContext } from '../../context/AuthContext'
import styles from './Navbar.module.css'
import { BiSearch } from 'react-icons/bi'

const Navbar = () => {
    const {isAuthenticated} = useContext(AuthContext)
    const [searchValue, setSearchValue] = useState('')

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

    const onSearchSubmit = (e) => {
        e.preventDefault()
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
                placeholder='Search books'
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                />
                <BiSearch className={styles['icon']} />
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