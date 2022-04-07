import Cors from 'cors'

// Initializing the cors middleware
const cors = Cors({
  methods: ['GET', 'HEAD'],
})
function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
      fn(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result)
        }
  
        return resolve(result)
      })
    })
  }
  
export default async  function handler(request, response) {
    await runMiddleware(request, response, cors);
    response.setHeader("access-control-allow-origin", "https://test-arr.vercel.app");
    // response.setHeader("access-control-expose-headers", "Set-Cookie");
    // response.setHeader("Access-Control-Allow-Credentials", "true");
    response.end(`<!DOCTYPE html>
    <html>
    
    <head>
    
    </head>
    
    <body>
    
        <section>
            <div id="results">
                <p>This a third party site, at this site, will set a temporay cookies based on user interactions to make sure safari consider this site is available to request storage access api later on in the first party site</p>
                <p>After that we will redirect back to fisrt party site to ask user to access to storage.</p>
            </div>
        </section>
        <button id="getApinfo" onclick="getApinfo()">
            OK buttons
        </button>
        <br />
        <!-- <iframe sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin" id="index1"
            src="https://test-arr.vercel.app/iframe"></iframe> -->
    </body>
    <script>
        var hasAccessToStr = false;
        function getApinfo() {
            console.log("setting cookies to make sure this is first party...")
            document.cookie = "test=123123123123;";
            window.location.href = "https://test-arr.vercel.app/?redirect=true";
        }
    </script>
    
    </html>`);
}