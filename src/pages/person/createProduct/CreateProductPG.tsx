import React from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { motion } from 'framer-motion'

import { Basic, Characts, More } from '../../../featurers/person/catalogProduct/children'
import { Breadcrumbs, Button } from '../../../components'
import { setError, setSuccess, setTimeoutToCloseAlert } from '../../../featurers/alert/alertSlice'
import { validateForm } from '../../../featurers/person/catalogProduct/validateForm'

import { RootStoreType } from '../../../app/rootReducer';
import { charactsValuesType, dataType, imagesType } from '../../../featurers/person/catalogProduct/catalogProductTypes'

import { defaultPageVariants } from '../../../app/variants'
import styles from './CreateProductPG.module.scss'


const initialState: dataType = {
  name: '',
  okeiName: '',
  price: 0,
  ktruInfo: '',
  imageDTO: [],
  catalogName: '',
  okpdCode: '',
  specificationDTO: [],
}


const CreateProductPG = () => {
  const dispatch = useDispatch()
  const { access_token } = useSelector((state: RootStoreType) => state.authentication)
  const activeRegion = useSelector((state: RootStoreType) => state.region.active)



  const [values, setValues] = React.useState(initialState)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (name === 'price') {
      setValues(prev => ({ ...prev, [name]: Number(value) }))
      return
    }
    setValues(prev => ({ ...prev, [name]: value }))
  }
  const handleChangeImages = (image: imagesType) => {
    setValues(prev => ({
      ...prev,
      imageDTO: [...prev.imageDTO, image]
    }))
  }
  const handleRemoveImage = (id: number) => {
    setValues(prev => ({
      ...prev,
      imageDTO: prev.imageDTO.filter(image => image.id !== id)
    }))
  }
  const handleChangeCatalogName = (val: string) => {
    setValues(prev => ({ ...prev, catalogName: val }))
  }
  const handleChangeOkpdCode = (val: string) => {
    setValues(prev => ({ ...prev, okpdCode: val }))
  }
  const handleAddCharacts = (data: charactsValuesType) => {
    setValues(prev => ({
      ...prev,
      specificationDTO: [...prev.specificationDTO, {
        ...data,
        id: prev.specificationDTO.length + 1
      }]
    }))
  }
  const handleDeleteCharacts = (id: number) => {
    setValues(prev => ({
      ...values,
      specificationDTO: prev.specificationDTO.map(item => {
        if (item.id !== id) {
          return { ...item, status: 'D' }
        } return item
      })
    }))
  }


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const url = activeRegion?.features.queryLink + '/vendorproduct'
    if (validateForm(values as dataType)) {
      axios.post(url, values, { headers: { Authorization: access_token } })
        .then((res) => {
          dispatch(setSuccess('Товар был успешно создан!'))
          dispatch(setTimeoutToCloseAlert('success'))
        })
        .catch((err) => {
          dispatch(setError(err.message))
          dispatch(setTimeoutToCloseAlert('error'))
        })
    } else {
      dispatch(setError('Заполните все поля со звездочкой!'))
      dispatch(setTimeoutToCloseAlert('error'))
    }
  }


  if (!access_token) {
    return <Redirect to='/authentication' />
  }

  return (
    <motion.div
      variants={defaultPageVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className={styles.wrapper}
    >
      <Breadcrumbs
        nestingLvl1={{
          text: 'Справочник продукции',
          link: '/person/catalog'
        }}
        nestingLvl2={{
          text: 'Новый товар (работа, услуга)',
          link: '/person/catalog/create'
        }} />

      <form onSubmit={handleSubmit} className={styles.form}>

        <Basic
          values={values}
          handleChange={handleChange} />
        <More
          values={values}
          handleChangeImages={handleChangeImages}
          handleRemoveImage={handleRemoveImage}
          handleChangeCatalogName={handleChangeCatalogName}
          handleChangeOkpdCode={handleChangeOkpdCode} />
        <Characts
          items={values.specificationDTO}
          handleAddCharacts={handleAddCharacts}
          handleDeleteCharacts={handleDeleteCharacts} />

        <div className={styles.button__container}>
          <Button
            type='submit'
            className='green'
            rounded
          >Создать</Button>

          <Link
            to="/person/catalog"
            className={styles.button__wrapper}
          >
            <Button
              type='button'
              className='red'
              rounded
            >Отмена</Button>
          </Link>
        </div>
      </form>
    </motion.div>
  )
}

export default CreateProductPG
