import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { fsinType, fsinOptionsType } from './fsinTypes'
import { errorStackType, groupProductsType } from './../commonTypes'
import { thunkType } from '../../app/store'
import { fetchOptionsConfig, sendOptionsConfig } from './fsinConfigs'

const initialState: fsinType = {
  data: null,
  options: null,
  isLoaded: false,
  optionsIsLoaded: false,
  errorStack: undefined
}


const fsinSlice = createSlice({
  name: 'fsin',
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
    setOptions: (state, action: PayloadAction<fsinOptionsType>) => {
      state.options = action.payload
    },
    setClearOptions: (state) => {
      state.options = initialState.options
    },
    setLoadedOptions: (state, action) => {
      state.optionsIsLoaded = action.payload
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
  setOptions,
  setClearOptions,
  setLoadedOptions,
  setErrorStack
} = fsinSlice.actions
export default fsinSlice.reducer


export const fetchFsinData = (): thunkType => (dispatch, getState) => {
  const { region } = getState()
  const url = `${region.active?.features.queryLink}/fsinproducts`

  dispatch(setLoaded(false))
  dispatch(setClearData())
  dispatch(setErrorStack(undefined))
  axios.get<groupProductsType>(url)
    .then((res) => dispatch(setData(res.data)))
    .then(() => dispatch(setLoaded(true)))
    .catch((err: Error) => dispatch(setErrorStack(err.stack)))
}

export const fetchFsinOptions = (): thunkType => (dispatch, getState) => {
  const { region } = getState()
  const url = `${region.active?.features.queryLink}/fsinproducts/options/`

  dispatch(setLoadedOptions(false))
  dispatch(setClearOptions())
  axios.get<fsinOptionsType>(url, fetchOptionsConfig)
    .then((res) => dispatch(setOptions(res.data)))
    .then(() => dispatch(setLoadedOptions(true)))
}

export const sendFsinOptions = (data: fsinOptionsType): thunkType => (dispatch, getState) => {
  const { region } = getState()
  const url = `${region.active?.features.queryLink}/fsinproducts/`

  dispatch(setLoaded(false))
  dispatch(setClearData())
  dispatch(setErrorStack(undefined))
  axios.post<groupProductsType>(url, data, sendOptionsConfig)
    .then((res) => dispatch(setData(res.data)))
    .then(() => dispatch(setLoaded(true)))
    .catch((err: Error) => dispatch(setErrorStack(err.stack)))
}