import React from 'react'
import { motion } from 'framer-motion'

import { defaultPageVariants } from '../../../app/variants'
import styles from './SomethingBroke.module.scss'

interface P {
  message: string
}

const SomethingBroke:React.FC<P> = ({ message }) => {
  return (
    <motion.div 
      className={styles.wrapper}
      variants={defaultPageVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <h3 className={styles.title}>Не удалось загрузить данные!</h3>
      <span className={styles.error}>{message}</span>
      <p className={styles.text}>
        Пожалуйста, свяжитесь с владельцем сайта и сообщите о  текущей проблеме. Связаться можно по почте example@gmail.com
      </p>
    </motion.div>
  )
}

export default SomethingBroke
