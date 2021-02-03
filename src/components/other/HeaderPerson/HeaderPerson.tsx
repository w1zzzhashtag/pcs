import React from 'react'
import cn from 'classnames'
import { ThemeContext } from '../../../app/contexts'
import { HeaderPersonTop, HeaderPersonBottom } from './children'
import styles from './HeaderPerson.module.scss'


const HeaderPerson = () => {
  const { theme } = React.useContext(ThemeContext)
  return (
    <div className={cn(styles.wrapper, styles[theme])}>
      <HeaderPersonTop />
      <HeaderPersonBottom />
    </div>
  )
}

export default HeaderPerson
