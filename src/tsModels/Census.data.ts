import { Query } from '../apps/common/store/ApiConfig.data';
export interface CensusRequest {
}

interface CensusObj {
  // HR Census
  all_site_employees?: Number;
  all_site_expired_passes?: Number;
  all_site_high_risk?: Number;
  all_site_low_risk?: Number;
  all_site_moderate_risk?: Number;
  all_site_present_employees?: Number;
  all_site_safety_breaches?: Number;
  emergency_helpline_numbers?: [{ id: Number, name: string, description: string, numbers: string; address: object; }];
  emergency_hospitals_names?: [{ id: Number, name: string, description: string, numbers: string; address: object; }];
  employees?: Number;
  new_approvals?: Number;
  new_registrations?: Number;
  non_employees?: Number;
  safety_breaches_during_day?: Number;
  selected_site_employees?: Number;
  selected_site_expired_passes?: Number;
  selected_site_high_risk?: Number;
  selected_site_low_risk?: Number;
  selected_site_moderate_risk?: Number;
  selected_site_present_employees?: Number;
  selected_site_safety_breaches?: Number;
  // Admin Census
  bluetooth_status_off?: Number;
  bluetooth_status_on?: Number;
  current_premise_head_count?: Number;
  employee?: Number;
  expected_visiters?: Number;
  high_risk?: Number;
  low_risk?: Number;
  moderate_risk?: Number;
  passes_expired_in_current_location?: Number;
  passes_expired_last_24_hr?: Number;
  passes_expiring?: Number;
  social_distancing_breaches?: Number;
  temporary?: Number;
  // Manager Census
  approvals_count?: Number;
  team_expired_passes?: Number;
  team_high_risk?: Number;
  team_low_risk?: Number;
  team_members_present?: Number;
  team_moderate_risk?: Number;
  team_safety_breaches?: Number;
  total_site_employees?: Number;
  total_site_employees_present?: Number;
  total_site_expired_passes?: Number;
  total_site_high_risk?: Number;
  total_site_low_risk?: Number;
  total_site_moderate_risk?: Number;
  total_site_safety_breaches?: Number;
  total_team_members?: Number;
}
export interface CensusResponse {
  data: CensusObj;
}