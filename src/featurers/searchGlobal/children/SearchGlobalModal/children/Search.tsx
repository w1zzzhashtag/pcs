import React from 'react'
import { useSelector } from 'react-redux'
import { DebouncedFunc } from 'lodash'

import { RootStoreType } from '../../../../../app/rootReducer'

import styles from './Search.module.scss'
import searchIconGreen from './../../../../../assets/images/search-icon-green.png'

interface P {
  handleChange: DebouncedFunc<(e: any) => void>
  ref: React.RefObject<HTMLInputElement>
}

const Search = React.forwardRef<HTMLInputElement, P>((props, ref) => {
  const formRef = React.useRef<HTMLFormElement>(null)
  const { modalIsOpen } = useSelector((state: RootStoreType) => state.searchGlobal)
  const resetForm = () => formRef.current?.reset()

  return (
    <form className={styles.wrapper} ref={formRef}>
      <img
        className={styles.icon}
        src={searchIconGreen}
        alt="search-icon" />
      <input
        type="text"
        placeholder="Введите название товара или ОКПД2"
        ref={ref}
        autoFocus={modalIsOpen}
        onChange={props.handleChange}
        className="modal-container__search" />
      <button
        type="button"
        className={styles.clearBtn}
        onClick={resetForm}
      >&times;</button>
    </form>
  )
})

export default Search
