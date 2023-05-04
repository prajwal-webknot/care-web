export interface ChangePasswordRequest {
  old_password: string,
  new_password: string;
  refresh: string | null;
}


export interface ChangePasswordResponse {
  message: string;
  data: {
    token: string;
  };
}
