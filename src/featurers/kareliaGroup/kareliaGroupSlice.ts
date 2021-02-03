import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { thunkType } from '../../app/store'
import { errorStackType } from '../commonTypes'
import { catalogGroupType, catalogGroupDataType } from './../catalogGroup/catalogGroupTypes'


const initialState: catalogGroupType = {
  data: null,
  isLoaded: false,
  errorStack: undefined
}

const kareliaGroupSlice = createSlice({
  name: 'kareliaGroup',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<catalogGroupDataType>) => {
      state.data = action.payload
    },
    setClearData: (state) => {
      state.data = initialState.data
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
  setLoaded,
  setErrorStack
} = kareliaGroupSlice.actions
export default kareliaGroupSlice.reducer


export const fetchKareliaGroupData = (): thunkType => (dispatch, getState) => {
  const { region } = getState()
  const url = `${region.active?.features.queryLink}/madeInCarelia`

  dispatch(setLoaded(false))
  dispatch(setClearData())
  dispatch(setErrorStack(undefined))
  axios.get<catalogGroupDataType>(url)
    .then((res) => dispatch(setData(res.data)))
    .then(() => dispatch(setLoaded(true)))
    .catch((err) => dispatch(setErrorStack(err.message)))
}