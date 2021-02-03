import React from 'react'
import { Link } from 'react-router-dom'
import { groupProductsTovarsType } from '../../../../commonTypes'
import { manufacturerDataType } from '../../../../manufacturerCurrent/manufacturerCurrentTypes'
import styles from './StartScreen.module.scss'

interface P {
  productsLength: number
  organizationsLength: number
  products: groupProductsTovarsType[]
  organizations: manufacturerDataType[]
}

const StartScreen: React.FC<P> = ({
  productsLength, organizationsLength, products, organizations
}) => {
  return (
    <>
      {/* Если в сохраненных запросах продуктах или организациях что-то есть, тогда показываем их, иначе выводим текстовое сообщение о отсутсвии запросов */}
      {productsLength !== 0 || organizationsLength !== 0 ? (
        <div className={styles.wrapper}>
          {productsLength !== 0 && (
            <div className={styles.block}>
              <p className={styles.block__title}>Недавние запросы по продуктам</p>
              {products.map(item => <Link
                key={item.id}
                to={`/product/${item.id}`}
                className={styles.item}
              >{item.name}</Link>
              )}
            </div>
          )}
          {organizationsLength !== 0 && (
            <div className={styles.block}>
              <p className={styles.block__title}>Недавние запросы по организациям</p>
              {organizations.map(item => <Link
                key={item.id}
                to={`/manufacturers/${item.id}`}
                className={styles.item}
              >{item.shortName}</Link>
              )}
            </div>
          )}
        </div>
      ) : <p className={styles.noResult}>Нет недавних запросов</p>}
    </>
  )
}

export default StartScreen
