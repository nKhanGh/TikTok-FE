import { BrowserRouter, useRoutes } from "react-router-dom"
import { AppRoutes } from "./routes/AppRoutes"

const AppRoutesWrapper = () => {
  const routes = useRoutes(AppRoutes);
  return (
    <div>
      {routes}
    </div>
  )
}

const App = () => {
  return (
    <BrowserRouter>
      <AppRoutesWrapper />
    </BrowserRouter>
  )
}

export default App
