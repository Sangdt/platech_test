import Airtable from "airtable";
import nc from 'next-connect';
import { check, validationResult } from 'express-validator'
// import { NextApiRequest, NextApiResponse } from "next";


// import { CreateNewFormRow } from '@/components/Api/AirTable';
import validateMiddleware from 'components/Api/validateMiddleware'
import parseUrl from 'Helper/parseUrl'
import { ContactFormApiLimiter } from 'components/Api/rateLimit';
// import base from '@/components/Api/AirTable'




const handler = nc()
    // .use(ContactFormApiLimiter())
    .use(validateMiddleware([
        check('fullName')
            .notEmpty().withMessage('fullName is required for this operation')
            .isString().withMessage('fullName need to be a string'),
        check('phoneNumber')
            .notEmpty().withMessage('phoneNumber is required for this operation')
            .isMobilePhone('any').withMessage('phoneNumber need to be a Phone number that come from Viet Nam'),
        check('Email')
            .notEmpty().withMessage('email is required for this operation')
            .isEmail().withMessage('email need to be a email'),
        // check('clientSupportInfo')
        //     .notEmpty().withMessage('clientSupportInfo is required for this operation')
        check('captchaToken')
            .custom(async value => {
                const params = new URLSearchParams();
                params.append('secret', process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY);
                params.append('response', value);
                const res = await fetch('https://www.google.com/recaptcha/api/siteverify',
                    {
                        method: 'POST',
                        body: params
                    });
                const {
                    success,
                    score,
                    hostname,
                    ...rest
                } = await res.json();
                if (!success) {
                    console.error({
                        success,
                        score,
                        hostname,
                        rest,
                        NEXT_PUBLIC_RECAPTCHA_SECRET_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY
                    });
                    return Promise.reject(`Wrong captcha info or sth bruhhhh `);
                }
                console.log("score", score)
                if (process.env.NODE_ENV === 'production') {
                    const { host } = parseUrl(process.env.NEXT_PUBLIC_PUBLIC_URL)
                    if (hostname !== host) {
                        console.log("hostname", hostname, host)
                        return Promise.reject(`Bruh this aint platechvn bruh`);
                    }
                }

            }),
    ], validationResult))
    .post(async (req, res) => {
        // console.log("req headers", req.headers["x-real-ip"], req.connection.remoteAddress,req.headers)
        // let returnData;
        const { fullName,
            phoneNumber,
            Email,
            // captchaToken,
            productName,
            clientSupportInfo } = req.body
        // console.log("test",captchaToken);
        // res.status(200).json({ "success": true, createdRecords: captchaToken })
        try {
            await new Promise(resolve => {
                var base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base('app7uqXAQYV28WaQF');
                base('Form Liên Hệ').create({
                    "Họ và Tên": fullName,
                    "Số Điện Thoại": phoneNumber,
                    "Email": Email,
                    "Trạng thái": "Mới",
                    "Nội dung tư vấn": clientSupportInfo ?? "",
                    "Sản phẩm": productName ?? ""
                }, function (err, record) {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    resolve(record)
                    //console.log(record.getId());
                });
            })
            res.status(200).json({ "success": true })
        } catch (error) {
            console.error("error", error);
            res.status(400).json({ "success": false, message: "Internal server error" })
        }
    })
export default handler;