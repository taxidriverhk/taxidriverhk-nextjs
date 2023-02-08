import pino from "pino";

const logger = pino({}, pino.multistream([
  {
    stream: process.stdout,
  },
]));

export default logger;
