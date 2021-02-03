import React from 'react'
import axios from 'axios'
import cn from 'classnames'
import { Link, Redirect } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'

import { ThemeContext } from '../../../app/contexts'
import { RootStoreType } from '../../../app/rootReducer'

import { defaultPageVariants } from '../../../app/variants'
import styles from './MainPG.module.scss'
import profileImg from './../../../assets/images/person/main/profile.png'
import catalogImg from './../../../assets/images/person/main/catalog.png'
import bidsImg from './../../../assets/images/person/main/bids.png'
import showcaseImg from './../../../assets/images/person/main/showcase.png'
import legalSupportImg from './../../../assets/images/person/main/legal-support.png'
import technicalSupportImg from './../../../assets/images/person/main/technical-support.png'

const DATA_ROUTES = [
  { id: 'profile', title: 'Профиль организации', path: '/person/profile', imgSrc: profileImg },
  { id: 'catalog', title: 'Справочник продукции', path: '/person/catalog', imgSrc: catalogImg },
  { id: 'bids', title: 'Заявки', path: '/person/bids', imgSrc: bidsImg },
  { id: 'showcase', title: 'Витрина госзакупок', path: '/person/showcase', imgSrc: showcaseImg },
  { id: 'legalSupport', title: 'Юридичская поддержка', path: '/person/legal-support', imgSrc: legalSupportImg },
  { id: 'technicalSupport', title: 'Техническая поддержка', path: '/person/technical-support', imgSrc: technicalSupportImg },
]

const MainPG = () => {
  const { theme } = React.useContext(ThemeContext)
  const { access_token } = useSelector((state: RootStoreType) => state.authentication)

  if (!access_token) {    
    return <Redirect to='/authentication' />
  }
  
  return (
    <motion.div
      className={cn(styles.wrapper, styles[theme])}
      variants={defaultPageVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <div className={styles.nav}>
        {DATA_ROUTES.map(item => (
          <Link to={item.path}
            key={item.id}
            className={cn(styles.nav__item, styles[item.id])}
          >
            <img src={item.imgSrc}
              alt={item.title}
              className={styles.nav__item__img} />
            <span className={styles.nav__item__title}>
              {item.title}
            </span>
          </Link>
        ))}
      </div>
    </motion.div>
  )
}

export default MainPG
