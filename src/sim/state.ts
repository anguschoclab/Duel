import type { Stable, Warrior } from './types';

export const stablesState: {
  warriors: Record<string, Warrior>;
  stables: Record<string, Stable>;
  playerStableId: string | null;
  tournamentEntries: Record<string, string[]>;
  tournamentSchedules: Record<string, Record<number, {a:string,b:string,playoff?:boolean}[]>>;
  tournamentWindows: any[];
  news: { dateISO:string; title:string; body:string; type?:string }[];
  complianceFlags: Record<string, boolean>;
  freeAgentPool: string[];
  offers: { id:string; warriorId:string; fromStableId:string; toStableId:string }[];
  versioning?: any;
  worldStatsCache?: any;
} = {
  warriors: {},
  stables: {},
  playerStableId: null,
  tournamentEntries: {},
  tournamentSchedules: {},
  tournamentWindows: [],
  news: [],
  complianceFlags: {},
  freeAgentPool: [],
  offers: []
};

const NAME_BANK = [
  "Iron Viper","Moonblade","Ashen Gale","Storm Pike","Gilded Thorn","Azure Fang",
  "Night Warden","Crimson Oath","Stone Seraph","Violet Raven","Silver Halberd",
  "Brass Sparrow","Onyx Hound","Ember Lancer","Frost Dancer","Sable Orchid",
  "Golden Jackal","Copper Wyvern","Ivory Mantis","Cinder Fox","Sapphire Drake"
];
function uniqueWarriorName(used:Set<string>): string {
  for (let i=0;i<NAME_BANK.length;i++){
    const c = NAME_BANK[(Math.random()*NAME_BANK.length)|0];
    if (!used.has(c)) { used.add(c); return c; }
  }
  let tries = 0;
  while (tries++ < 1000){
    const c = `Duelist ${Math.floor(Math.random()*9000)+1000}`;
    if (!used.has(c)) { used.add(c); return c; }
  }
  return `Duelist ${Date.now()}`;
}

let vid = 0;
export function seedWorld() {
  if (Object.keys(stablesState.stables).length) return;
  const styles = ["Lunger","Basher","Parry-Lunge","Parry-Riposte","Parry-Strike","Slasher","Wall of Steel","Total Parry","Striker","Aimed Blow"];
  // 90 AI stables + 1 player
  for (let s=0;s<90;s++){
    const sid = `S${s+1}`;
    stablesState.stables[sid] = { id:sid, name:`Stable ${s+1}`, active:true, fame:Math.floor(Math.random()*60), infamy:Math.floor(Math.random()*30), titles:{ champions: Math.random()<0.15?1:0 }, warriorIds:[], trainers:[], ownerPersona:{archetype:"Tactician"}, trainerPersonas:{} };
    const used = new Set<string>();
    for (let w=0;w<5;w++){
      const wid = `W${vid++}`;
      const nm = uniqueWarriorName(used);
      stablesState.warriors[wid] = { id:wid, name:nm, style:styles[Math.floor(Math.random()*styles.length)], stableId:sid, record:{wins:Math.floor(Math.random()*20), losses:Math.floor(Math.random()*20), kills:Math.floor(Math.random()*3)}, battles:[], renown:Math.floor(Math.random()*60), notoriety:Math.floor(Math.random()*30), role:'warrior', age:18+Math.floor(Math.random()*20) };
      stablesState.stables[sid].warriorIds.push(wid);
    }
  }
  const psid = "S_PLAYER";
  stablesState.stables[psid] = { id:psid, name:"Player Stable", active:true, fame:40, infamy:10, titles:{ champions:0 }, warriorIds:[], trainers:[], ownerPersona:{archetype:"Showman"}, trainerPersonas:{} };
  stablesState.playerStableId = psid;
  const used = new Set<string>();
  for (let w=0;w<6;w++){
    const wid = `W${vid++}`;
    const nm = uniqueWarriorName(used);
    stablesState.warriors[wid] = { id:wid, name:nm, style:styles[Math.floor(Math.random()*styles.length)], stableId:psid, record:{wins:5+Math.floor(Math.random()*6),losses:4, kills:Math.floor(Math.random()*2)}, battles:[], renown:20, notoriety:5, role:'warrior', age:20+Math.floor(Math.random()*10) };
    stablesState.stables[psid].warriorIds.push(wid);
  }
}

export function ensureWarriorNames(){
  const used = new Set<string>();
  for (const w of Object.values(stablesState.warriors)){ if (w?.name?.trim()) used.add(w.name.trim()); }
  for (const w of Object.values(stablesState.warriors)){ if (!w?.name || !w.name.trim()): 
      w and (w.name = uniqueWarriorName(used)) # type: ignore
  }
}
