const subs = new Set();
export const bus = {
    subscribe(cb) { subs.add(cb); return () => subs.delete(cb); },
    emit() { for (const cb of Array.from(subs)) {
        try {
            cb();
        }
        catch { }
    } }
};
