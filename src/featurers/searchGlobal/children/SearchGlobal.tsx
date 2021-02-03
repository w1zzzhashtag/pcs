import React from 'react'
import { useDispatch } from 'react-redux'

import { handleOpenModal } from '../searchGlobalSlice'

import styles from './SearchGlobal.module.scss'
import searchIcon from './../../../assets/images/search-icon-white.png'


const SearchGlobal = () => {
  const dispatch = useDispatch()
  const openModal = () => dispatch(handleOpenModal(true))

  return (
    <div className={styles.wrapper}>
      <button className={styles.button} onClick={openModal}>
        <img
          className={styles.button__icon}
          src={searchIcon}
          alt="searchIcon" />
        <span className={styles.button__placeholder}>
          Поиск
                </span>
        <div className={styles.button__keyboardShortcut}>
          <span className={styles.button__keyboardShortcut__item}>ctrl</span>
          <span className={styles.button__keyboardShortcut__item}>k</span>
        </div>
      </button>
    </div>
  )
}

export default SearchGlobal
