import parser from 'ua-parser-js'
import { NextResponse } from 'next/server'
let prod = process.env.NODE_ENV === "production";

// const PUBLIC_FILE = /\.(.*)$/
function getCsp(nonce) {
    let csp = ``;
    csp += `base-uri 'self';`;
    csp += `form-action 'self' https://analytics.google.com https://www.facebook.com https://connect.facebook.net https://www.google-analytics.com  http://www.googletagmanager.com;`;
    csp += ``;
    csp += `default-src 'self';`;
    csp += `script-src 'self' ${prod ? "" : "'unsafe-eval'"} 'nonce-${nonce}' 'strict-dynamic' https://www.google.com https://analytics.google.com http://www.youtube.com https://connect.facebook.net https://www.googletagmanager.com  https://polyfill.io https://maps.googleapis.com  https://www.google-analytics.com https://cdn.ampproject.org https://ssl.google-analytics.com;`; // NextJS requires 'unsafe-eval' in dev (faster source maps)
    // csp += `default-src 'self'; style-src ${prod ? `'nonce-${nonce}'` : "'unsafe-inline'"}  https://www.google-analytics.com https://maps.gstatic.com https://connect.facebook.net https://fonts.googleapis.com data:;`; // NextJS requires 'unsafe-inline'
    csp += `style-src 'self' 'unsafe-inline'  https://www.google.com https://www.google-analytics.com https://maps.gstatic.com https://connect.facebook.net https://fonts.googleapis.com data:;`; // NextJS requires 'unsafe-inline'
    csp += `img-src 'self' https://cdn.sanity.io https://www.google.com.vn https://analytics.google.com http://www.googletagmanager.com https://www.google.com https://www.facebook.com https://www.datocms-assets.com https://maps.googleapis.com https://www.google-analytics.com https://maps.gstatic.com data: blob:;`;
    csp += `font-src 'self' https://fonts.gstatic.com data: blob:;`; // TODO
    csp += `frame-src https://www.google.com https://analytics.google.com https://web.facebook.com http://www.youtube.com https://www.facebook.com https://www.googletagmanager.com ;`; // TODO
    csp += `media-src https://cdn.sanity.io https://analytics.google.com https://www.datocms-assets.com https://maps.gstatic.com https://maps.googleapis.com https://www.facebook.com;`; // TODO
    csp += `connect-src 'self' https://analytics.google.com https://www.google-analytics.com  https://connect.facebook.net https://www.facebook.com https://vitals.vercel-insights.com https://stats.g.doubleclick.net ;`
    csp += `worker-src  'self' blob:`
    return csp;
  }
  
export function middleware(req, res) {
    try {
        const Nextres =  NextResponse.next()
        console.log(" NextResponse res header", Nextres.headers)
        console.log("  res header", res.headers)
        // console.log("viewport")
        // Update the expected url
        // url.pathname = `_viewport/${viewport}${url.pathname}`

        // Return rewrited response
        return NextResponse.next();
    } catch (error) {
        console.error("Some error")
        return NextResponse.next();

    }
}