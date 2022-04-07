import rateLimit from 'express-rate-limit'

const ContactFormApiLimiter = (customMess) => {
    return rateLimit({
            windowMs: 60000, // 1 minutes
            max: 100,
            message: customMess ? customMess :
                "Too many submitted created from this IP, please try again after an hour"
        })
    
}
const getTagInfoApiLimiter = (customMess) => rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour window
    max: 500,
    message: customMess ? customMess : "Too many request created from this IP, please try again after an hour"
});
export {
    ContactFormApiLimiter,
    getTagInfoApiLimiter
}