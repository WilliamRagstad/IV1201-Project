import Application from "../model/Application.ts";
import ApplicationRepository from "../repository/ApplicationRepository.ts";

/**
 * Application service class.
 */
export default class ApplicationService {
  private static instance: ApplicationService;
  applicationRepository: ApplicationRepository;
  constructor() {
    this.applicationRepository = ApplicationRepository.getInstance();
  }

  /**
   * Get the user service singleton instance.
   * @returns The singleton instance.
   */
  public static getInstance(): ApplicationService {
    if (!ApplicationService.instance) {
      ApplicationService.instance = new ApplicationService();
    }
    return ApplicationService.instance;
  }

  /**
   * Retrieves all applications
   * @returns All Applications
   */
  async getAll() {
    const transaction = this.applicationRepository.db.createTransaction("transaction_get");
    await transaction.begin();
    var applications: Application[] = [];
    try {
      applications = await this.applicationRepository.getAll(transaction);
      await transaction.commit();
    } catch (e: any) {
      transaction.rollback();
    }
    return applications.length > 0 ? applications : undefined;
  }
}
