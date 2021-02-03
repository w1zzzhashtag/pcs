import React from 'react'
import { motion } from 'framer-motion'
import { Link, Redirect, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Breadcrumbs, Button, LoaderBreadcrumbs, SomethingBroke } from '../../../components'
import { Characts, Basic, More } from '../../../featurers/person/catalogProduct/children'
import { setError, setTimeoutToCloseAlert } from '../../../featurers/alert/alertSlice'
import { validateForm } from '../../../featurers/person/catalogProduct/validateForm'

import {
  fetchPersonCatalogProductData, sendPersonCatalogProductData,
} from './../../../featurers/person/catalogProduct/catalogProductSlice'
import { RootStoreType } from '../../../app/rootReducer'
import { charactsValuesType, dataType, imagesType } from '../../../featurers/person/catalogProduct/catalogProductTypes'

import { defaultPageVariants } from '../../../app/variants'
import styles from './CatalogProductPG.module.scss'


interface iParams {
  id: string | undefined
}

const CatalogProductPG = () => {
  const dispatch = useDispatch()
  const params: iParams = useParams()

  const { access_token } = useSelector((state: RootStoreType) => state.authentication)
  const { data, isLoaded, errorStack } = useSelector((state: RootStoreType) => state.personCatalogProduct)
  const [values, setValues] = React.useState<dataType | null>(null)

  React.useEffect(() => {
    params.id && dispatch(fetchPersonCatalogProductData(params.id))
  }, [dispatch, params])

  React.useEffect(() => {
    isLoaded && setValues(data)
  }, [isLoaded])


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (name === 'price') {
      values && setValues({ ...values, [name]: Number(value) })
      return
    }
    values && setValues({ ...values, [name]: value })
  }
  const handleChangeImages = (image: imagesType) => {
    values && setValues({
      ...values,
      imageDTO: [...values.imageDTO, image]
    })
  }
  const handleRemoveImage = (id: number) => {
    values && setValues({
      ...values,
      imageDTO: values.imageDTO.map(image => {
        if(image.id === id) {
          return {...image, status: 'D'}
        } return image
      })
    })
  }
  
  const handleChangeCatalogName = (val: string) => {
    values && setValues({ ...values, catalogName: val })
  }
  const handleChangeOkpdCode = (val: string) => {
    values && setValues({ ...values, okpdCode: val })
  }
  const handleAddCharacts = (data: charactsValuesType) => {
    values && setValues({
      ...values,
      specificationDTO: [...values.specificationDTO, {
        ...data, 
        id: values.specificationDTO.length + 1, 
        status: 'C'
      }]
    })
  }
  const handleDeleteCharacts = (id: number) => {
    values && setValues({
      ...values,
      specificationDTO: values.specificationDTO.map(item => {
        if(item.id === id) {
          return {...item, status: 'D'}
        } return item
      })
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm(values as dataType)) {
      dispatch(sendPersonCatalogProductData(values as dataType))
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
      className={styles.wrapper}
      variants={defaultPageVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      {!errorStack ? <>
        {isLoaded ? <Breadcrumbs
          nestingLvl1={{
            text: 'Справочник продукции',
            link: '/person/catalog'
          }}
          nestingLvl2={{
            text: data?.name as string,
            link: `/person/catalog/product/${data?.id}`
          }}
        /> : <LoaderBreadcrumbs />}

        <form className={styles.form} onSubmit={handleSubmit}>
          {values && <>
            <Basic
              values={values as dataType}
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
              >Сохранить</Button>

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
          </>}
        </form>
      </> : <SomethingBroke message={errorStack} />}

    </motion.div>
  )
}

export default CatalogProductPG
