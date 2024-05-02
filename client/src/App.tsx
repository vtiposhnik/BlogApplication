import { Route, Routes } from "react-router-dom"
import About from "./pages/About"
import Dashboard from "./pages/Dashboard"
import Home from "./pages/Home"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Header from "./components/Header"

function App() {
  return (
    <section>
      <Header/>
      <Routes>
        <Route path='' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
      </Routes>
    </section>
  )
}

export default App
