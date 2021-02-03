import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { thunkType } from '../../app/store'
import { setError, setSuccess, setTimeoutToCloseAlert } from '../alert/alertSlice'
import { errorStackType } from '../commonTypes'
import { productCurrentType, dataType, sendBidValuesType } from './productCurrentTypes'


const initialState: productCurrentType = {
  data: null,
  isLoaded: false,
  errorStack: undefined
}


const productCurrentSlice = createSlice({
  name: 'productCurrent',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<dataType>) => {
      state.data = action.payload
    },
    setClearData: (state) => {
      state.data = initialState.data
    },
    setLoaded: (state, action: PayloadAction<boolean>) => {
      state.isLoaded = action.payload
    },
    setErrorStack: (state, action: PayloadAction<errorStackType>) => {
      state.errorStack = action.payload
    }
  }
})

export const {
  setData,
  setClearData,
  setLoaded,
  setErrorStack
} = productCurrentSlice.actions
export default productCurrentSlice.reducer


export const fetchProductCurrent = (productId: string): thunkType => (dispatch, getState) => {
  const { region } = getState()
  const url = `${region.active?.features.queryLink}/products/${productId}`

  dispatch(setLoaded(false))
  dispatch(setClearData())
  dispatch(setErrorStack(undefined))
  axios.get<dataType>(url)
    .then((res) => dispatch(setData(res.data)))
    .then(() => dispatch(setLoaded(true)))
    .catch((err: Error) => dispatch(setErrorStack(err.stack)))
}


export const sendBid = (values: sendBidValuesType): thunkType => (dispatch, getState) => {
  const { region } = getState()
  const url = region.active?.features.queryLink + '/bid?' +
    'customerName=' + values.customerName +
    '&inn=' + values.inn +
    '&kpp=' + values.kpp +
    '&adress=' + values.adress +
    '&contactFio=' + values.contactFio +
    '&phone=' + values.phone +
    '&email=' + values.email +
    '&quantity=' + values.quantity +
    '&note=' + values.note +
    '&vendorId=' + values.vendorId +
    '&productId=' + values.productId

  axios.post(url)
    .then(() => {
      dispatch(setSuccess('Заявка была успешно отправлена'))
      dispatch(setTimeoutToCloseAlert('success'))
    })
    .catch((err: Error) => {
      dispatch(setError(err.message))
      dispatch(setTimeoutToCloseAlert('error'))
    })
}