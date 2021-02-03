import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { searchProductsType, searchProductsValuesFormType } from './searchProductsTypes'
import { groupProductsType } from './../commonTypes'
import { thunkType } from '../../app/store'


const initialState: searchProductsType = {
  data: null,
  isLoaded: false,
}

const searchProductsSlice = createSlice({
  name: 'searchProducts',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<groupProductsType>) => {
      state.data = action.payload
    },
    setClearData: (state) => {
      state.data = initialState.data
    },
    setLoaded: (state, action: PayloadAction<boolean>) => {
      state.isLoaded = action.payload
    },
  }
})


export const {
  setData,
  setClearData,
  setLoaded,
} = searchProductsSlice.actions
export default searchProductsSlice.reducer

export const fetchSearchProductsData = (values: searchProductsValuesFormType): thunkType => (dispatch, getState) => {
  const { productName, okpd2, organizationName, priceMin, priceMax } = values

  let pN = '',
    o2 = '',
    oN = '',
    min = '',
    max = '';

  if (productName.trim() !== '') {
    pN = `productname=${productName.trim()}`
  } else pN = ''


  if (okpd2.trim() !== ''
    && productName.trim() === '') o2 = `okpd2=${okpd2.trim()}`
  else if (okpd2.trim() !== ''
    && productName.trim() !== '') o2 = `&okpd2=${okpd2.trim()}`
  else o2 = ''


  if (organizationName.trim() !== ''
    && productName.trim() === ''
    && okpd2.trim() === '') oN = `organizationName=${organizationName.trim()}`
  else if ((organizationName.trim() !== ''
    && productName.trim() !== '')
    || (organizationName.trim() !== ''
      && okpd2.trim() !== '')) oN = `&organizationName=${organizationName.trim()}`
  else oN = ''


  if (priceMin.trim() !== ''
    && productName.trim() === ''
    && okpd2.trim() === ''
    && organizationName.trim() === '') min = `priceMin=${priceMin}`
  else if ((priceMin.trim() !== ''
    && productName.trim() !== '')
    || (priceMin.trim() !== ''
      && okpd2.trim() !== '')
    || (priceMin.trim() !== ''
      && organizationName.trim() !== '')) min = `&priceMin=${priceMin}`
  else min = ''


  if (priceMax.trim() !== ''
    && productName.trim() === ''
    && okpd2.trim() === ''
    && organizationName.trim() === ''
    && priceMin.trim() === '') max = `priceMax=${priceMax}`
  else if ((priceMax.trim() !== ''
    && productName.trim() !== '')
    || (priceMax.trim() !== ''
      && okpd2.trim() !== '')
    || (priceMax.trim() !== ''
      && organizationName.trim() !== '')
    || (priceMax.trim() !== ''
      && priceMin.trim() !== '')) max = `&priceMax=${priceMax}`
  else max = ''

  const { region } = getState()
  const url = `${region.active?.features.queryLink}/products/find?${pN}${o2}${oN}${min}${max}`

  dispatch(setLoaded(false))
  dispatch(setClearData())
  axios.get<groupProductsType>(url)
    .then((res) => dispatch(setData(res.data)))
    .then(() => dispatch(setLoaded(true)))
}