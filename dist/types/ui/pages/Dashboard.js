import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { useStore } from '../hooks/useStore';
import NewsTicker from '../components/NewsTicker';
export default function Dashboard() {
    const cal = useStore(s => s.calendar);
    const stName = useStore(s => s.playerStable?.name || 'Your Stable');
    return (_jsxs("div", { className: "page", children: [_jsxs("div", { className: "card", children: [_jsx("div", { className: "title", children: "Welcome" }), _jsxs("div", { className: "sub", children: ["Stable: ", stName] })] }), _jsx(NewsTicker, {}), _jsxs("div", { className: "card", children: [_jsx("div", { className: "title", children: "Today" }), _jsxs("div", { className: "sub", children: ["Year ", cal?.year, ", Week ", cal?.weekOfYear] })] })] }));
}
