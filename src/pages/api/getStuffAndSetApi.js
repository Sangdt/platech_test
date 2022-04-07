import { serialize } from 'cookie'


export default function handler(request, response) {
    response.setHeader("access-control-allow-origin", "https://test-arr.vercel.app");
    response.setHeader("access-control-expose-headers", "Set-Cookie");
    response.setHeader("Access-Control-Allow-Credentials", "true");
    // functions.logger.info("Hello logs!", { structuredData: true });
    response.setHeader('Set-Cookie', serialize("TEST_COOKIE", "Success", { httpOnly: true, secure: true, sameSite: "none" }));
    response.end("Hello from getStuffAndSetApi!");
}