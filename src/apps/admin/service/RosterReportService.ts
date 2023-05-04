import { EndPoints } from "../../common/store/ApiConfig.data";
import ApiService from "../../common/RootApiService";
import {
  RosterReportRequest,
  RosterReportResponse,
} from "../../../tsModels/RosterReport.data";

export class RosterReportService {
  public RosterReport(
    request: RosterReportRequest
  ): Promise<RosterReportResponse> | RosterReportResponse {
    const service: ApiService = new ApiService(EndPoints.RosterReport);
    return service.get(request);
  }
}

const authService = new RosterReportService();
export default authService;
