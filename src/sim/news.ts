import { stablesState } from './state';
export function publishNews(title:string, body:string, type?:string){
  stablesState.news.unshift({ dateISO:new Date().toISOString(), title, body, type });
}
export function publishTournamentNews(msg:{type:string, division:string, body:string}){
  publishNews(`[${msg.division}] ${msg.type}`, msg.body, 'tournament');
}
