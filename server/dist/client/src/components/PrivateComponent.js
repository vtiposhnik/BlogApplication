import { jsx as _jsx } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import { Outlet, Navigate } from 'react-router-dom';
export default function PrivateComponent() {
    const { currentUser } = useSelector((state) => state.user);
    return currentUser ? _jsx(Outlet, {}) : _jsx(Navigate, { to: '/sign-in' });
}
