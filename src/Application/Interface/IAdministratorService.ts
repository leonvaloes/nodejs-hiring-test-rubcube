import { AdministratorResponse } from "Application/DTO/AdministratorResponse";

export interface IAdministratorService {
  GetAdminInformation(): Promise<AdministratorResponse>;
  GetAdminInformationById(id: number): Promise<AdministratorResponse>;
}
