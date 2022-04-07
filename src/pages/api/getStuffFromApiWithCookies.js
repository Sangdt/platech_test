// import { serialize } from 'cookie'
import Cookies from 'cookies'
import pino from 'pino'


const logger = pino();

export default function handler(request, response) {
    response.setHeader("access-control-allow-origin", "https://test-arr.vercel.app");
    response.setHeader("access-control-expose-headers", "Set-Cookie");
    response.setHeader("Access-Control-Allow-Credentials", "true");
    const cookies = new Cookies(request, response)
    let testCookies = cookies.get('TEST_COOKIE');
    if (!testCookies || testCookies === '') {
         response.end("no cookies");
         return;
    }
    logger.info({ user: { name: "Body messages", testCookies: testCookies }, event: { type: "request", tag: "api" } })
    // functions.logger.info("Hello logs!", { structuredData: true });
    response.end(testCookies);
}