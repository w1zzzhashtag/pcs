import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { thunkType } from './../../app/store'
import { actualOffersType, actualOffersDataType } from './actualOffersTypes'

const initialState: actualOffersType = {
  data: [],
  isLoaded: false
}

const actualOffersSlice = createSlice({
  name: 'actualOffers',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<actualOffersDataType[]>) => {
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
} = actualOffersSlice.actions
export default actualOffersSlice.reducer


export const fetchActualOffersData = (id?: string): thunkType => (dispatch, getState) => {
  const { region } = getState()
  const url = `${region.active?.features.queryLink}/actualoffers/${id ? id : ''}`

  dispatch(setLoaded(false))
  dispatch(setClearData())
  axios.get<actualOffersDataType[]>(url)
    .then((res) => dispatch(setData(res.data)))
    .then(() => dispatch(setLoaded(true)))
}

