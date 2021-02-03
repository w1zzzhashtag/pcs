import React from 'react'
import cn from 'classnames'
import axios from 'axios'
import { useSelector } from 'react-redux'

import { ThemeContext } from '../../../../app/contexts'

import { imagesType } from '../catalogProductTypes'

import styles from './CatalogProduct.module.scss'
import { RootStoreType } from '../../../../app/rootReducer'


const MAX_COUNT_IMAGES = 4

interface P {
  images: imagesType[]
  handleChangeImages: (image: imagesType) => void
  handleRemoveImage: (id: number) => void
}

const Images: React.FC<P> = ({ images, handleChangeImages, handleRemoveImage }) => {
  const { theme } = React.useContext(ThemeContext)

  const activeRegion = useSelector((state: RootStoreType) => state.region.active)
  const URL = activeRegion?.features.queryLink + '/UploadImages'

  const [countImages, setCountImages] = React.useState(0)
  const [imageIsLoaded, setImageIsLoaded] = React.useState(false)
  React.useEffect(() => setCountImages(images.filter(image => image.status !== 'D').length), [images])
  
  const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target

    if (files) {
      const filesLength = 1
      const currentCount = filesLength + countImages
      if (currentCount <= MAX_COUNT_IMAGES) {
        let formData = new FormData();
        formData.append('uploads', files[0])
        axios.post(URL, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
          .then((res) => {
            handleChangeImages({
              id: countImages + 1,
              url: res.data[0],
              index: countImages + 1,
              status: 'C'
            })
          })
      }
    }
  }

  const removeImage = (id: number) => handleRemoveImage(id)

  return (
    <div className={cn(styles.images, styles[theme])}>
      <p className={styles.images__title}>Загрузите изображения</p>

      <div className={styles.images__inner}>
        {images.map(image => {
          if (image.status !== 'D') return (
            <div key={image.id}
              className={styles.images__inner__item}>
              <img
                src={`http://api.promcase.ru/${image.url}`}
                alt="img" />
              <span
                className={styles.images__inner__item__close}
                onClick={() => removeImage(image.id)}
              >&times;</span>
            </div>
          )
        })}

        <div className={cn(styles.images__placeholder, styles.item1)}></div>
        <div className={cn(styles.images__placeholder, styles.item2)}></div>
        <div className={cn(styles.images__placeholder, styles.item3)}></div>
        <div className={cn(styles.images__placeholder, styles.item4)}></div>
      </div>

      <div className={styles.images__input__container}>
        <input
          type="file"
          accept=".png, .jpg, .jpeg"
          id="upload"
          onChange={uploadImage}
          className={styles.images__input} />
        <label
          htmlFor="upload"
          className={cn(styles.images__input__label, 'popupField', {
            [styles.disabled]: countImages === MAX_COUNT_IMAGES
          })}>Выбрать</label>
        <span className={styles.images__input__count}>
          {countImages} из {MAX_COUNT_IMAGES}
        </span>
      </div>
    </div>
  )
}

export default Images
