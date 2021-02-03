import React from 'react'
import cn from 'classnames'
import { useSelector, useDispatch } from 'react-redux'
import { motion } from 'framer-motion'

import Logo from '../../Logo/Logo'

import { ThemeContext } from '../../../../app/contexts'
import { RootStoreType } from '../../../../app/rootReducer'
import { deleteToken, deleteUserName } from '../../../../featurers/authentication/authenticationSlice'

import { headerTopVariants } from '../../Header/HeaderVariants'
import styles from './../HeaderPerson.module.scss'
import avatarImg from './../../../../assets/images/person/user-avatar.png'
import ThemeToggler from '../../ThemeToggler/ThemeToggler'
import { Button } from '../../..'



const HeaderPersonTop = () => {
  const dispatch = useDispatch()
  const { theme } = React.useContext(ThemeContext)
  const activeRegion = useSelector((state: RootStoreType) => state.region.active)
  const {userName} = useSelector((state: RootStoreType) => state.authentication)

  const handleExit = () => {
    dispatch(deleteToken())
    dispatch(deleteUserName())
  }

  const getUserName = () => {
    if(!userName) return ''
    let fio = userName.split(' ') 

    if(fio.length >= 2) return fio[1][0] + '. ' + fio[0] 
    return fio
  }
  
  return (
    <motion.div
      className={cn(styles.top, styles[theme])}
      variants={headerTopVariants}
      initial="hidden"
      animate="visible"
    >
      <div className={styles.container}>
        {activeRegion && (
          <Logo
            activeRegion={activeRegion}
            url='/person' />
        )}

        <div className={styles.top__content}>
          <span 
            className={styles.top__content__name}
            title={userName ? userName : ''}
          >{getUserName()}</span>
          <img
            className={styles.top__content__avatar}
            src={avatarImg}
            alt="avatar" />

          <div className={styles.button__wrapper}>
            <Button
              type='button'
              className='orange'
              uppercase rounded bold
              handleClick={handleExit}
            >Выйти</Button>
          </div>
          <ThemeToggler />
        </div>
      </div>
    </motion.div>
  )
}

export default HeaderPersonTop
