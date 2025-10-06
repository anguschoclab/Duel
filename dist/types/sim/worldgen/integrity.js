export function ensureSystemsIntegrity(state) {
    state.stables || (state.stables = {});
    state.warriors || (state.warriors = {});
    state.trainers || (state.trainers = {});
    state.fights || (state.fights = {});
    state.news || (state.news = []);
    state.calendar || (state.calendar = { year: 1, weekOfYear: 1, dayOfYear: 1, dayOfTournament: 0 });
    for (const s of Object.values(state.stables)) {
        const ss = s;
        if (ss && !ss.name)
            ss.name = "Stable " + Math.floor(Math.random() * 1000);
    }
    for (const w of Object.values(state.warriors)) {
        const ww = w;
        if (ww && !ww.name)
            ww.name = "Warrior " + Math.floor(Math.random() * 1000);
    }
}
