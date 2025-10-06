import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List } from 'react-window';
import { useStore } from '../hooks/useStore';
export default function PeopleDirectory() {
    const rows = useStore(s => Object.values(s.warriors || {}).map((w) => ({ id: w.id, name: w.displayName || w.name, style: w.style, rep: (typeof w.reputationScore === 'number' ? w.reputationScore : 0) })));
    const Row = ({ index, style, data }) => {
        const r = data.rows[index];
        return (_jsxs("div", { style: style, className: "tr tone-lite", children: [_jsx("div", { className: "td", children: r.name }), _jsx("div", { className: "td", children: r.style }), _jsx("div", { className: "td", children: r.rep > 0 ? "Renowned" : r.rep < 0 ? "Notorious" : "Balanced" })] }));
    };
    return (_jsxs("div", { className: "page", children: [_jsx("div", { className: "page-header", children: _jsx("div", { className: "title", children: "People Directory" }) }), _jsx("div", { className: "card", children: _jsxs("div", { className: "table", children: [_jsxs("div", { className: "thead tr", children: [_jsx("div", { className: "th", children: "Warrior" }), _jsx("div", { className: "th", children: "Class" }), _jsx("div", { className: "th", children: "Reputation" })] }), _jsx("div", { style: { height: 420 }, children: _jsx(AutoSizer, { children: ({ height, width }) => (_jsx(List, { height: height, width: width, itemCount: rows.length, itemSize: 40, itemData: { rows }, itemKey: (i, d) => d.rows[i].id, children: Row })) }) })] }) })] }));
}
