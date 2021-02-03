import React from 'react'
import cn from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'

import { ThemeContext } from '../../../app/contexts'
import { manufacturersSortByType } from './../manufacturerTypes'

import { manufacturersSortByList } from '../manufacturersVariants'
import styles from './ManufacturerSortBy.module.scss'

interface iProps {
  items: manufacturersSortByType[]
  active: null | manufacturersSortByType
  open: boolean
  handleActive: (item: manufacturersSortByType) => void
  handleOpen: () => void
}

const ManufacturerSortBy: React.FC<iProps> = ({ items, active, handleActive, open, handleOpen }) => {
  const { theme } = React.useContext(ThemeContext)
  
  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <p
          className={cn(styles.activeItem, styles[theme])}
          onClick={handleOpen}
        >
          {active ? active.name : 'Сортировка'}
        </p>
        <AnimatePresence>
          {open && (
            <motion.div
              className={styles.list}
              variants={manufacturersSortByList}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {items.map(item => (
                <p key={item.id}
                  className={styles.list__item}
                  onClick={() => handleActive(item)}
                >{item.name}</p>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default ManufacturerSortBy
