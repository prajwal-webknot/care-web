import { EndPoints } from "../../common/store/ApiConfig.data";
import ApiService from "../../common/RootApiService";
import { ContactTracingRequest, ContactTracingResponse } from "../../../tsModels/ContactTracing.data";

export class ContactTracingService {
  public contactTrace(request: ContactTracingRequest): Promise<ContactTracingResponse> | ContactTracingResponse {
    const service: ApiService = new ApiService(EndPoints.ContactTracing);
    return service.get(request);
  }
}

const authService = new ContactTracingService();
export default authService;
