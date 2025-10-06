import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
export class ErrorBoundary extends React.Component {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "state", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: { err: undefined }
        });
    }
    static getDerivedStateFromError(err) { return { err }; }
    componentDidCatch(err, info) { console.error('UI crash:', err, info); }
    render() {
        if (!this.state.err)
            return this.props.children;
        return (_jsx("div", { className: "page", children: _jsxs("div", { className: "card", children: [_jsx("h3", { className: "title", children: "Something went sideways." }), _jsx("div", { className: "sub", children: "We logged it. Try the dashboard or reload." }), _jsx("button", { className: "btn", onClick: () => this.setState({ err: undefined }), children: "Return" })] }) }));
    }
}
