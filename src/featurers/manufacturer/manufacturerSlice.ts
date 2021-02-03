import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { thunkType } from '../../app/store'
import { manufacturersType, manufacturersSortByType, manufacturersValuesFormType } from './manufacturerTypes'
import { manufacturerDataType, manufacturerCoordsType } from './../manufacturerCurrent/manufacturerCurrentTypes'
import { errorStackType } from '../commonTypes'


const initialState: manufacturersType = {
  data: [],
  coords: [],
  isLoaded: false,
  sortBy: [
    { id: 1, name: 'Все', query: '' },
    { id: 2, name: 'По дате', query: 'date' },
    { id: 3, name: 'По алфавиту', query: 'alph' }
  ],
  sortActive: null,
  errorStack: undefined
}

const manufacturersSlice = createSlice({
  name: 'manufacturer',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<manufacturerDataType[]>) => {
      state.data = action.payload
    },
    setClearData: (state) => {
      state.data = initialState.data
    },
    setCoords: (state, action: PayloadAction<manufacturerCoordsType>) => {
      state.coords.push(action.payload)
    },
    setLoaded: (state, action: PayloadAction<boolean>) => {
      state.isLoaded = action.payload
    },
    setSortActive: (state, action: PayloadAction<manufacturersSortByType>) => {
      state.sortActive = action.payload
    },
    setErrorStack: (state, action:PayloadAction<errorStackType>) => {
      state.errorStack = action.payload
    }
  }
})


export const {
  setData,
  setClearData,
  setCoords,
  setLoaded,
  setSortActive,
  setErrorStack
} = manufacturersSlice.actions

export default manufacturersSlice.reducer


export const fetchManufacturersData = (): thunkType => (dispatch, getState) => {
  const { region } = getState()
  const url = `${region.active?.features.queryLink}/organizations`

  dispatch(setLoaded(false))
  dispatch(setClearData())
  dispatch(setErrorStack(undefined))
  axios.get<manufacturerDataType[]>(url)
    .then((res) => dispatch(setData(res.data)))
    .then(() => dispatch(setLoaded(true)))
    .catch((err:Error) => dispatch(setErrorStack(err.stack)))
}


export const fetchManufacturersDataWithSorting = (
  values: manufacturersValuesFormType, sort?: string
): thunkType => (disaptch, getState) => {

  const { name, inn, productName } = values

  let n = '',
    i = '',
    pN = '',
    s = '';

  if (name.trim() !== '') {
    n = `name=${name.trim()}`
  } else n = ''


  if (inn.trim() !== ''
    && name.trim() === '') i = `inn=${inn.trim()}`
  else if (inn.trim() !== ''
    && name.trim() !== '') i = `&inn=${inn.trim()}`
  else i = ''


  if (productName.trim() !== ''
    && name.trim() === ''
    && inn.trim() === '') pN = `productName=${productName.trim()}`
  else if ((productName.trim() !== ''
    && name.trim() !== '')
    || (productName.trim() !== ''
      && inn.trim() !== '')) pN = `&productName=${productName.trim()}`
  else pN = ''


  if (sort !== undefined
    && name.trim() === ''
    && inn.trim() === ''
    && productName.trim() === '') s = `sortby=${sort}`
  else if ((sort !== undefined
    && name.trim() === '')
    || (sort !== undefined
      && inn.trim() === '')
    || (sort !== undefined
      && productName.trim() === '')) s = `&sortby=${sort}`
  else s = ''


  const { region } = getState()
  const url = `${region.active?.features.queryLink}/organizations/find?${n}${i}${pN}${s}`

  disaptch(setLoaded(false))
  disaptch(setClearData())
  disaptch(setErrorStack(undefined))
  axios.get<manufacturerDataType[]>(url)
    .then((res) => disaptch(setData(res.data)))
    .then(() => disaptch(setLoaded(true)))
    .catch((err:Error) => disaptch(setErrorStack(err.stack)))
}