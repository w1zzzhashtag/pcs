import React from 'react'
import { motion } from 'framer-motion'

import { pathVariants, textVariants } from './../SearchPGVariants'
import styles from './../SearchPG.module.scss'

const NoResult = () => {
  return (
    <div className={styles.noResults}>
      <motion.h6
        className={styles.noResults__text}
        variants={textVariants}
        initial="hidden"
        animate="visible"
      >
        По вашему запросу ничего не найдено :(
      </motion.h6>

      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 80 80"
        className={styles.noResults__item}
      >
        <motion.path
          d="M6.998,77.5c-1.202,0-2.331-0.468-3.181-1.317c-1.753-1.753-1.753-4.607,0-6.36l36.828-35.11 l4.656,4.661L10.17,76.191C9.329,77.032,8.199,77.5,6.998,77.5z"
          variants={pathVariants}
          initial="hidden"
          animate="visibleGray"
        />
        <motion.path
          variants={pathVariants}
          initial="hidden"
          animate="visibleBlue"
          d="M52,53.5c-14.061,0-25.5-11.439-25.5-25.5S37.939,2.5,52,2.5S77.5,13.939,77.5,28 S66.061,53.5,52,53.5z"
        />
      </motion.svg>
    </div>
  )
}

export default NoResult
