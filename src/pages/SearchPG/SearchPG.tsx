import React from 'react'
import cn from 'classnames'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'

import { ThemeContext } from '../../app/contexts'
import { RootStoreType } from './../../app/rootReducer'
import { handleOpenModal, fetchSearchGlobalData } from '../../featurers/searchGlobal/searchGlobalSlice'

import NoResult from './children/NoResult'
import { ManufacturerListItem } from '../../featurers/manufacturer/children'
import { CatalogGroupProductsListItem } from '../../featurers/catalogGroupProducts/children'

import { defaultPageVariants } from '../../app/variants'
import styles from './SearchPG.module.scss'
import { Button, LoaderListItem } from '../../components'

interface iParams {
  query: string | undefined
}

const SearchPG = () => {
  const dispatch = useDispatch()
  const { query }: iParams = useParams()
  const { theme } = React.useContext(ThemeContext)

  const { data, isLoaded, error } = useSelector((state: RootStoreType) => state.searchGlobal)

  const [value, setValue] = React.useState<string>('')
  const [isEmptyValue, setIsEmptyValue] = React.useState<boolean>(true)
  const [productsLength, setProductsLength] = React.useState<number>(0)
  const [organizationsLength, setOrganizationsLength] = React.useState<number>(0)
  const [isFetching, setIsFetching] = React.useState<boolean>(false)

  // - Закрываем модалное окно 
  // - Если есть параметр в url, тогда отправлеям запрос на сервер с этими параметрами
  React.useEffect(() => {
    dispatch(handleOpenModal(false))
    query && dispatch(fetchSearchGlobalData(query))
  }, [dispatch, query])

  // - Если произошли изменения в data, меняем состояние длины этих данных
  React.useEffect(() => {
    setProductsLength(data.globalSearchProductsDTO.length)
    setOrganizationsLength(data.globalSearchOrganizationsDTO.length)
  }, [data])

  // - В зависимости пустое ли значение в input, будем менять состояние, которое следит пустое или нет 
  React.useEffect(() => {
    if (value.trim() === '') {
      setIsEmptyValue(true)
    } else setIsEmptyValue(false)
  }, [value])

  React.useEffect(() => {
    if (isLoaded) {
      setIsFetching(false)
    }
  }, [isLoaded])


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setValue(value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isEmptyValue) {
      dispatch(fetchSearchGlobalData(value))
      setIsFetching(true)
      setValue('')
    }
  }

  const handleClearValue = () => setValue('')

  return (
    <motion.div
      variants={defaultPageVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="main__page"
    >

      <form className={cn(styles.form, styles[theme])} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Введите название товара или ОКПД2"
          value={value}
          autoFocus
          onChange={handleChange}
          className={styles.form__input}
        />
        {!isEmptyValue && <button
          type="button"
          className={styles.button__clear}
          onClick={handleClearValue}
        >&times;</button>}

        <div className={styles.button__wrapper}>
          <Button
            type='submit'
            className='white'
            disabled={isEmptyValue}
          >
            Поиск
        </Button>
        </div>
      </form>

      {isLoaded && !error && (productsLength !== 0 || organizationsLength !== 0) && (
        <div className={styles.content}>
          {productsLength !== 0 && (
            <div className={styles.block}>
              <p className={styles.block__title}>Найденные продукты</p>
              {data.globalSearchProductsDTO.map(item => (
                <CatalogGroupProductsListItem
                  data={item} key={item.id} />
              ))}
            </div>
          )}
          {organizationsLength !== 0 && (
            <div className={styles.block}>
              <p className={styles.block__title}>Найденные организации</p>
              {data.globalSearchOrganizationsDTO.map(item => (
                <ManufacturerListItem
                  data={item} key={item.id} />
              ))}
            </div>
          )}
        </div>
      )}
      {!isLoaded && isFetching && !error && Array(10).fill(0).map((_, i) => <LoaderListItem key={i} />)}
      {((isLoaded && productsLength === 0 && organizationsLength === 0) || error) && (
        <NoResult />
      )}
    </motion.div>
  )
}

export default SearchPG
