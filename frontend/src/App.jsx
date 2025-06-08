import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import MainLayout from "./layout/main-layout"
import LoginPage from "./pages/login-page"
import PresentationsPage from "./pages/presentations-page"
import PresentationEditPage from "./pages/presentation-edit-page"
import PresentFullscreen from "./pages/present-fullscreen"
import EditSlide from "./components/edit/edit-slide"

function App() {
  const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout/>}>
        <Route index element={<LoginPage/>}/>
        <Route path="presentations" element={<PresentationsPage/>}/>
        <Route path="presentations/:id/" element={<PresentationEditPage/>}>
          <Route path=":slideId" element={<EditSlide/>}/>
        </Route>
        <Route path="presentations/:id/present" element={<PresentFullscreen/>}/>
      </Route>
    )
  )
  return (
    <>
      <RouterProvider router={routes}/>
    </>
  )
}

export default App