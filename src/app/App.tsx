import React from 'react';
import Cookies from 'js-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { YMaps } from 'react-yandex-maps'

import { ThemeContext } from './contexts'
import { RootStoreType } from './rootReducer'
import { setRegion } from '../featurers/region/regionSlice'
import { fetchCatalogListData } from '../featurers/catalogList/catalogListSlice';
import { handleOpenModal } from '../featurers/searchGlobal/searchGlobalSlice';
import { setToken, setUserName } from '../featurers/authentication/authenticationSlice';

import Routes from './Routes';
import Alert from '../featurers/alert/children/Alert'
import { Header, HeaderPerson, Modal } from '../components'
import { SearchGlobalModal } from './../featurers/searchGlobal/children'

// TODO: 
// [] Доавить прлоадеры на загрузке картинок и выборе окпд в л/к
// [] Поработать с типами(некоторые повторяются)
// [] Попробывать создать instance axios
// [] Проверить ссылки на запросы ( чтобы нигде не было develop)
// [] Поиск продуктов во внешнем доступе доделать
// [] !Не забыть поправить отправленные данные формы при отправке put-ом на странице catalogProductPG
// [] Стилизовать всплывающеее окно при удалении товара в "Справочнике продукции"
// [] LoaderTable подровнять размеры
// [] Придумать что-то со стилями в компоненте InforamtionSection
// [] ?Переписать все формы на react-hook-form(если это возможно)
// [] Добавить кнопку "отмены" на странице Регистрации 
// [] Отрефакторить стили
// [] Привести к общему стилю порядок import-ов
// [] В reducer-ах подумать как сделать нормальную валидацию


const App: React.FC = () => {
  const dispatch = useDispatch()

  const routeMatchPerson = useRouteMatch({ path: "/person", exact: false })
  const activeRegion = useSelector((state: RootStoreType) => state.region.active)

  React.useEffect(() => {
    document.title = 'Витрина производителей - ' + activeRegion?.features.logoName
  })

  React.useEffect(() => {
    dispatch(setRegion(window.location.hostname))
    dispatch(fetchCatalogListData())
  }, [dispatch])


  // Управление глобальным поиском
  const globalSearchIsOpen = useSelector((state: RootStoreType) => state.searchGlobal.modalIsOpen)

  const closeGlobalSearchModal = () => dispatch(handleOpenModal(false))

  const handleOpenGlobalSearchModal = (e: any): void => {
    if ((e.ctrlKey || e.metaKey) && e.code === 'KeyK') {
      e.preventDefault()
      dispatch(handleOpenModal(!globalSearchIsOpen))
    } else if (e.code === 'Enter' && globalSearchIsOpen) {
      e.preventDefault()
    }
  }

  React.useEffect(() => {
    document.addEventListener('keydown', handleOpenGlobalSearchModal)
    return () => document.removeEventListener('keydown', handleOpenGlobalSearchModal)
  }, [globalSearchIsOpen, handleOpenGlobalSearchModal])


  // Управление темой
  let themeLocSt = localStorage.getItem('theme')
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light')

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light')

  React.useEffect(() => localStorage.setItem('theme', theme), [theme])
  React.useEffect(() => {
    themeLocSt && setTheme(themeLocSt as 'light' | 'dark')
  }, [])


  // Управление токеном в куках
  const tokenCookie = Cookies.get('token')
  const userNameCookie = Cookies.get('userName')


  React.useEffect(() => {
    tokenCookie && dispatch(setToken(tokenCookie))
  }, [dispatch, tokenCookie])
  React.useEffect(() => {
    userNameCookie && dispatch(setUserName(userNameCookie))
  }, [dispatch, userNameCookie])

  return (
    <YMaps query={{
      ns: "use-load-option",
      apikey: "35e24bc9-7bd7-4f09-962a-4b5e87f754c3",
      load: "package.full"
    }}>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        {activeRegion && (
          <div className={`app app-${theme}`}>

            {routeMatchPerson ?
              <HeaderPerson /> :
              <Header activeRegion={activeRegion} />
            }

            <Alert />

            <AnimatePresence>
              {globalSearchIsOpen && (
                <Modal handleOpen={closeGlobalSearchModal}>
                  <SearchGlobalModal />
                </Modal>
              )}
            </AnimatePresence>

            <main className={`main ${theme}`}>
              <div className="container">
                <Routes />
              </div>
            </main>
          </div>
        )}
      </ThemeContext.Provider>
    </YMaps>
  );
}

export default App;
