import React from 'react'
import cn from 'classnames'
import { ThemeContext } from '../../../app/contexts'

import { tableFiltersType } from '../../../featurers/commonTypes'
import styles from './TableFilters.module.scss'

interface P {
  filters: tableFiltersType[]
  active: string
  handleChange: (value: string) => void
}

const TableFilters:React.FC<P> = ({ filters, active, handleChange }) => {
  const { theme } = React.useContext(ThemeContext)

  return (
    <div className={cn(styles.wrapper, styles[theme])}>
      {filters.map(item => (
        <button 
          key={item.value}
          onClick={() => handleChange(item.value)}
          className={cn(styles.item, {
            [styles.active]: active === item.value
          })}
        >{item.name}</button>
      ))}
    </div>
  )
}

export default TableFilters
