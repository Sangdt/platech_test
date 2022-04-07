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
    
        <section id="Messages">
            <p>This is a iframe to respresent a third party button to call to thrid patry api.
                <br />
                When user click either <strong>Call api from iframes</strong> or <strong> get api info with cookies</strong>
                buttons, if access was granted, will excute a call to api server and the api response will set a httponly
                cookies(same way the current erequest and pictureSG working), after that first party
                domain will have acess to this cookies, otherwise a popup will display to asking user redirect to thirdparty
                domain to make it available to request storage access api.
                <!-- <p>After a redirect user need to click this </p> -->
            </p>
            <br />
        </section>
        <button id="getApinfo">
            Call api from iframes
        </button>
        <br />
        <button id="getAll">
            get api info with cookies
        </button>
    </body>
    <script>
        var hasAccessToStr = false;
        var redirect = false;
        (function () {
            document.hasStorageAccess().then(hasAccess => {
                console.log("No access", hasAccess)
                hasAccessToStr = hasAccess;
            });
            let params = (new URL(document.location)).searchParams;
            redirect = params.get("redirect");
            var getApinfoBtn = document.getElementById("getApinfo");
            var MessagesContainer = document.getElementById("Messages");
            var getAllBtn = document.getElementById("getAll");
            getApinfoBtn.addEventListener('click', () => getApinfo());
            getAllBtn.addEventListener('click', () => getAll());
            if (redirect) {
                MessagesContainer.innerHTML = "<p>Done redirect, now click<strong>Call api from iframes</strong> or <strong> get api info with cookies</strong> buttons again to ask user to access to request storage API</p>"
            }
            if (hasAccessToStr) {
                MessagesContainer.innerHTML = "<p>Access granted, click </strong> or <strong> get api info with cookies</strong> buttons again to ask user tocall to thirdparty API</p>"
            }
        })()
        function getApinfo() {
            if (!hasAccessToStr) {
                return document.requestStorageAccess().then(_ => {
                    // Now we have first-party storage access!
    
                    // Let's access some items from the first-party cookie jar
                    console.log("We are in ")
                    fetch('https://platechvn.com/api/getStuffAndSetApi', {
                        credentials: 'include'
                    })
                        .then(response => response.text())
                        .then(data => console.log(data));
                }).catch(error => {
                    console.log("err on requesting ", error)
                    if ( !redirect) {
                        if(window.confirm("Goes to third party to confirm!!")) top.window.location.href = 'https://platechvn.com/api/Iframe2';
                    } else {
                        var MessagesContainer = document.getElementById("Messages");
                        MessagesContainer.innerHTML = "<p>Access Denied, click </strong> or <strong> get api info with cookies</strong> buttons again to ask user to access to request storage API</p>"
    
                    }
                    // fetch('https://platechvn.com/api/Denied', {
                    //     credentials: 'include',
                    //     method: 'POST',
                    //     headers: {
                    //         'Content-Type': 'application/json'
                    //         // 'Content-Type': 'application/x-www-form-urlencoded',
                    //     },
                    //     body: JSON.stringify({ data: error })
                    // })
                    //     .then(response => response.text())
                    //     .then(data => console.log(data));
                });
            } else {
                // fetch('https://platechvn.com/api/getStuffAndSetApi', {
                //     credentials: 'include'
                // })
                //     .then(response => response.text())
                //     .then(data => console.log(data));
            }
    
        }
    
        function getAll() {
            if (!hasAccessToStr) {
                return document.requestStorageAccess().then(_ => {
                    // Now we have first-party storage access!
    
                    // Let's access some items from the first-party cookie jar
                    console.log("We are in ")
                    fetch('https://platechvn.com/api/getStuffFromApiWithCookies', {
                        credentials: 'include'
                    })
                        .then(response => response.text())
                        .then(data => console.log(data));
                    // fetch('https://platechvn.com/api/getStuffFromApiWithCookies', {
                    //     credentials: 'include'
                    // })
                    //     .then(response => response.text())
                    //     .then(data => console.log(data));
                }).catch(error => {
                    console.log("err on requesting ", error)
                    fetch('https://platechvn.com/api/Denied', {
                        credentials: 'include',
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                            // 'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: JSON.stringify({ data: error })
                    })
                        .then(response => response.text())
                        .then(data => console.log(data));
                });
            } else {
                fetch('https://platechvn.com/api/getStuffFromApiWithCookies', {
                    credentials: 'include'
                })
                    .then(response => response.text())
                    .then(data => console.log(data));
            }
        }
    </script>
    
    </html>`);
}