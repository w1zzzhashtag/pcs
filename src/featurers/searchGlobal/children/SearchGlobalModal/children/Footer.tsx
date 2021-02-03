import React from 'react'
import styles from './Footer.module.scss'

const Footer = () => {
  return (
    <div className="modal-container__footer">
      <div className={styles.container}>
        <div className={styles.item}>
          <span className={styles.item__keyboardShortcut}>Esc</span>
          <span className={styles.item__caption}>Закрыть</span>
        </div>
      </div>
    </div>
  )
}

export default Footer
