import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { thunkType } from '../../app/store'
import { setError, setSuccess, setTimeoutToCloseAlert } from '../alert/alertSlice'
import { initialStateType, regDataType, stepFirstType, stepThreeType, stepTwoType } from './registrationTypes'

const initialState: initialStateType = {
  values: {
    fullName: '',
    shortName: '',
    ogrn: '',
    inn: '',
    kpp: '',
    isSmp: false,
    isFsin: false,
    adress: '',
    regionCode: 10,
    fio: '',
    isContact: false,
    position: '',
    email: '',
    phone: '',
    login: '',
    password: '',
    registrationDate: null
  },
  stepNumber: 1
}

const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    setValues: (state, action: PayloadAction<stepFirstType | stepTwoType | stepThreeType | regDataType>) => {
      state.values = { ...state.values, ...action.payload }
    },
    setClearValues: (state) => {
      state.values = initialState.values
    },
    setNextStep: (state, action:PayloadAction<number>) => {
      state.stepNumber = action.payload
    },
  }
})

export const {
  setValues, setNextStep, setClearValues
} = registrationSlice.actions
export default registrationSlice.reducer


export const sendRegistrationValues = (): thunkType => (dispatch, getState) => {
  const { region, registration } = getState()
  const url = `${region.active?.features.queryLink}/registration`

  axios.post(url, {...registration.values})
    .then(() => {
      dispatch(setSuccess('Вы были успешно зарегистрированы'))
      dispatch(setTimeoutToCloseAlert('success'))
      dispatch(setNextStep(1))
      dispatch(setClearValues())
    })
    .catch((err: Error) => {
      dispatch(setError(err.message))
      dispatch(setTimeoutToCloseAlert('error'))
    })
}