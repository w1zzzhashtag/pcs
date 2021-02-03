import React from 'react'
import { motion } from 'framer-motion'

import { defaultPageVariants } from '../../../app/variants'
import styles from './OffersPG.module.scss'


const OffersPG = () => {
  return (
    <motion.div
      variants={defaultPageVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className={styles.wrapper}
    >
      offers
    </motion.div>
  )
}

export default OffersPG
