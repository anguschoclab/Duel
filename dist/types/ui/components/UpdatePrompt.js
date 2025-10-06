import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { registerSW } from 'virtual:pwa-register';
export default function UpdatePrompt() {
    const [needRefresh, setNeedRefresh] = React.useState(false);
    const [offlineReady, setOfflineReady] = React.useState(false);
    React.useEffect(() => {
        const updateSW = registerSW({
            immediate: true,
            onNeedRefresh() { setNeedRefresh(true); },
            onOfflineReady() { setOfflineReady(true); setTimeout(() => setOfflineReady(false), 2000); }
        });
    }, []);
    if (!needRefresh && !offlineReady)
        return null;
    return (_jsxs("div", { style: {
            position: 'fixed', bottom: 16, right: 16, zIndex: 50,
            background: '#12183b', border: '1px solid #28345f', borderRadius: 10,
            color: '#e6ecff', padding: '10px 12px', boxShadow: '0 10px 24px rgba(0,0,0,.32)'
        }, children: [offlineReady && _jsx("div", { children: "\u2728 Offline ready" }), needRefresh && (_jsxs("div", { style: { display: 'flex', gap: 8, alignItems: 'center' }, children: [_jsx("span", { children: "New version available" }), _jsx("button", { className: "btn-primary", onClick: () => location.reload(), children: "Reload" })] }))] }));
}
