import React from 'react'
import { motion } from 'framer-motion'

import { defaultPageVariants } from '../../../app/variants'
import styles from './ShowcasePG.module.scss'

const ShowcasePG = () => {
  return (
    <motion.div
      variants={defaultPageVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className={styles.wrapper}
    >
      ShowcasePG
    </motion.div>
  )
}

export default ShowcasePG
