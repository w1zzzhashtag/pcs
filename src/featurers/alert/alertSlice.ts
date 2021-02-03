import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { thunkType } from '../../app/store'
import { alertType } from './alertTypes'

const initialState: alertType = {
  success: null,
  error: null,
}

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setSuccess: (state, action: PayloadAction<string>) => {
      state.success = action.payload
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
    setCloseSuccess: (state) => {
      state.success = null
    },
    setCloseError: (state) => {
      state.error = null
    },
  }
})

export const {
  setSuccess, setError,
  setCloseSuccess, setCloseError,
} = alertSlice.actions
export default alertSlice.reducer


export const setTimeoutToCloseAlert = (type: 'success' | 'error'): thunkType => (dispatch) => {
  switch (type) {
    case 'success':
      dispatch(setCloseError())
      setTimeout(() => dispatch(setCloseSuccess()), 3000)
      return
    case 'error':
      dispatch(setCloseSuccess())
      setTimeout(() => dispatch(setCloseError()), 3000)
      return
    default: return
  }
}