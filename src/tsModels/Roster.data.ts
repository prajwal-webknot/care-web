export interface RosterRequest {

}

interface userObj {
  name: string;
  user_id?: Number;
  id?: Number;
}
interface rosterObj {
  date: Number;
  users: userObj[];
}
export interface RosterResponse {
  data: rosterObj[];
  users_under_manager: userObj[];
}