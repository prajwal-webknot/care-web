export interface EvacuationAlertRequest {
  site_id: Number,
  reason: string;
}


export interface EvacuationAlertResponse {
  message: string;
  data: {
    failure: Number;
    success: Number;
    total: Number;
  };
}