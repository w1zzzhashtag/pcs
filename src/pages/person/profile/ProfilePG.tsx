import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { motion } from 'framer-motion';

import { RootStoreType } from '../../../app/rootReducer';
import { fetchPersonProfileData, sendPersonProfileData } from '../../../featurers/person/profile/profileSlice';
import { profileDataType } from '../../../featurers/person/profile/profileTypes';

import {
  Button,
  CheckboxField,
  TextField,
  OptionsForSelectRegion,
  SelectField,
  LoaderPersonProfile,
  SomethingBroke,
  TextareaField
} from '../../../components';

import { defaultPageVariants } from '../../../app/variants';
import styles from './ProfilePG.module.scss'


const ProfilePG = () => {
  const dispatch = useDispatch()

  const { access_token } = useSelector((state: RootStoreType) => state.authentication)
  const { data, isLoaded, errorStack } = useSelector((state: RootStoreType) => state.personProfile)
  const [dataValues, setDataValues] = React.useState<profileDataType | null>(null)

  React.useEffect(() => {
    dispatch(fetchPersonProfileData())
  }, [dispatch])

  React.useEffect(() => {
    setDataValues(data)
  }, [data])


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    if (name === 'region') {
      dataValues && setDataValues({ ...dataValues, [name]: Number(value) })
      return
    }
    dataValues && setDataValues({ ...dataValues, [name]: value })
  }

  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    dataValues && setDataValues({ ...dataValues, [name]: checked })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    dataValues && dispatch(sendPersonProfileData(dataValues.id, dataValues))
  }
  
  if (!access_token) {
    return <Redirect to='/authentication' />
  }

  return (
    <motion.form
      className={styles.wrapper}
      onSubmit={handleSubmit}
      variants={defaultPageVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >

      {!errorStack ? (
        (isLoaded && dataValues) ? (
          <div className={styles.container}>

            <div className={styles.block}>
              <h6 className={styles.title}>Основные сведения об организации</h6>
              <div className={styles.content}>
                <TextField
                  name="fullName"
                  label="Наименование"
                  value={dataValues.fullName}
                  onChange={handleChange} />

                <TextField
                  name="fullName"
                  label="Краткое наименование"
                  value={dataValues.shortName}
                  onChange={handleChange} />

                <TextField
                  name="inn"
                  label="ИНН"
                  className="w30"
                  value={dataValues.inn}
                  onChange={handleChange} />

                <TextField
                  name="kpp"
                  label="КПП"
                  className="w30"
                  value={dataValues.kpp}
                  onChange={handleChange} />

                <TextField
                  name="ogrn"
                  label="ОГРН"
                  className="w30"
                  value={dataValues.ogrn}
                  onChange={handleChange} />

                <TextareaField 
                  name="description"
                  label="Выпускаемая продукция"
                  value={dataValues.description ? dataValues.description : ''}
                  onChange={handleChange} />  

                <div className={styles.checkbox__wrapper}>
                  <CheckboxField
                    onChange={handleChecked}
                    name="isSmp"
                    className="w30"
                    checked={dataValues.isSmp}
                    label="СМП" />

                  <CheckboxField
                    onChange={handleChecked}
                    name="isFsin"
                    className="w30"
                    checked={dataValues.isFsin}
                    label="ФСИН" />
                </div>
              </div>
            </div>

            <div className={styles.block}>
              <h6 className={styles.title}>Контактная информация</h6>
              <div className={styles.content}>
                <TextField
                  name="address"
                  label="Адрес местонахождения"
                  className="w65"
                  value={dataValues.address}
                  onChange={handleChange} />
                <SelectField
                  name="region"
                  label="Регион"
                  className="w30"
                  value={String(dataValues.region)}
                  onChange={handleChange}
                >
                  <OptionsForSelectRegion />
                </SelectField>
              </div>
            </div>

            <div className={styles.block}>
              <h6 className={styles.title}>Пользователи организации</h6>
              <div className={styles.content}>
                <TextField
                  name="fio"
                  label="Ф.И.О"
                  className="w65"
                  value={dataValues.fio}
                  onChange={handleChange} />

                <CheckboxField
                  onChange={handleChecked}
                  name="isContact"
                  className="w30"
                  checked={dataValues.isContact}
                  label="Контактное лицо" />

                <TextField
                  name="position"
                  label="Должность"
                  className="w48"
                  value={dataValues.position}
                  onChange={handleChange} />

                <TextField
                  name="personalPhone"
                  label="Телефон"
                  className="w48"
                  value={dataValues.personalPhone}
                  onChange={handleChange} />

                <TextField
                  name="personalEmail"
                  label="E-mail"
                  className="w48"
                  value={dataValues.personalEmail}
                  onChange={handleChange} />

                <TextField
                  name="website"
                  label="Сайт"
                  className="w48"
                  value={dataValues.website}
                  onChange={handleChange} />

                <TextField
                  name="login"
                  label="Логин"
                  className="w48"
                  value={dataValues.login}
                  onChange={handleChange} />

                <TextField
                  name="password"
                  label="Пароль"
                  className="w48"
                  type="password"
                  value={dataValues.password}
                  onChange={handleChange} />
              </div>
            </div>

            <div className={styles.button__container}>
              <Button
                type='submit'
                className='orange'
                uppercase
              >Сохранить</Button>
            </div>
          </div>
        ) : <LoaderPersonProfile />
      ) : <SomethingBroke message={errorStack} />}

    </motion.form>
  )
}

export default ProfilePG
