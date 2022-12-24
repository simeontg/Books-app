import React from 'react'
import styles from './IconBtn.module.css'

const IconBtn = ({ Icon, isActive, color, children, ...props }) => {
  return (
  <button 
  className={`${styles.btn} ${styles['icon-btn']} ${isActive ? styles['icon-btn-active'] : ''}`}
  {...props}
  >
    <span className={`${children !== null ? styles['mr-1'] : ''}`}>
        <Icon />
    </span>
    {children}
  </button>
  )
}

export default IconBtn