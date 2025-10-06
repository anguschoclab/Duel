import { Stable, Warrior } from './types';

export const stablesState: {
  warriors: Record<string, Warrior>;
  stables: Record<string, Stable>;
  playerStableId: string | null;
  tournamentEntries?: Record<string, string[]>;
  tournamentSchedules?: Record<string, Record<number, {a:string,b:string,playoff?:boolean}[]>>;
  tournamentWindows?: any[];
  news?: { dateISO:string; title:string; body:string; type?:string }[];
  complianceFlags?: Record<string, boolean>;
} = {
  warriors: {},
  stables: {},
  playerStableId: null,
  tournamentEntries: {},
  tournamentSchedules: {},
  tournamentWindows: [],
  news: [],
  complianceFlags: {}
};

let vid = 0;
export function seedWorld() {
  if (Object.keys(stablesState.stables).length) return;
  // Create 80 AI stables + 1 player
  const styles = ["Lunger","Basher","Parry-Lunge","Parry-Riposte","Parry-Strike","Slasher","Wall of Steel","Total Parry","Striker","Aimed Blow"];
  for (let s=0;s<80;s++){
    const sid = `S${s+1}`;
    stablesState.stables[sid] = { id:sid, name:`Stable ${s+1}`, active:true, fame:Math.floor(Math.random()*60), infamy:Math.floor(Math.random()*30), titles:{ champions: Math.random()<0.2?1:0 }, warriorIds:[], trainers:[], ownerPersona:{archetype:"Tactician"}, trainerPersonas:{} };
    for (let w=0;w<5;w++){
      const wid = `W${vid++}`;
      stablesState.warriors[wid] = { id:wid, name:`Warrior ${wid}`, style:styles[Math.floor(Math.random()*styles.length)], stableId:sid, record:{wins:Math.floor(Math.random()*20), losses:Math.floor(Math.random()*20), kills:Math.floor(Math.random()*3)}, battles:[], renown:Math.floor(Math.random()*60), notoriety:Math.floor(Math.random()*30), role:'warrior', age:18+Math.floor(Math.random()*20) };
      stablesState.stables[sid].warriorIds.push(wid);
    }
  }
  const psid = "S_PLAYER";
  stablesState.stables[psid] = { id:psid, name:"Player Stable", active:true, fame:40, infamy:10, titles:{ champions:0 }, warriorIds:[], trainers:[], ownerPersona:{archetype:"Showman"}, trainerPersonas:{} };
  stablesState.playerStableId = psid;
  for (let w=0;w<5;w++){
    const wid = `W${vid++}`;
    stablesState.warriors[wid] = { id:wid, name:`PlayerWar ${w+1}`, style:styles[Math.floor(Math.random()*styles.length)], stableId:psid, record:{wins:5,losses:4,kills:0}, battles:[], renown:20, notoriety:5, role:'warrior', age:20+Math.floor(Math.random()*10) };
    stablesState.stables[psid].warriorIds.push(wid);
  }
}