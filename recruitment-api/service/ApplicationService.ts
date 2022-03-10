import { Service } from "https://deno.land/x/knight@2.2.0/mod.ts";
import Application from "../model/Application.ts";
import ApplicationRepository from "../repository/ApplicationRepository.ts";
import LoggingService from "../service/LoggingService.ts";

/**
 * Application service class.
 */
export default Service(
  class ApplicationService {
    static log = LoggingService.instance().logger;
    applicationRepository: ApplicationRepository;
    constructor() {
      this.applicationRepository = ApplicationRepository.getInstance();
    }

    /**
     * Retrieves all applications
     * @returns All Applications
     */
    async getAll(): Promise<Application[] | undefined> {
      return await this.applicationRepository.db.useTransaction<Application[]>(
        "transaction_applications_get",
        async (t) => await this.applicationRepository.getAll(t),
      );
    }
  },
);
