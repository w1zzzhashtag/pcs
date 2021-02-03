import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { topManufacturersType, topManufacturersDataType } from './topManufacturersTypes'
import { thunkType } from './../../app/store'


const initialState: topManufacturersType = {
  data: [],
  isLoaded: false
}


const topManufacturersSlice = createSlice({
  name: 'topManufacturers',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<topManufacturersDataType[]>) => {
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
} = topManufacturersSlice.actions

export default topManufacturersSlice.reducer



export const fetchTopManufacturersData = (): thunkType => (dispatch, getState) => {
  const { region } = getState()
  const url = `${region.active?.features.queryLink}/topOrganizations`

  dispatch(setLoaded(false))
  dispatch(setClearData())
  axios.get<topManufacturersDataType[]>(url)
    .then((res) => dispatch(setData(res.data)))
    .then(() => dispatch(setLoaded(true)))
}