import { errorStackType, tableFiltersType, tableHeadingsType } from "../../commonTypes"


export type initialStateType = {
  data: dataType
  isLoaded: boolean,
  tableHeadings: tableHeadingsType[],
  filters: tableFiltersType[]
  activeFilter: activeFiltersType
  errorStack: errorStackType
}

export type dataType = {
  count: number
  vendorBidListDTO: bidsType[]
}
export type bidsType = {
  id: number
  productName: string
  customerName: string
  inn: string
  kpp: string
  adress: string
  contactFio: string
  email: string
  phone: string
  note: string
  quantity: number
  totalPrice: number
  bidDateTime: string
  status: number
}

export type activeFiltersType = 'VendorBidPage' | 'VendorBid'