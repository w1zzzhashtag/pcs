import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dynatree } from '.'
import { RootStoreType } from '../../../app/rootReducer'
import { Modal, PopupField } from '../../../components'
import { fetchOkpdData } from '../okpdSlice'
import styles from './Okpd.module.scss'

interface P {
  value: string
  handleChangeOkpdCode: (val: string) => void
}

const Okpd: React.FC<P> = ({ value, handleChangeOkpdCode }) => {
  const dispatch = useDispatch()

  const {data, isLoaded, nestedData} = useSelector((state: RootStoreType) => state.okpd)

  React.useEffect(() => {
    dispatch(fetchOkpdData())
  }, [dispatch])

  const [modalIsOpen, setModalIsOpen] = React.useState<boolean>(false)

  const handleOpenModal = (val: boolean) => setModalIsOpen(val)

  const clearValue = () => handleChangeOkpdCode('')

  return (
    <div className={styles.wrapper}>
      <PopupField
        label="ОКПД2\КТРУ"
        value={value}
        require
        handleOpen={handleOpenModal}
        removeValue={clearValue} />

      {modalIsOpen && (
        <Modal handleOpen={handleOpenModal}>
          <div className="modal-container">
            <p className="modal-container__header">
              Выберите категорию каталога
            </p>

            <div className="modal-container__content">
              <div className={styles.modal}>
                {isLoaded && data.map(item => (
                  <Dynatree 
                    key={item.id}
                    value={value}
                    dataItem={item}
                    nestedData={nestedData}
                    isNestedData={false}
                    handleOpenModal={handleOpenModal}
                    handleChangeOkpdCode={handleChangeOkpdCode} />
                ))}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default Okpd
