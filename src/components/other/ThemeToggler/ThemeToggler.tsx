import React from 'react'
import cn from 'classnames'
import styles from './ThemeToggler.module.scss'
import { ThemeContext } from '../../../app/contexts'

const ThemeToggler = () => {
  const { theme, toggleTheme } = React.useContext(ThemeContext)

  return (
    <div
      onClick={toggleTheme}
      className={cn(styles.wrapper, styles[theme])}
      title={`Переключиться на ${theme === 'light' ? 'тёмную' : 'светлую'} тему`}
    >
      <span className={styles.sun} role="img" aria-label="light">🌞</span>
      <span className={styles.moon} role="img" aria-label="dark">🌛</span>
      <span className={cn(styles.thumb, styles[theme])}></span>
    </div>
  )
}

export default ThemeToggler
