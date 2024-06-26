import { Route, Routes } from "react-router-dom"
import About from "./pages/About"
import Dashboard from "./pages/Dashboard"
import Home from "./pages/Home"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Header from "./components/Header"
import FooterCom from './components/Footer'
import PrivateComponent from "./components/PrivateComponent"
import Posts from "./pages/Posts"
import PostPage from "./pages/PostPage"

function App() {
  return (
    <section>
      <Header />
      <Routes>
        <Route path='' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/posts' element={<Posts />} />
        <Route path='/posts/:postSlug' element={<PostPage />} />
        <Route element={<PrivateComponent />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
      </Routes>
      <FooterCom />
    </section>
  )
}

export default App
