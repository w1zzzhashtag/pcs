import React from 'react'
import cn from 'classnames'
import { motion } from 'framer-motion'
import { ThemeContext } from '../../app/contexts'
import { defaultPageVariants } from '../../app/variants'
import styles from './NotFoundPG.module.scss'


const NotFoundPG = () => {
  const location = window.location.href
  const { theme } = React.useContext(ThemeContext)

  return (
    <motion.div
      variants={defaultPageVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className={styles.wrapper}
    >
      <p className={styles.title}>404</p>
      <p className={cn(styles.text, styles[theme])}>
        Страница <span>{location}</span> не найдена
      </p>
    </motion.div>
  )
}

export default NotFoundPG
