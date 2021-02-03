import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { thunkType } from '../../app/store'
import { initialStateType, dataType } from './okpdTypes'

const initialState: initialStateType = {
  data: [],
  nestedData: {},
  isLoaded: false
}


const okpdSlice = createSlice({
  name: 'okpd',
  initialState,
  reducers: {
    setData: (state, action:PayloadAction<dataType[]>) => {
      state.data = action.payload
    },
    setLoaded: (state, action:PayloadAction<boolean>) => {
      state.isLoaded = action.payload
    },
    setNestedData: (state, action:PayloadAction<{
      code: string, data: dataType[]
    }>) => {
      const { code, data } = action.payload
      state.nestedData[code] = data
    },
  }
})


export const {
  setData, setLoaded, setNestedData
} = okpdSlice.actions
export default okpdSlice.reducer


export const fetchOkpdData = ():thunkType => (dispatch, getState) => {
  const { region } = getState()
  const url = `${region.active?.features.queryLink}/okpd2`

  dispatch(setLoaded(false))
  axios.get<dataType[]>(url)
    .then((res) => dispatch(setData(res.data)))
    .then(() => dispatch(setLoaded(true)))
}

export const fetchNestedOkpdData = (code: string):thunkType => (dispatch, getState) => {
  const { region } = getState()
  const url = `${region.active?.features.queryLink}/okpd2/${code}`

  axios.get<dataType[]>(url)
    .then((res) => dispatch(setNestedData({code, data: res.data})))
}