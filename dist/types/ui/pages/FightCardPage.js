import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from '../hooks/useStore';
const DEFAULT_LINES = 200;
export default function FightCardPage() {
    const { id } = useParams();
    const fight = useStore(s => s.fights?.[id]);
    const rawLog = Array.isArray(fight?.log) ? fight.log : [];
    const [expanded, setExpanded] = useState(false);
    const lines = useMemo(() => expanded ? rawLog : rawLog.slice(-DEFAULT_LINES), [rawLog, expanded]);
    if (!fight)
        return _jsx("div", { className: "page", children: _jsx("div", { className: "card", children: _jsx("div", { className: "sub", children: "Fight not found." }) }) });
    return (_jsxs("div", { className: "page", children: [_jsx("div", { className: "page-header", children: _jsx("div", { className: "title", children: "Fight Card" }) }), _jsxs("div", { className: "card fight-log", role: "region", "aria-live": "polite", children: [lines.map((l, i) => _jsx("div", { children: l }, i)), rawLog.length > DEFAULT_LINES && (_jsx("button", { className: "btn-ghost", "aria-label": "Toggle full log", onClick: () => setExpanded(e => !e), children: expanded ? "Show last 200 lines" : `Show all (${rawLog.length})` }))] })] }));
}
