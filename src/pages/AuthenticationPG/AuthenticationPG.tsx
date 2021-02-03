import React from 'react'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, Link, Redirect } from 'react-router-dom'

import { RootStoreType } from '../../app/rootReducer'
import { Button, TextField } from '../../components'
import { identificationUser } from '../../featurers/authentication/authenticationSlice'
import { authFormValuesType } from '../../featurers/authentication/authenticationTypes'

import { defaultPageVariants } from '../../app/variants'
import styles from './AuthenticationPG.module.scss'
import { setError, setTimeoutToCloseAlert } from '../../featurers/alert/alertSlice'


const AuthenticationPG: React.FC = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const { access_token } = useSelector((state: RootStoreType) => state.authentication)
  const [values, setValues] = React.useState<authFormValuesType>({
    username: '',
    password: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setValues(prev => ({ ...prev, [name]: value }))
  }

  const handleHistory = () => history.goBack()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!values.username.trim() && !values.password.trim()) {
      dispatch(setError(`Введите логин и пароль`))
      dispatch(setTimeoutToCloseAlert('error'))
      return
    } else if (!values.username.trim()) {
      dispatch(setError(`Введите логин`))
      dispatch(setTimeoutToCloseAlert('error'))
      return
    } else if (!values.password.trim()) {
      dispatch(setError(`Введите пароль`))
      dispatch(setTimeoutToCloseAlert('error'))
      return
    }
    dispatch(identificationUser(values))
  }


  return (
    <motion.div
      variants={defaultPageVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className={styles.wrapper}
    >
      {access_token && (
        <Redirect to="person" />
      )}

      <h6 className={styles.title}>
        Вход
        <button
          onClick={handleHistory}
          className={styles.title__close}
        >&times;</button>
      </h6>

      <div className={styles.inner}>
        <form className="form" onSubmit={handleSubmit}>
          <div className={styles.indentTop}></div>
          <TextField
            name="username"
            label="Логин"
            value={values.username}
            onChange={handleChange} />
          <TextField
            type="password"
            name="password"
            label="Пароль"
            value={values.password}
            onChange={handleChange} />

          <div className={styles.button__container}>
            <Button
              type='submit'
              className='green'
              width='w100'
              uppercase
            >Войти</Button>

            <div className={styles.el}>Войти с помощью ЭП</div>

            <Link
              className={styles.button__wrapper}
              to='/registration'>
              <Button
                type='button'
                className='orange'
                width='w100'
                uppercase
              >Регистрация</Button>
            </Link>
          </div>
        </form>
      </div>
    </motion.div>
  )
}

export default AuthenticationPG
