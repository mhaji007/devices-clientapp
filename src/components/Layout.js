import React from 'react'
import styles from './Layout.module.css'
function Layout({children}) {
    return (
        <div className={styles.wrapper}>
            {children}
        </div>
    )
}

export default Layout
