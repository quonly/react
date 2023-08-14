import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { Suspense, lazy } from "react"

import { CitiesProvider } from "./contexts/CitiesContext"
import { AuthProvider } from "./contexts/FakeAuthContext"
import ProtectedRoute from "./pages/ProtectedRoute"

import CityList from "./components/CityList"
import City from "./components/City"
import Form from "./components/Form"
import CountryList from "./components/CountryList"
import SpinnerFullPage from "./components/SpinnerFullPage"

// import Product from "./pages/Product"
// import Pricing from "./pages/Pricing"
// import Homepage from "./pages/Homepage"
// import PageNotFound from "./pages/PageNotFound"
// import AppLayout from "./pages/AppLayout"
// import Login from "./pages/Login"

const Homepage = lazy(() => import("./pages/Homepage"))
const Product = lazy(() => import("./pages/Product"))
const Pricing = lazy(() => import("./pages/Pricing"))
const Login = lazy(() => import("./pages/Login"))
const PageNotFound = lazy(() => import("./pages/PageNotFound"))
const AppLayout = lazy(() => import("./pages/AppLayout"))

// import PageNav from "./components/PageNav"

function App() {
  return (
    <div>
      <AuthProvider>
        <CitiesProvider>
          <BrowserRouter>
            <Suspense fallback={<SpinnerFullPage />}>
              <Routes>
                <Route index element={<Homepage />} />
                <Route path="product" element={<Product />} />
                <Route path="pricing" element={<Pricing />} />
                <Route path="login" element={<Login />} />
                <Route
                  path="app"
                  element={
                    <ProtectedRoute>
                      <AppLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Navigate to="cities" replace />} /> //
                  replace is used to replace the current url with the new one
                  <Route path="cities" element={<CityList />} />
                  <Route path="cities/:id" element={<City />} />
                  <Route path="countries" element={<CountryList />} />
                  <Route path="form" element={<Form />} />
                </Route>
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </CitiesProvider>
      </AuthProvider>
    </div>
  )
}

export default App
