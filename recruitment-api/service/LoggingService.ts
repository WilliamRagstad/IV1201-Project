import {
  ConsoleSink,
  FileSink,
  Logger,
  LoggingLevel,
  Service,
} from "https://deno.land/x/knight@2.2.1/mod.ts";

export default Service(
  class LoggingService {
    public logger: Logger;
    constructor() {
      this.logger = new Logger()
        .attach(new ConsoleSink())
        .attach(
          new FileSink("./recruitment-api/logs/log.txt").fromRange(
            // Log everything from the warning level and above to a file
            LoggingLevel.Warning,
          ),
        );
    }
  },
);
