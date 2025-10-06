import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { Suspense, lazy } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { useStore } from './hooks/useStore';
import { ErrorBoundary } from './components/ErrorBoundary';
import UpdatePrompt from './components/UpdatePrompt';
import InstallAppButton from './components/InstallAppButton';
const StartScreen = lazy(() => import('./pages/StartScreen'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const PeopleDirectory = lazy(() => import('./pages/PeopleDirectory'));
const ComparePage = lazy(() => import('./pages/ComparePage'));
const FightCardPage = lazy(() => import('./pages/FightCardPage'));
export default function App() {
    const initialized = useStore(s => !!s.initialized);
    const loc = useLocation();
    const nav = useNavigate();
    React.useEffect(() => {
        if (!initialized && loc.pathname !== '/start')
            nav('/start', { replace: true });
    }, [initialized, loc.pathname]);
    return (_jsxs("div", { className: "layout", children: [_jsxs("header", { className: "topbar", children: [_jsx(Link, { to: "/", className: "brand", children: "Duelmasters" }), _jsxs("nav", { className: "nav", children: [_jsx(Link, { to: "/", children: "Dashboard" }), _jsx(Link, { to: "/people", children: "People" }), _jsx(Link, { to: "/compare", children: "Compare" }), _jsx(InstallAppButton, {})] })] }), _jsx("main", { className: "content", children: _jsx(ErrorBoundary, { children: _jsx(Suspense, { fallback: _jsx("div", { className: "card", children: _jsx("div", { className: "sub", children: "Loading\u2026" }) }), children: _jsxs(Routes, { children: [_jsx(Route, { path: "/start", element: _jsx(StartScreen, {}) }), _jsx(Route, { path: "/", element: _jsx(Dashboard, {}) }), _jsx(Route, { path: "/people", element: _jsx(PeopleDirectory, {}) }), _jsx(Route, { path: "/compare", element: _jsx(ComparePage, {}) }), _jsx(Route, { path: "/fight/:id", element: _jsx(FightCardPage, {}) }), _jsx(Route, { path: "*", element: _jsx(StartScreen, {}) })] }) }) }) }), _jsx(UpdatePrompt, {})] }));
}
