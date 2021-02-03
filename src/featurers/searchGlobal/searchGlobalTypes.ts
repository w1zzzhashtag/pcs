import { groupProductsTovarsType } from './../commonTypes'
import { manufacturerDataType } from './../manufacturerCurrent/manufacturerCurrentTypes'

export type searchGlobalType = {
    data: searchGlobalDataType,
    isLoaded: boolean
    error: null | string
    modalIsOpen: boolean
    savedQueries: searchGlobalDataType
}

export type searchGlobalDataType = {
    globalSearchProductsDTO: groupProductsTovarsType[],
    globalSearchOrganizationsDTO: manufacturerDataType[]
}

export type savedQueriesPayload = {
    item: savedQueriesPayloadItem
    name: savedQueriesPayloadName
}
export type savedQueriesPayloadItem = groupProductsTovarsType | manufacturerDataType 
export type savedQueriesPayloadName = 'products' | 'organizations' 

