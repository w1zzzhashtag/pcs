import { errorStackType } from "../commonTypes"


export type productCurrentType = {
  data: dataType | null,
  isLoaded: boolean
  errorStack: errorStackType
}
export type dataType = {
  groupCode: string
  groupName: string
  subGroupCode: string
  subGroupName: string
  name: string
  okpd2Code: string
  ktruInfo: string
  price: number
  okeiName: string
  organizationId: number
  attachment: any[]
  images: dataImagesType[] | null
  productSpecificationDTO: dataSpecificationType[]
}
export type dataImagesType = {
  id: number
  url: string
  index: string
}
export type dataSpecificationType = {
  id:number
  name: string
  value: string
  unit: string
}



export type reqValuesType = {
  quantity: string
  customerName: string
  adress: string
  inn: string
  kpp: string
  contactFio: string
  phone: string
  email: string
  [item: string]: string
}

export type notReqValuesType = {
  note: string
}

export type errorsType = {
  [item: string]: boolean
}

export type sendBidValuesType = {
  quantity: string
  customerName: string
  adress: string
  inn: string
  kpp: string
  contactFio: string
  phone: string
  email: string
  note: string
  vendorId: number
  productId: number
}