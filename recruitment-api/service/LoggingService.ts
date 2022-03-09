import {
	ConsoleSink,
	FileSink,
	Logger,
	LoggingLevel,
	Service,
  } from "https://deno.land/x/knight@2.2.0/mod.ts";

  export default Service(
	class LoggingService {
	  public logger: Logger;
	  constructor() {
		this.logger = new Logger()
		  .attach(new ConsoleSink())
		  .attach(
			new FileSink("./logs/log.txt").fromRange(
			  LoggingLevel.Success,
			),
		  );
	  }
	},
  );