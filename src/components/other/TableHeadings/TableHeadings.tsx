import React from 'react'
import cn from 'classnames'
import { ThemeContext } from '../../../app/contexts'
import { tableHeadingsType } from '../../../featurers/commonTypes'
import styles from './TableHeadings.module.scss'

interface P {
  data: tableHeadingsType[]
}

const TableHeadings:React.FC<P> = ({data}) => {
  const {theme} = React.useContext(ThemeContext)

  return (
    <div className={cn(styles.wrapper, styles[theme])}>
      <div className="table__container major">
        {data.map(item => (
          <span
            key={item.title}
            className={styles.item}
            style={{ width: `${item.width}%` }}
          >
            {item.title}
          </span>
        ))}
      </div>
    </div>
  )
}

export default TableHeadings
