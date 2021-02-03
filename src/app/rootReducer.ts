import { combineReducers } from '@reduxjs/toolkit'
import regionReducer from './../featurers/region/regionSlice'
import fsinReducer from './../featurers/fsin/fsinSlice'
import catalogGroupReducer from './../featurers/catalogGroup/catalogGroupSlice'
import kareliaGroupReducer from './../featurers/kareliaGroup/kareliaGroupSlice'
import catalogGroupProductsReducer from './../featurers/catalogGroupProducts/catalogGroupProductsSlice'
import kareliaGroupProductsReducer from './../featurers/kareliaGroupProducts/kareliaGroupProductsSlice'
import productCurrentReducer from './../featurers/productCurrent/productCurrentSlice'
import actualOffersReducer from './../featurers/actualOffers/actualOffersSlice'
import topManufacturersReducer from './../featurers/topManufacturers/topManufacturersSlice'
import popularProductsReducer from './../featurers/popularProducts/popularProductsSlice'
import catalogListReducer from './../featurers/catalogList/catalogListSlice'
import manufacturersReducer from './../featurers/manufacturer/manufacturerSlice'
import manufacturerCurrentReducer from './../featurers/manufacturerCurrent/manufacturerCurrentSlice'
import searchProductsReducer from './../featurers/searchProducts/searchProductsSlice'
import searchGlobalReducer from './../featurers/searchGlobal/searchGlobalSlice'
import registrationReducer from './../featurers/registartion/registrationSlice'
import authenticationReducer from './../featurers/authentication/authenticationSlice'
import okpdReducer from '../featurers/okpd/okpdSlice'
import personProfileReducer from './../featurers/person/profile/profileSlice'
import personCatalogReducer from '../featurers/person/catalog/catalogSlice'
import personCatalogProductReducer from '../featurers/person/catalogProduct/catalogProductSlice'
import bidsReducer from '../featurers/person/bids/bidsSlice'
import alertReducer from '../featurers/alert/alertSlice'

const rootReducer = combineReducers({
  region: regionReducer,
  fsin: fsinReducer,
  catalogGroup: catalogGroupReducer,
  kareliaGroup: kareliaGroupReducer,
  catalogGroupProducts: catalogGroupProductsReducer,
  kareliaGroupProducts: kareliaGroupProductsReducer,
  productCurrent: productCurrentReducer,
  actualOffers: actualOffersReducer,
  topManufacturers: topManufacturersReducer,
  popularProducts: popularProductsReducer,
  catalogList: catalogListReducer,
  manufacturers: manufacturersReducer,
  manufacturerCurrent: manufacturerCurrentReducer,
  searchProducts: searchProductsReducer,
  searchGlobal: searchGlobalReducer,
  registration: registrationReducer,
  authentication: authenticationReducer,
  personProfile: personProfileReducer,
  personCatalog: personCatalogReducer,
  personCatalogProduct: personCatalogProductReducer,
  okpd: okpdReducer,
  bids: bidsReducer,
  alert: alertReducer,
})


export type RootStoreType = ReturnType<typeof rootReducer>

export default rootReducer