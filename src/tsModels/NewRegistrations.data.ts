export interface NewRegistrationsRequest {

}

export interface NewRegistrationsResponse {
  data: {
    emp_data: any[];
    total_count: Number;
  };
  message: string;
}