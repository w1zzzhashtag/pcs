import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { debounce } from 'lodash'

import { RootStoreType } from '../../../../app/rootReducer'

import { Footer, Results, Search, StartScreen } from './children'
import { fetchSearchGlobalData, setClearData, setError } from '../../searchGlobalSlice'

import styles from './SearchGlobalModal.module.scss'


const SearchGlobalModal = () => {
  const dispatch = useDispatch()

  const searchRef = React.useRef<HTMLInputElement>(null)

  const { data } = useSelector((state: RootStoreType) => state.searchGlobal)
  const { isLoaded } = useSelector((state: RootStoreType) => state.searchGlobal)
  const { error } = useSelector((state: RootStoreType) => state.searchGlobal)
  const { savedQueries } = useSelector((state: RootStoreType) => state.searchGlobal)


  const [productsLength, setProductsLength] = React.useState<number>(0)
  const [organizationsLength, setOrganizationsLength] = React.useState<number>(0)
  React.useEffect(() => {
    setProductsLength(data.globalSearchProductsDTO.length)
    setOrganizationsLength(data.globalSearchOrganizationsDTO.length)
  }, [data])

  const [savedProductsLength, setSavedProductsLength] = React.useState<number>(0)
  const [savedOrganizationsLength, setSavedOrganizationsLength] = React.useState<number>(0)
  React.useEffect(() => {
    setSavedProductsLength(savedQueries.globalSearchProductsDTO.length)
    setSavedOrganizationsLength(savedQueries.globalSearchOrganizationsDTO.length)
  }, [savedQueries])


  const dispatchSearchGlobalData = (e: any) => {
    if (searchRef && searchRef.current) {
      if (searchRef.current.value.trim() !== '') {
        dispatch(fetchSearchGlobalData(searchRef.current.value.trim()))
      } else {
        dispatch(setClearData())
        dispatch(setError(null))
      }
    }
  }
  const handleChange = debounce(dispatchSearchGlobalData, 500)

  return (
    <div className={styles.wrapper}>

      <Search
        ref={searchRef}
        handleChange={handleChange} />

      <div className={styles.dropdown}>
        <div className={styles.dropdown__container}>

          {/* СТАРТОВЫЙ СКРИН*/}
          {/* Показвыается если нету данных и ошибок */}
          {productsLength === 0 && organizationsLength === 0 && !error && (
            <StartScreen
              productsLength={savedProductsLength}
              organizationsLength={savedOrganizationsLength}
              products={savedQueries.globalSearchProductsDTO}
              organizations={savedQueries.globalSearchOrganizationsDTO} />
          )}

          {/* РЕЗУЛЬТАТЫ */}
          {/* Показываеются если данные загружены, нет ошибок и если массив данных у продуктов или организаций не пустой */}
          {isLoaded && !error && (productsLength !== 0 || organizationsLength !== 0) && (
            <Results
              productsLength={productsLength}
              organizationsLength={organizationsLength}
              products={data.globalSearchProductsDTO}
              organizations={data.globalSearchOrganizationsDTO}
              searchValue={searchRef.current?.value} />
          )}

          {/* ОШИБКИ */}
          {/* Если есть ошибка */}
          {error && (
            <div className={styles.dropdown__error}>{error}</div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default SearchGlobalModal
