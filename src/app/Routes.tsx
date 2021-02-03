import React, { Suspense, lazy } from 'react'
import { Switch, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { LoaderSuspense } from '../components'

const MainPG = lazy(() => import('../pages/MainPG/MainPG'))
const ManufacturersPG = lazy(() => import('../pages/ManufacturersPG/ManufacturersPG'))
const ManufacturerCurrentPG = lazy(() => import('../pages/ManufacturerCurrentPG/ManufacturerCurrentPG'))
const CatalogGroupPG = lazy(() => import('../pages/CatalogGroupPG/CatalogGroupPG'))
const CatalogGroupProductsPG = lazy(() => import('../pages/CatalogGroupProductsPG/CatalogGroupProductsPG'))
const KareliaGroupPG = lazy(() => import('../pages/KareliaGroupPG/KareliaGroupPG'))
const KareliaGroupProductsPG = lazy(() => import('../pages/KareliaGroupProductsPG/KareliaGroupProductsPG'))
const ProductCurrentPG = lazy(() => import('../pages/ProductCurrentPG/ProductCurrentPG'))
const FsinPG = lazy(() => import('../pages/FsinPG/FsinPG'))
const SearchPG = lazy(() => import('../pages/SearchPG/SearchPG'))
const AuthenticationPG = lazy(() => import('../pages/AuthenticationPG/AuthenticationPG'))
const RegistrationPG = lazy(() => import('../pages/RegistrationPG/RegistrationPG'))
const NotFoundPG = lazy(() => import('../pages/NotFoundPG/NotFoundPG'))
const PersonMainPG = lazy(() => import('./../pages/person/main/MainPG'))
const PersonProfilePG = lazy(() => import('../pages/person/profile/ProfilePG'))
const PersonCatalogPG = lazy(() => import('../pages/person/catalog/CatalogPG'))
const PersonCatalogProductPG = lazy(() => import('../pages/person/catalogProduct/CatalogProductPG'))
const PersonCreateProductPG = lazy(() => import('../pages/person/createProduct/CreateProductPG'))
const PersonOffersPG = lazy(() => import('../pages/person/offers/OffersPG'))
const PersonBidsPG = lazy(() => import('../pages/person/bids/BidsPG'))
const PersonShowcasePG = lazy(() => import('../pages/person/showcase/ShowcasePG'))

const Routes = () => {
  const location = useLocation()
  return (
    <Suspense fallback={<LoaderSuspense />}>
      <AnimatePresence exitBeforeEnter >
        <Switch location={location} key={location.key}>
          <Route
            path="/" exact component={MainPG} />
          <Route
            path="/catalog-group/:id" exact component={CatalogGroupPG} />
          <Route
            path="/catalog-group/:id/:okpd" exact component={CatalogGroupProductsPG} />
          <Route
            path="/product/:productId" exact component={ProductCurrentPG} />
          <Route
            path="/manufacturers" exact component={ManufacturersPG} />
          <Route
            path="/manufacturers/:id" exact component={ManufacturerCurrentPG} />
          <Route
            path="/fsin" exact component={FsinPG} />
          <Route
            path="/search" exact component={SearchPG} />
          <Route
            path="/search/:query" exact component={SearchPG} />
          <Route
            path="/authentication" exact component={AuthenticationPG} />
          <Route
            path="/registration" exact component={RegistrationPG} />


          {/* Только для Карелии */}
          <Route
            path="/made-in-karelia" exact component={KareliaGroupPG} />
          <Route
            path="/made-in-karelia/:okpd" exact component={KareliaGroupProductsPG} />


          {/* Личный кабинет */}
          <Route
            path="/person" exact component={PersonMainPG} />
          <Route
            path="/person/profile" exact component={PersonProfilePG} />
          <Route
            path="/person/catalog" exact component={PersonCatalogPG} />
          <Route
            path="/person/catalog/product/:id" exact component={PersonCatalogProductPG} />
          <Route
            path="/person/catalog/product" exact component={PersonCreateProductPG} />
          <Route
            path="/person/offers" exact component={PersonOffersPG} />
          <Route
            path="/person/bids" exact component={PersonBidsPG} />
          <Route
            path="/person/showcase" exact component={PersonShowcasePG} />

          {/* Если ничего не найдено, тогда 404 */}
          <Route component={NotFoundPG} />
        </Switch>
      </AnimatePresence>
    </Suspense>
  )
}

export default Routes
