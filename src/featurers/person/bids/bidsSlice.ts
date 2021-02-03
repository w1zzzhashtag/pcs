import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { thunkType } from '../../../app/store'
import { errorStackType } from '../../commonTypes'
import { activeFiltersType, dataType, initialStateType } from './bidsTypes'


const initialState: initialStateType = {
  data: { count: 1, vendorBidListDTO: [] },
  isLoaded: true,
  tableHeadings: [
    { title: 'Номер', width: 6 },
    { title: 'Товар', width: 14 },
    { title: 'Заказчик', width: 13 },
    { title: 'Адрес  поставки', width: 14 },
    { title: 'Контактное лицо', width: 14 },
    { title: 'Доп. требования', width: 13 },
    { title: 'Кол-во', width: 6.5 },
    { title: 'Стоимость', width: 8.5 },
    { title: 'Дата', width: 11 },
  ],
  filters: [
    { name: 'Новые', value: 'VendorBidPage' },
    { name: 'Отработанные', value: 'VendorBidPage1' },
  ],
  activeFilter: 'VendorBidPage',
  errorStack: undefined
}

const bidsSlice = createSlice({
  name: 'bids',
  initialState,
  reducers: {
    setActiveFilter: (state, action: PayloadAction<activeFiltersType>) => {
      state.activeFilter = action.payload
    },
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
  setActiveFilter,
  setData,
  setClearData,
  setLoaded,
  setErrorStack
} = bidsSlice.actions
export default bidsSlice.reducer


export const fetchBidsData = (pageNumber: number): thunkType => (dispatch, getState) => {
  const { region, authentication, bids } = getState()
  const url = `${region.active?.features.queryLink}/${bids.activeFilter}/${pageNumber}`

  dispatch(setLoaded(false))
  dispatch(setClearData())
  axios.get<dataType>(url, {
    headers: { Authorization: authentication.access_token },
  })
    .then((res) => dispatch(setData(res.data)))
    .then(() => dispatch(setLoaded(true)))
    .catch((err: Error) => dispatch(setErrorStack(err.stack)))
}


export const sendEmail = ( id: number, message: string): thunkType => (dispatch, getState) => {
  const { region, authentication } = getState()

  const url = `${region.active?.features.queryLink}/vendorbid/sendmail?bidid=${id}&message=${message}`

  axios.post(url, {}, {
    headers: { Authorization: authentication.access_token }
  })
}