import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { RootStoreType } from '../../app/rootReducer'
import { fetchTopManufacturersData } from './topManufacturersSlice'

import deleteSoon from './../../assets/images/deleteSoon.png'


const TopManufacturers = () => {
  const dispatch = useDispatch()
  const { data, isLoaded } = useSelector((state: RootStoreType) => state.topManufacturers)

  React.useEffect(() => {
    dispatch(fetchTopManufacturersData())
  }, [dispatch])

  return (
    <>
      {isLoaded && (
        data.map(item => (
          <Link
            key={item.id}
            to={`/manufacturers/${item.id}`}
            className="information__inner__list-item"
          >
            <img
              src={deleteSoon}
              // src={`http://api.promcase.ru/${item.imgSrc}`}
              alt={item.name}
              className="information__inner__list-item__img" />
            <span>{item.name}</span>
          </Link>
        ))
      )}
    </>
  )
}

export default TopManufacturers
