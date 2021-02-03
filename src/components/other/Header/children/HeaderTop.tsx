import React from 'react'
import cn from 'classnames'
import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { ThemeContext } from '../../../../app/contexts'
import { Button, Logo, ThemeToggler } from './../../../index'
import { regionItemType } from './../../../../featurers/region/regionTypes'
import { headerTopVariants } from './../HeaderVariants'

import { RootStoreType } from '../../../../app/rootReducer'

import styles from './../Header.module.scss'

interface P {
  activeRegion: regionItemType
}

const HeaderTop: React.FC<P> = ({ activeRegion }) => {
  const { theme } = React.useContext(ThemeContext)
  const { access_token } = useSelector((state: RootStoreType) => state.authentication)

  return (
    <motion.div
      className={cn(styles.top, styles[theme])}
      variants={headerTopVariants}
      initial="hidden"
      animate="visible"
    >
      <div className={styles.container}>
        <Logo url='/'
          activeRegion={activeRegion} />

        <div className={styles.top__inner}>
          <nav className={styles.top__nav}>
            <NavLink to="/fsin"
              className={styles.top__nav__link}
              activeClassName={styles.top__nav__link_active}
            >
              Каталог продукции УФСИН
            </NavLink>

            {activeRegion.madeInKarelia && (
              <NavLink to="/made-in-karelia"
                className={styles.top__nav__link}
                activeClassName={styles.top__nav__link_active}
              >
                Сделано в Карелии
              </NavLink>
            )}

            <NavLink to="/news"
              className={styles.top__nav__link}
              activeClassName={styles.top__nav__link_active}
            >
              Новости
            </NavLink>
          </nav>

          <NavLink className={styles.button__wrapper}
            to={access_token ? "/person" : "/authentication"}
          >
            <Button
              type='button'
              className='orange'
              uppercase rounded bold
            >
              {access_token ? "Личный кабинет" : "Войти"}
            </Button>
          </NavLink>

          <ThemeToggler />
        </div>
      </div>
    </motion.div>
  )
}

export default HeaderTop
