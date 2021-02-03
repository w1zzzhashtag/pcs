import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { thunkType } from '../../../app/store'
import { errorStackType } from '../../commonTypes'
import { initialStateType, dataType, activeFiltersType } from './catalogTypes'



const initialState: initialStateType = {
  data: { count: 1, productsDTO: [] },
  isLoaded: false,
  tableHeadings: [
    { title: 'Номер', width: 7 },
    { title: 'Наименование позиции', width: 36 },
    { title: 'Категория', width: 12 },
    { title: 'ОКПД2', width: 10 },
    { title: 'Цена за единицу', width: 13 },
    { title: 'Статус', width: 8 },
    { title: 'Дата изменения', width: 14 },
  ],
  filters: [
    { name: 'Все', value: 'all' },
    { name: 'Новые', value: 'new' },
    { name: 'Утвержденные', value: 'approved' },
    { name: 'На модерации', value: 'moderation' },
    { name: 'Отклоненные', value: 'cancel' },
  ],
  activeFilter: 'all',
  errorStack: undefined
}

const personCatalogSlice = createSlice({
  name: 'personCatalog',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<dataType>) => {
      state.data = action.payload
    },
    setClearData: (state) => {
      state.data = initialState.data
    },
    setLoaded: (state, action: PayloadAction<boolean>) => {
      state.isLoaded = action.payload
    },
    setActiveFilter: (state, action: PayloadAction<activeFiltersType>) => {
      state.activeFilter = action.payload
    },
    setErrorStack: (state, action: PayloadAction<errorStackType>) => {
      state.errorStack = action.payload
    }
  }
})


export const {
  setData,
  setClearData,
  setLoaded,
  setActiveFilter,
  setErrorStack
} = personCatalogSlice.actions
export default personCatalogSlice.reducer



export const fetchPersonCatalogData = (pageNumber: number): thunkType => (dispatch, getState) => {
  const { region, authentication } = getState()
  const url = `${region.active?.features.queryLink}/vendorproductlist/${pageNumber}`

  dispatch(setLoaded(false))
  dispatch(setClearData())
  dispatch(setErrorStack(undefined))
  axios.get<dataType>(url, {
    headers: { Authorization: authentication.access_token },
  })
    .then((res) => dispatch(setData(res.data)))
    .then(() => dispatch(setLoaded(true)))
    .catch((err:Error) => dispatch(setErrorStack(err.stack)))
}

export const deletePersonCatalogProduct = (id: number): thunkType => (dispatch, getState) => {
  const { region, authentication } = getState()
  const url = `${region.active?.features.queryLink}/vendorproduct/${id}`

  axios.delete(url, {
    headers: { Authorization: authentication.access_token },
  })
    .then((res) => {
      console.log('deletePersonCatalogProduct', res.data);
    })
}