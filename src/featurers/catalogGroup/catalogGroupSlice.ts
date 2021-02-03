import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from 'axios'
import { thunkType } from "../../app/store"
import { errorStackType } from "../commonTypes"
import { catalogGroupType, catalogGroupDataType } from './catalogGroupTypes'


const initialState: catalogGroupType = {
  data: null,
  isLoaded: false,
  errorStack: undefined
}

const catalogGroupSlice = createSlice({
  name: 'catalogGroup',
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
    },
  }
})

export const {
  setData,
  setClearData,
  setLoaded, 
  setErrorStack
} = catalogGroupSlice.actions
export default catalogGroupSlice.reducer

export const fetchCatalogGroupData = (id: string | undefined): thunkType => (dispatch, getState) => {
  const { region } = getState()
  const url = `${region.active?.features.queryLink}/catalogs/${id}`

  dispatch(setLoaded(false))
  dispatch(setClearData())
  dispatch(setErrorStack(undefined))
  axios.get<catalogGroupDataType>(url)
    .then((res) => dispatch(setData(res.data)))
    .then(() => dispatch(setLoaded(true)))
    .catch((err:Error) => dispatch(setErrorStack(err.stack)))
}