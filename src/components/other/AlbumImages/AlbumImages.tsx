import React from 'react'
import { AnimatePresence } from 'framer-motion'
import { dataImagesType } from '../../../featurers/productCurrent/productCurrentTypes'
import styles from './AlbumImages.module.scss'
import { Modal } from '../..'

interface P {
  images: dataImagesType[]
  placeholders?: boolean
}

const AlbumImages: React.FC<P> = ({ images, placeholders }) => {
  const [activeItem, setActiveItem] = React.useState<string>('')
  const [isOpen, setIsOpen] = React.useState<boolean>(false)

  const openImage = (url: string) => {
    setActiveItem(url)
    setIsOpen(true)
  }
  const closeImage = () => {
    setIsOpen(false)
    setActiveItem('')
  }

  React.useEffect(() => {
    if (activeItem !== '') {
      document.body.style.overflowY = 'hidden'
    } else {
      document.body.style.overflowY = 'visible'
    }
  }, [activeItem])

  return (
    <div className={styles.wrapper}>

      <AnimatePresence>
        {isOpen && (
          <Modal handleOpen={closeImage}>
            <img
              className="modal-img_active"
              src={`http://api.promcase.ru/${activeItem}`}
              alt="active" />
          </Modal>
        )}
      </AnimatePresence>

      {!placeholders ? <div className={styles.images}>
        {images.map((item, i) => {
          if (i < 4) {
            return (
              <img
                key={item.id}
                className={styles.images__item}
                onClick={() => openImage(item.url)}
                src={`http://api.promcase.ru/${item.url}`}
                alt="img" />
            )
          } else return null
        })}
      </div> : <div className={styles.images}>
          {Array(4).fill(0).map((_, i) => <div key={i} className={styles.images__item}></div>)}
        </div>}
    </div>
  )
}

export default AlbumImages
