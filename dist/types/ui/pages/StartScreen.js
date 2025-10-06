import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { newWorld } from '../../sim/worldgen/newWorld';
import { canLoadAny, loadMostRecent } from '../../sim/persist';
import { stablesState } from '../../sim/state';
import { bus } from '../../sim/bus';
export default function StartScreen() {
    const nav = useNavigate();
    const [loading, setLoading] = React.useState(false);
    const hasSave = canLoadAny();
    const create = () => {
        setLoading(true);
        newWorld({ seed: Date.now() });
        stablesState.initialized = true;
        bus.emit();
        nav('/', { replace: true });
    };
    const load = () => {
        const id = loadMostRecent();
        if (id)
            nav('/', { replace: true });
    };
    return (_jsxs("div", { className: "page", style: { maxWidth: 720 }, children: [_jsxs("div", { className: "card tone-hero", style: { padding: '18px 18px 14px' }, children: [_jsx("h1", { className: "title", children: "Duelmasters" }), _jsx("div", { className: "sub", style: { marginTop: 6 }, children: "Forge a stable, bend the meta, and carve your legend." }), _jsxs("div", { style: { display: 'flex', gap: 10, marginTop: 14 }, children: [_jsx("button", { className: "btn-primary", onClick: create, disabled: loading, children: loading ? "Spawning World…" : "New Game" }), _jsx("button", { className: "btn", onClick: load, disabled: !hasSave, children: "Load Last" })] })] }), _jsxs("div", { className: "card", children: [_jsx("div", { className: "title", children: "How it works" }), _jsxs("ul", { children: [_jsx("li", { children: "Weekly arena bouts \u2014 skipped during tournaments." }), _jsx("li", { children: "15-day round-robin tournaments with playoffs if tied." }), _jsx("li", { children: "Rivalries, renown vs notoriety, trainers, and meta shifts." })] })] })] }));
}
