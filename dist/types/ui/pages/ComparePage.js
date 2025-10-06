import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useMemo, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useStore } from '../hooks/useStore';
const glyph = (h) => h?.result?.kill ? "K" : h?.result?.method === "exhaustion" ? "E" : h?.result?.win ? "W" : "L";
const last5 = (w) => (w?.history || []).slice(-5).map(glyph).join(" ");
export default function ComparePage() {
    const [sp] = useSearchParams();
    const [left, setLeft] = useState(sp.get('left') || '');
    const [right, setRight] = useState(sp.get('right') || '');
    const warriors = useStore(s => s.warriors || {});
    const fights = useStore(s => s.fights || {});
    const L = left ? warriors[left] : null;
    const R = right ? warriors[right] : null;
    const valid = L && R && L.id !== R.id;
    const h2h = useMemo(() => {
        if (!valid)
            return { lWins: 0, rWins: 0, lPO: 0, rPO: 0 };
        const fix = (m) => {
            if (!m.opponentId && m.id && fights[m.id]) {
                m.opponentId = fights[m.id].warriorAId === L.id ? fights[m.id].warriorBId : fights[m.id].warriorAId;
            }
            return m;
        };
        const lh = (L.history || []).map(fix).filter((h) => h.opponentId === R.id);
        let lWins = 0, rWins = 0, lPO = 0, rPO = 0;
        lh.forEach((m) => { if (m.result?.win) {
            lWins++;
            if (m.result?.playoff)
                lPO++;
        }
        else {
            rWins++;
            if (m.result?.playoff)
                rPO++;
        } });
        return { lWins, rWins, lPO, rPO };
    }, [valid, L, R, fights]);
    return (_jsxs("div", { className: "page", children: [_jsxs("div", { className: "page-header", children: [_jsx("div", { className: "title", children: "Compare Warriors" }), _jsxs("div", { className: "sub", children: [_jsx(Link, { to: "/people", children: "People" }), " \u00B7 Compare"] })] }), _jsx("div", { className: "card", children: _jsxs("div", { className: "row", style: { gap: 8 }, children: [_jsxs("select", { className: "select", value: left, onChange: e => setLeft(e.target.value), children: [_jsx("option", { value: "", disabled: true, children: "Pick left\u2026" }), Object.values(warriors).map((w) => _jsxs("option", { value: w.id, children: [w.displayName || w.name, " \u00B7 ", w.style] }, w.id))] }), _jsx("span", { className: "sub", children: "vs" }), _jsxs("select", { className: "select", value: right, onChange: e => setRight(e.target.value), children: [_jsx("option", { value: "", disabled: true, children: "Pick right\u2026" }), Object.values(warriors).map((w) => _jsxs("option", { value: w.id, children: [w.displayName || w.name, " \u00B7 ", w.style] }, w.id))] })] }) }), valid ? (_jsxs("div", { className: "compare-sheet", style: { marginTop: 12, display: 'grid', gridTemplateColumns: '1fr 24px 1fr', gap: '12px' }, children: [_jsxs("div", { className: "compare-col tone-lite card", children: [_jsxs("div", { className: "title", children: [L.displayName || L.name, " ", _jsxs("span", { className: "sub", children: ["\u00B7 ", L.style] })] }), _jsxs("div", { children: ["Form: ", _jsx("span", { className: "sub", children: last5(L) || "—" })] })] }), _jsx("div", { className: "vs-spine", style: { display: 'flex', alignItems: 'center', justifyContent: 'center' }, children: "VS" }), _jsxs("div", { className: "compare-col tone-lite card", children: [_jsxs("div", { className: "title", children: [R.displayName || R.name, " ", _jsxs("span", { className: "sub", children: ["\u00B7 ", R.style] })] }), _jsxs("div", { children: ["Form: ", _jsx("span", { className: "sub", children: last5(R) || "—" })] })] }), _jsxs("div", { className: "card", style: { gridColumn: '1 / span 3' }, children: [_jsx("div", { className: "title", children: "Head-to-Head" }), _jsxs("div", { className: "sub", children: ["Record: ", h2h.lWins, ":", h2h.rWins, (h2h.lPO || h2h.rPO) ? ` (incl. playoffs ${h2h.lPO}:${h2h.rPO})` : ""] })] })] })) : (_jsx("div", { className: "card", children: _jsx("div", { className: "sub", children: "Pick two different warriors to compare." }) }))] }));
}
