import { DynamicQueryPath } from "../apps/common/store/ApiConfig.data";

export interface GetFteGuidelinesRequest {
}
export interface GetFteGuidelinesResponse {
  data: {
    guidelines: string,
    id: Number;
    is_active: boolean;
    percentage_allowed: string;
    site: Number;
  };
}
export interface SetFteGuidelinesRequest {
  path: DynamicQueryPath;
  payload: {};
}export interface SetFteGuidelinesResponse {

}