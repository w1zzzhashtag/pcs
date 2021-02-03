import React from 'react'
import {motion} from 'framer-motion'
import { modalVariant } from './ModalVariants'
import styles from './Modal.module.scss'


interface P {
  children: React.ReactNode
  handleOpen: (val: boolean) => void
}

const Modal:React.FC<P> = ({ children, handleOpen }) => {
  
  const handleKeyDown = React.useCallback((e: any): void => {
    e.code === 'Escape' && handleOpen(false)
  }, [handleOpen])

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={modalVariant}
      className={styles.wrapper}
    >
      <button 
        type="button" 
        className={styles.closeBtn}
        onClick={() => handleOpen(false)}
      >&times;</button>

      {children}
    </motion.div>
  )
}

export default Modal
