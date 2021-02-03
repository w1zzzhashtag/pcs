import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { thunkType } from '../../app/store'
import { errorStackType } from '../commonTypes'
import { manufacturerCurrentType, manufacturerDataType, manufacturerCoordsType } from './manufacturerCurrentTypes'


const initialState: manufacturerCurrentType = {
  data: null,
  coords: null,
  isLoaded: false,
  errorStack: undefined
}

const manufacturerCurrentSlice = createSlice({
  name: 'manufacturerCurrent',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<manufacturerDataType>) => {
      state.data = action.payload
    },
    setClearData: (state) => {
      state.data = initialState.data
    },
    setCoords: (state, action: PayloadAction<manufacturerCoordsType>) => {
      state.coords = action.payload
    },
    setLoaded: (state, action: PayloadAction<boolean>) => {
      state.isLoaded = action.payload
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
  setErrorStack
} = manufacturerCurrentSlice.actions

export default manufacturerCurrentSlice.reducer

export const fetchManufacturerCurrentData = (id: string | undefined): thunkType => (dispatch, getState) => {
  const { region } = getState()
  const url = `${region.active?.features.queryLink}/organizations/${id}`

  dispatch(setLoaded(false))
  dispatch(setClearData())
  dispatch(setErrorStack(undefined))
  axios.get<manufacturerDataType>(url)
    .then((res) => dispatch(setData(res.data)))
    .then(() => dispatch(setLoaded(true)))
    .catch((err:Error) => dispatch(setErrorStack(err.stack)))
}