import { errorStackType, tableFiltersType, tableHeadingsType } from "../../commonTypes"


export type initialStateType = {
  data: dataType
  tableHeadings: tableHeadingsType[]
  isLoaded: boolean
  filters: tableFiltersType[]
  activeFilter: activeFiltersType
  errorStack: errorStackType
}
export type dataType = {
  count: number
  productsDTO: productsType[] 
}

export type productsType = {
  id: number
  registrationNumber: string
  name: string
  catalogName: string
  okpdCode: string
  price: number
  // status
  // changeDate
  createDate: string
  isQualityMark: boolean
}


export type activeFiltersType = 'all' | 'new' | 'approved' | 'moderation' | 'cancel'