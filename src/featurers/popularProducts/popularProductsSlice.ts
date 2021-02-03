import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { thunkType } from '../../app/store'
import { popularProductsType, popularProductsDataType } from './popularProductsTypes'

const initialState: popularProductsType = {
  data: [],
  isLoaded: false
}

const popularProductsSlice = createSlice({
  name: 'popularProducts',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<popularProductsDataType[]>) => {
      state.data = action.payload
    },
    setLoaded: (state, action: PayloadAction<boolean>) => {
      state.isLoaded = action.payload
    },
    setClearData: (state) => {
      state.data = initialState.data
    }
  }
})

export const {
  setData,
  setLoaded,
  setClearData
} = popularProductsSlice.actions
export default popularProductsSlice.reducer


export const fetchPopularProductsData = (): thunkType => (dispatch, getState) => {
  const { region } = getState()
  const url = `${region.active?.features.queryLink}/popularproducts`

  dispatch(setLoaded(false))
  dispatch(setClearData())
  axios.get<popularProductsDataType[]>(url)
    .then((res) => dispatch(setData(res.data)))
    .then(() => dispatch(setLoaded(true)))
}