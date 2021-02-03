import React from 'react'
import cn from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'

import { setCloseError, setCloseSuccess } from './../alertSlice'
import { RootStoreType } from '../../../app/rootReducer'

import { alertVariant } from '../alertVariants'
import styles from './Alert.module.scss'


const Alert: React.FC = () => {
  const dispatch = useDispatch()
  const { error, success } = useSelector((state: RootStoreType) => state.alert)

  const handleClose = () => {
    error && dispatch(setCloseError())
    success && dispatch(setCloseSuccess())
  }

  if (!error && !success) return null

  return (
      <motion.div
        variants={alertVariant}
        className={styles.wrapper}
        initial="hidden"
        animate="visible"
      >
        <div className={cn(styles.container, {
          [styles.error]: error,
          [styles.success]: success,
        })}>
          {error && error}
          {success && success}
          <button
            type="button"
            onClick={handleClose}
            className={styles.closeBtn}>&times;</button>
        </div>
      </motion.div>
  )
}

export default Alert
