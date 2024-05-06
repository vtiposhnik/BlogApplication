import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";
import FooterCom from './components/Footer';
import PrivateComponent from "./components/PrivateComponent";
import Posts from "./pages/Posts";
import PostPage from "./pages/PostPage";
function App() {
    return (_jsxs("section", { children: [_jsx(Header, {}), _jsxs(Routes, { children: [_jsx(Route, { path: '', element: _jsx(Home, {}) }), _jsx(Route, { path: '/about', element: _jsx(About, {}) }), _jsx(Route, { path: '/posts', element: _jsx(Posts, {}) }), _jsx(Route, { path: '/posts/:postSlug', element: _jsx(PostPage, {}) }), _jsx(Route, { element: _jsx(PrivateComponent, {}), children: _jsx(Route, { path: '/dashboard', element: _jsx(Dashboard, {}) }) }), _jsx(Route, { path: '/sign-in', element: _jsx(SignIn, {}) }), _jsx(Route, { path: '/sign-up', element: _jsx(SignUp, {}) })] }), _jsx(FooterCom, {})] }));
}
export default App;
