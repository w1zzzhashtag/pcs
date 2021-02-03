import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { thunkType } from '../../app/store'
import { CatalogListType, CatalogListDataType } from './catalogListTypes'


const initialState: CatalogListType = {
  data: [],
  isLoaded: false
}

const catalogListSlice = createSlice({
  name: 'catalogList',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<CatalogListDataType[]>) => {
      state.data = action.payload
    },
    setClearData: (state) => {
      state.data = initialState.data
    },
    setLoaded: (state, action: PayloadAction<boolean>) => {
      state.isLoaded = action.payload
    }
  }
})


export const {
  setData,
  setClearData,
  setLoaded
} = catalogListSlice.actions

export default catalogListSlice.reducer

export const fetchCatalogListData = (): thunkType => (dispatch, getState) => {
  const { region } = getState()
  const url = `${region.active?.features.queryLink}/catalogs`

  dispatch(setLoaded(false))
  dispatch(setClearData())
  axios.get<CatalogListDataType[]>(url)
    .then((res) => dispatch(setData(res.data)))
    .then(() => dispatch(setLoaded(true)))
}