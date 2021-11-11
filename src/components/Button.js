import React from 'react'
import styles from './Button.module.css'
function Button({ children, className, primary, danger, ...props }) {
    return (
        <button className={[styles.button, className || '', primary ? styles.primary : '', danger ? styles.danger : ''].join(' ')} {...props}>{children}</button>
    )
}

export default Button
