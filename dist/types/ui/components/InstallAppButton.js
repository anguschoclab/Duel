import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
export default function InstallAppButton() {
    const [deferred, setDeferred] = React.useState(null);
    const [visible, setVisible] = React.useState(false);
    React.useEffect(() => {
        const handler = (e) => {
            e.preventDefault();
            setDeferred(e);
            setVisible(true);
        };
        window.addEventListener('beforeinstallprompt', handler);
        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);
    if (!visible)
        return null;
    const onInstall = async () => {
        if (!deferred)
            return;
        deferred.prompt();
        const choice = await deferred.userChoice;
        setVisible(false);
        setDeferred(null);
        console.log('PWA install choice', choice);
    };
    return (_jsx("button", { className: "btn-ghost", onClick: onInstall, title: "Install app", children: "Install App" }));
}
