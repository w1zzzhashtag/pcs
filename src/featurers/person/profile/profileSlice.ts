import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { thunkType } from '../../../app/store'
import { 
  profileType, profileDataType, 
} from './profileTypes'
import {setError, setSuccess, setTimeoutToCloseAlert} from './../../alert/alertSlice'
import { errorStackType } from '../../commonTypes'

const initialState: profileType = {
  data: null,
  isLoaded: false,
  errorStack: undefined
}

const profileSlice = createSlice({
  name: 'personProfile',
  initialState,
  reducers: {
    setData: (state, action:PayloadAction<profileDataType>) => {
      state.data = action.payload
    },
    setLoaded: (state, action:PayloadAction<boolean>) => {
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
  setClearData, 
  setLoaded,
  setErrorStack
} = profileSlice.actions
export default profileSlice.reducer

export const fetchPersonProfileData = ():thunkType => (dispatch, getState) => {
  const {region, authentication} = getState()

  const url = `${region.active?.features.queryLink}/organizationprofile`
  
  dispatch(setLoaded(false))
  dispatch(setClearData())
  dispatch(setErrorStack(undefined))
  axios.get<profileDataType>(url, {
    headers: {Authorization: authentication.access_token}
  })
    .then((res) => dispatch(setData(res.data)))
    .then(() => dispatch(setLoaded(true)))
    .catch((err:Error) => dispatch(setErrorStack(err.stack)))
}


export const sendPersonProfileData = (id: number, data: profileDataType):thunkType => (dispatch, getState) => {
  const {region, authentication} = getState()
  const url = `${region.active?.features.queryLink}/organizationprofile/${id}`

  axios.put(url, data, {headers: {Authorization: authentication.access_token}})
    .then(() => {
      dispatch(setSuccess('Данные были успешно сохранены'))
      dispatch(setTimeoutToCloseAlert('success'))
      dispatch(setData(data))
    })
    .catch((err:Error) => {      
      dispatch(setError(err.message))
      dispatch(setTimeoutToCloseAlert('error'))
    })
}
