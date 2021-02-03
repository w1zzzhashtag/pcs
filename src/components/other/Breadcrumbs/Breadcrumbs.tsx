import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Breadcrumbs.module.scss'

interface iNestingLvl {
  text: string,
  link: string
}
interface iProps {
  nestingLvl1?: iNestingLvl
  nestingLvl2?: iNestingLvl
  nestingLvl3?: iNestingLvl
  count?: number
}

const Breadcrumbs: React.FC<iProps> = (
  { nestingLvl1, nestingLvl2, nestingLvl3, count }
) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.list}>
        {nestingLvl1 && (
          <NavLink exact
            to={`${nestingLvl1.link}`}
            className={styles.list__item}
            activeClassName={styles.list__item_active}
            title={nestingLvl1.text}
          >
            {nestingLvl1.text.length > 30
              ? nestingLvl1.text.substr(0, 30) + '...'
              : nestingLvl1.text}
          </NavLink>
        )}
        {nestingLvl2 && (
          <NavLink exact
            to={`${nestingLvl2.link}`}
            className={styles.list__item}
            activeClassName={styles.list__item_active}
            title={nestingLvl2.text}
          >
            \ {nestingLvl2.text.length > 30
              ? nestingLvl2.text.substr(0, 30) + '...'
              : nestingLvl2.text}
          </NavLink>
        )}
        {nestingLvl3 && (
          <NavLink exact
            to={`${nestingLvl3.link}`}
            className={styles.list__item}
            activeClassName={styles.list__item_active}
            title={nestingLvl3.text}
          >
            \ {nestingLvl3.text.length > 30
              ? nestingLvl3.text.substr(0, 30) + '...'
              : nestingLvl3.text}
          </NavLink>
        )}
      </div>

      {count !== undefined && (
        <span className={styles.count}>
          Количество: {count}
        </span>
      )}

    </div>
  )
}

export default Breadcrumbs
