export interface AuthRequest {
  username: string;
  password: string;
}

interface groupObj {
  name: string;
}
interface UserObject {
  email: string;
  groups: groupObj[];
  id: Number;
  phone_number: string,
  user_details: any;
  user_id: Number;
  user_type: string;
  username: string,
}

export interface AuthResponse {
  data: {
    token: string,
    user_obj: UserObject;
  },
  message: string;
}
export interface LogoutRequest {
}
export interface LogoutResponse {
}
