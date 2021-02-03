import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { thunkType } from '../../../app/store'
import { setError, setSuccess, setTimeoutToCloseAlert } from '../../alert/alertSlice'
import { errorStackType } from '../../commonTypes'
import { initialStateType, dataType } from './catalogProductTypes'

const initialState: initialStateType = {
  data: null,
  isLoaded: false,
  errorStack: undefined
}

const catalogProductSlice = createSlice({
  name: 'personCatalogProduct',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<dataType>) => {
      state.data = action.payload
    },
    setLoaded: (state, action: PayloadAction<boolean>) => {
      state.isLoaded = action.payload
    },
    setClearData: (state) => {
      state.data = initialState.data
    },
    setErrorStack: (state, action:PayloadAction<errorStackType>) => {
      state.errorStack = action.payload
    }
  }
})


export const {
  setData,
  setLoaded,
  setClearData,
  setErrorStack
} = catalogProductSlice.actions
export default catalogProductSlice.reducer

export const fetchPersonCatalogProductData = (id: string): thunkType => (dispatch, getState) => {
  const { region, authentication } = getState()
  const url = `${region.active?.features.queryLink}/vendorproduct/${id}`

  dispatch(setLoaded(false))
  dispatch(setClearData())
  dispatch(setErrorStack(undefined))
  axios.get<dataType>(url, {
    headers: { Authorization: authentication.access_token },
  })
    .then((res) => dispatch(setData(res.data)))
    .then(() => dispatch(setLoaded(true)))
    .catch((err:Error) => dispatch(setErrorStack(err.message)))
}


export const sendPersonCatalogProductData = (data: dataType): thunkType => (dispatch, getState) => {
  const { region, authentication } = getState()
  const url = `${region.active?.features.queryLink}/vendorproduct/${data.id}`

  axios.put<dataType>(url, data, { 
    headers: { Authorization: authentication.access_token } 
  })
    .then((res) => {
      dispatch(setSuccess('Продукт был успешно сохранен!'))
      dispatch(setTimeoutToCloseAlert('success'))
    })
    .catch(err => {
      dispatch(setError(err.message))
      dispatch(setTimeoutToCloseAlert('error'))
    })
}