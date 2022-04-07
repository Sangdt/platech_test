import pino from 'pino'


const logger = pino();
export default function handler(request, response) {
    logger.info({ user: { name: "Body messages", data: request.body }, event: { type: "request", tag: "api" } })
    console.log("Denied body", request.body)
    // functions.logger.info("Hello logs!", { structuredData: true });
    response.end("Denied");
}