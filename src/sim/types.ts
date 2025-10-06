export type WarriorId = string;
export type StableId = string;

export type Warrior = {
  id: WarriorId;
  name: string;
  style: string;
  stableId: StableId | null;
  record: { wins:number; losses:number; kills?:number };
  battles: Battle[];
  renown?: number;
  notoriety?: number;
  retired?: boolean;
  dead?: boolean;
  withdrawn?: boolean;
  freeAgent?: boolean;
  role?: 'warrior'|'trainer'|'owner';
  age?: number;
};

export type Battle = {
  dateISO: string;
  opponentId?: WarriorId;
  outcome: 'W'|'L';
  method?: 'KO'|'Kill'|'WO'|'Dec';
  tournament?: boolean;
  division?: string;
  day?: number;
};

export type Stable = {
  id: StableId;
  name: string;
  active: boolean;
  fame?: number;
  infamy?: number;
  titles?: { champions?: number };
  warriorIds: WarriorId[];
  trainers?: WarriorId[];
  ownerPersona?: { archetype:string };
  trainerPersonas?: Record<WarriorId, { archetype:string }>;
};

export type TournamentWindows = Array<{ division:string; opensISO:string; locksISO:string; tournamentStartISO:string; locked:boolean }>;
