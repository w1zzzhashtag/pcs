import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import Cookies from 'js-cookie'
import { thunkType } from '../../app/store'
import { setError, setTimeoutToCloseAlert } from '../alert/alertSlice'
import { authType, authFormValuesType, userProfileType } from './authenticationTypes'

const EXPIRES_ONE_HOUR = new Date(new Date().getTime() + 60 * 60 * 1000)

const initialState: authType = {
  access_token: null,
  userName: null
}

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.access_token = 'Bearer ' + action.payload
    },
    deleteToken: (state) => {
      state.access_token = initialState.access_token
      Cookies.remove('token')
    },
    setUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload
    },
    deleteUserName: (state) => {
      state.userName = initialState.userName
      Cookies.remove('userName')
    }
  }
})


export const {
  setToken,
  deleteToken,
  setUserName,
  deleteUserName
} = authenticationSlice.actions
export default authenticationSlice.reducer

export const identificationUser = (values: authFormValuesType): thunkType => (dispatch, getState) => {
  const { region } = getState()
  const url = region.active?.features.queryLink + '/Account/token?' +
    'username=' + values.username +
    '&password=' + values.password

  axios.post(url)
    .then(({ data }) => {
      dispatch(setToken(data.access_token))
      dispatch(fetchUserProfile())
      Cookies.set('token', data.access_token, { expires: EXPIRES_ONE_HOUR })
    })
    .catch((err) => {
      dispatch(setError('Не удалось индентифицировать пользователя'))
      dispatch(setTimeoutToCloseAlert('error'))
    })
}


export const fetchUserProfile = (): thunkType => (dispatch, getState) => {
  const { region, authentication } = getState()

  const url = region.active?.features.queryLink + '/userprofile'

  axios.get<userProfileType>(url, {
    headers: { Authorization: authentication.access_token }
  })
    .then(({ data }) => {
      dispatch(setUserName(data.fio))
      Cookies.set('userName', data.fio, { expires: EXPIRES_ONE_HOUR })
    })
    .catch((err) => {
      dispatch(setError('Не удалось загрузить данные о пользователе'))
      dispatch(setTimeoutToCloseAlert('error'))
    })
}