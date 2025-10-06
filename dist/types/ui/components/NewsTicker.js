import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { useStore } from '../hooks/useStore';
export default function NewsTicker() {
    const news = useStore(s => s.news || []);
    const raw = news.slice(-20).reverse();
    const seen = new Set();
    const items = raw.filter(it => {
        const fid = (it.payload && it.payload.fightId) || it.fightId;
        if (!fid)
            return true;
        if (seen.has(fid))
            return false;
        seen.add(fid);
        return true;
    }).slice(0, 8);
    return (_jsxs("div", { className: "card", children: [_jsx("div", { className: "title", children: "News" }), _jsx("div", { className: "sub", children: items.length ? "" : "No news yet." }), _jsx("div", { className: "ticker", style: { display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 6 }, children: items.map(it => _jsx("span", { className: "btn-ghost", children: it.title }, it.id)) })] }));
}
