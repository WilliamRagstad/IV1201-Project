import { Service } from "https://deno.land/x/knight@2.2.1/mod.ts";
import Application from "../model/Application.ts";
import ApplicationRepository from "../repository/ApplicationRepository.ts";
import LoggingService from "../service/LoggingService.ts";

/**
 * Application service class.
 */
export default Service(
  class ApplicationService {
    private log = LoggingService.instance().logger;
    applicationRepository: ApplicationRepository;
    constructor() {
      this.applicationRepository = ApplicationRepository.getInstance();
    }

    /**
     * Retrieves all applications
     * @returns All Applications
     */
    async getAll(): Promise<Application[] | undefined> {
      this.log.debug("Get all applications transaction started");
      const applications = await this.applicationRepository.db.useTransaction<Application[]>(
        "transaction_applications_get",
        async (t) => await this.applicationRepository.getAll(t),
      );
      if (applications) {
        this.log.debug(`Get all applications transaction finished. Found ${applications.length} applications`);
      } else {
        this.log.error("Get all applications transaction failed");
      }
      return applications;
    }

	/**
	 * Retrieves an application by id
	 * @param id Application id
	 * @returns Application with the given id
	 */
	async getById(id: string): Promise<Application | undefined> {
	  this.log.debug(`Get application transaction started for id: ${id}`);
	  const application = await this.applicationRepository.db.useTransaction<Application>(
		"transaction_application_by_id_get",
		async (t) => await this.applicationRepository.findById(id, t),
	  );
	  if (application) {
		this.log.debug(`Get application transaction finished for id: ${id}`);
	  } else {
		this.log.error(`Get application transaction failed for id: ${id}`);
	  }
	  return application;
	}
  },
);
