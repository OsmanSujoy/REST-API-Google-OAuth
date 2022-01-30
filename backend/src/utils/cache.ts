import config from "config";
import logger from "./logger";
import * as redis from "redis";
async function cache() {
  const cacheUri = config.get<string>("cacheUri");

  try {
    // return createClient({ url: cacheUri });
    const client = redis.createClient({ url: cacheUri });
    client.on("connect", function () {
      return client;
    });
    client.connect();
    return client;
  } catch (error) {
    logger.error("Could not connect to cache");
    process.exit(1);
  }
}

export default cache;
