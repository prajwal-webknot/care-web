import { LOGGING } from '../constants/constants';

/**
 * Logging - Route all the logs through this class. It will help to evolve
 * Logs usage when required later on.
 */
export class Logging {
  public static error(message: string, ...optionalParams: any[]) {
    if (LOGGING) {
      if (optionalParams && optionalParams.length > 0) {
        console.error(message, optionalParams);
      } else {
        console.error(message);
      }
    }

  }

  public static debug(message: string, ...optionalParams: any[]) {
    if (LOGGING) {
      if (optionalParams && optionalParams.length > 0) {
      console.log(message, optionalParams);
    } else {
      console.log(message);
    }
  }
}

  public static warn(message?: string, ...optionalParams: any[]) {
    if (LOGGING) {
      if (optionalParams && optionalParams.length > 0) {
      console.warn(message, optionalParams);
    } else {
      console.warn(message);
    }
  }
}
}
