import React from 'react'
import { Catalog, Images } from '.'
import { Okpd } from './../../../okpd/children'
import { dataType, imagesType } from '../catalogProductTypes'

import styles from './CatalogProduct.module.scss'


interface P {
  values: dataType
  handleChangeImages: (image: imagesType) => void
  handleRemoveImage: (id: number) => void
  handleChangeCatalogName: (val: string) => void
  handleChangeOkpdCode: (val: string) => void
}

const More:React.FC<P> = ({
  values, handleChangeCatalogName, handleChangeOkpdCode, handleChangeImages, handleRemoveImage
}) => {
  
  return (
    <div className={styles.wrapper}>
      <h6>Дополнительные сведения</h6>

      <Images 
        images={values.imageDTO}
        handleChangeImages={handleChangeImages}
        handleRemoveImage={handleRemoveImage} />

      <Catalog 
        value={values.catalogName}
        handleChangeCatalogName={handleChangeCatalogName} />

      <Okpd 
        value={values.okpdCode}
        handleChangeOkpdCode={handleChangeOkpdCode} />

    </div>
  )
}

export default More
