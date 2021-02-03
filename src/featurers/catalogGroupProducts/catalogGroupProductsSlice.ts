import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { catalogGroupProductsType } from './catalogGroupProductsTypes'
import { errorStackType, groupProductsType } from './../commonTypes'
import { thunkType } from '../../app/store'


const initialState: catalogGroupProductsType = {
  data: null,
  isLoaded: false,
  errorStack: undefined
}

const catalogGroupProductsSlice = createSlice({
  name: 'catalogGroupProducts',
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
    setErrorStack: (state, action: PayloadAction<errorStackType>) => {
      state.errorStack = action.payload
    }
  }
})

export const {
  setData,
  setClearData,
  setLoaded,
  setErrorStack
} = catalogGroupProductsSlice.actions
export default catalogGroupProductsSlice.reducer

export const fetchCatalogGroupProductsData = (id: string | undefined, okpd: string | undefined): thunkType => (dispatch, getState) => {
  const { region } = getState()
  const url = `${region.active?.features.queryLink}/catalogs/${id}/${okpd}`

  dispatch(setLoaded(false))
  dispatch(setClearData())
  dispatch(setErrorStack(undefined))
  axios.get<groupProductsType>(url)
    .then((res) => dispatch(setData(res.data)))
    .then(() => dispatch(setLoaded(true)))
    .catch((err: Error) => dispatch(setErrorStack(err.stack as string)))
}