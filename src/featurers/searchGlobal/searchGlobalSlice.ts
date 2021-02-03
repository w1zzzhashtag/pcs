import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { thunkType } from '../../app/store'
import { groupProductsTovarsType } from '../commonTypes'
import { manufacturerDataType } from '../manufacturerCurrent/manufacturerCurrentTypes'
import {
  searchGlobalType,
  searchGlobalDataType,
  savedQueriesPayload,
} from './searchGlobalTypes'

const initialState: searchGlobalType = {
  data: {
    globalSearchProductsDTO: [],
    globalSearchOrganizationsDTO: []
  },
  savedQueries: {
    globalSearchProductsDTO: [],
    globalSearchOrganizationsDTO: []
  },
  isLoaded: false,
  error: null,
  modalIsOpen: false,
}

const searchGlobalSlice = createSlice({
  name: 'searchGlobal',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<searchGlobalDataType>) => {
      state.data = action.payload
    },
    setClearData: (state) => {
      state.data = initialState.data
    },
    setLoaded: (state, action: PayloadAction<boolean>) => {
      state.isLoaded = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    handleOpenModal: (state, action: PayloadAction<boolean>) => {
      state.modalIsOpen = action.payload
      state.data = initialState.data
    },
    saveQuery: (state, action: PayloadAction<savedQueriesPayload>) => {
      const { item, name } = action.payload
      const products = state.savedQueries.globalSearchProductsDTO
      const organizations = state.savedQueries.globalSearchOrganizationsDTO
      let hasDublicate: boolean = false

      if (name === 'products') {
        products.forEach(productsItem => {
          if (productsItem.id === item.id) {
            hasDublicate = true
          } else hasDublicate = false
        })
        !hasDublicate && products.push(item as groupProductsTovarsType)
      } else {
        organizations.forEach(organizationsItem => {
          if (organizationsItem.id === item.id) {
            hasDublicate = true
          } else hasDublicate = false
        })
        !hasDublicate && organizations.push(item as manufacturerDataType)
      }
    }
  }
})

export const {
  setData,
  setClearData,
  setLoaded,
  setError,
  handleOpenModal,
  saveQuery
} = searchGlobalSlice.actions
export default searchGlobalSlice.reducer


export const fetchSearchGlobalData = (val: string): thunkType => (dispatch, getState) => {
  const { region } = getState()
  const url = `${region.active?.features.queryLink}/globalSearch/${val}`

  dispatch(setLoaded(false))
  dispatch(setClearData())
  dispatch(setError(null))
  axios.get<searchGlobalDataType>(url)
    .then((res) => dispatch(setData(res.data)))
    .then(() => dispatch(setLoaded(true)))
    .catch(e => dispatch(setError(e.message)))
}