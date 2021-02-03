import React from 'react'
import { useSelector } from 'react-redux'

import { RootStoreType } from '../../../../app/rootReducer'
import { Modal, PopupField, RadioField } from '../../../../components'

import styles from './CatalogProduct.module.scss'

interface P {
  value: string
  handleChangeCatalogName: (val: string) => void
}

const Catalog: React.FC<P> = ({ value, handleChangeCatalogName }) => {
  const { data, isLoaded } = useSelector((state: RootStoreType) => state.catalogList)
  const [modalIsOpen, setModalIsOpen] = React.useState<boolean>(false)

  const handleOpenModal = (val: boolean) => setModalIsOpen(val)

  const clearValue = () => handleChangeCatalogName('')

  const handleChange = (val: string) => {
    handleChangeCatalogName(val)
    handleOpenModal(false)
  }

  return (
    <div className={styles.catalog}>
      <PopupField
        label="Категория каталога"
        value={value}
        handleOpen={handleOpenModal}
        removeValue={clearValue} />

      {modalIsOpen && (
        <Modal handleOpen={handleOpenModal}>
          <div className="modal-container">
            <p className="modal-container__header">Выберите категорию каталога</p>

            <div className="modal-container__content">
              <div className={styles.catalog__modal}>
                {isLoaded && data.map(item => (
                  <RadioField
                    key={item.id}
                    name="category"
                    label={item.name}
                    value={item.name}
                    checked={value === item.name}
                    className="w50"
                    onChange={() => handleChange(item.name)} />
                ))}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default Catalog
