// Checking if the app is running in localhost
const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
        // [::1] is the IPv6 localhost address.
        window.location.hostname === '[::1]' ||
        // 127.0.0.0/8 are considered localhost for IPv4.
        window.location.hostname.match(
            /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
        )
);

// This line is defining a function named "register" that takes a single argument "config".
export function register(config) {
    // This line checks if the current environment is production and if the browser supports service workers. If both conditions are true, the function continues.
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
        // This line creates a new URL object using the PUBLIC_URL environment variable and the current location of the window.
        const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
        // This line checks if the origin of the public URL is the same as the current window's origin. If they're not the same, it means the app is being served from a different domain than the public URL, so the function returns early and doesn't register the service worker because the service worker can only control our domain, it cannot go an control some other domain which is there on the internet
        if (publicUrl.origin !== window.location.origin) {
            // Our service worker won't work if PUBLIC_URL is on a different origin
            // from what our page is served on. This might happen if a CDN is used to
            // serve assets; see https://github.com/facebook/create-react-app/issues/2374
            return;
        }

        // Next, it registers an event listener for the "load" event, which triggers after all resources on the page have finished loading. It constructs the URL for the service worker file and checks if the application is running on localhost. If it is, it checks if a service worker still exists and is valid. It then logs a message to the console indicating that the app is being served cache-first by a service worker. If the application is not running on localhost, it registers the service worker.
        window.addEventListener('load', () => {
            const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

            if (isLocalhost) {
                // This is running on localhost. Let's check if a service worker still exists or not.
                checkValidServiceWorker(swUrl, config);

                navigator.serviceWorker.ready.then(() => {
                    console.log(
                        'This web app is being served cache-first by a service ' +
                            'worker. To learn more, visit https://cra.link/PWA'
                    );
                });
            } else {
                // Is not localhost. Just register service worker
                registerValidSW(swUrl, config);
            }
        });
    }
}

// The function takes two arguments:

// swUrl: A string that represents the URL of the service worker script file to register.
// config: An optional object that can contain two properties:
// onSuccess: A callback function that will be called if the service worker registration is successful.
// onUpdate: A callback function that will be called if the service worker is updated.
function registerValidSW(swUrl, config) {
    // The function uses the navigator.serviceWorker API to register the service worker script at the specified URL
    navigator.serviceWorker
        .register(swUrl)
        //  It then sets up an onupdatefound event listener on the resulting ServiceWorkerRegistration object.
        .then((registration) => {
            registration.onupdatefound = () => {
                // Inside the event listener, the function checks the state of the ServiceWorker object associated with the registration. If the state is 'installed', it means that a new version of the service worker has been installed but not yet activated.
                const installingWorker = registration.installing;
                if (installingWorker == null) {
                    return;
                }
                installingWorker.onstatechange = () => {
                    if (installingWorker.state === 'installed') {
                        // Checking if there is a older service worker
                        if (navigator.serviceWorker.controller) {
                            // At this point, the updated precached content has been fetched,
                            // but the previous service worker will still serve the older
                            // content until all client tabs are closed.
                            console.log(
                                'New content is available and will be used when all ' +
                                    'tabs for this page are closed. See https://cra.link/PWA.'
                            );

                            // Execute callback
                            if (config && config.onUpdate) {
                                config.onUpdate(registration);
                            }
                        }
                        //If there is no controlling service worker, it means that the service worker is installing for the first time, so the function logs a message indicating that content is cached for offline use. This is because the service worker is currently installing and caching the initial assets for offline use.
                        else {
                            // At this point, everything has been precached.
                            // It's the perfect time to display a
                            // "Content is cached for offline use." message.
                            console.log('Content is cached for offline use.');

                            // Execute callback
                            if (config && config.onSuccess) {
                                config.onSuccess(registration);
                            }
                        }
                    }
                };
            };
        })
        .catch((error) => {
            console.error('Error during service worker registration:', error);
        });
}

function checkValidServiceWorker(swUrl, config) {
    // Check if the service worker can be found. If it can't reload the page.
    fetch(swUrl, {
        headers: { 'Service-Worker': 'script' },
    })
        .then((response) => {
            // Ensure service worker exists, and that we really are getting a JS file.
            const contentType = response.headers.get('content-type');
            // Once the fetch() function resolves with a Response object, the function checks if the response status is 404 or if the content type of the response is not JavaScript. If either of these conditions is true, it means that the Service Worker file is not valid or cannot be found. In this case, the function unregisters any existing Service Workers using the navigator.serviceWorker.ready API and then reloads the page to ensure that a different app is not being served.
            if (
                response.status === 404 ||
                (contentType != null &&
                    contentType.indexOf('javascript') === -1)
            ) {
                // No service worker found. Probably a different app. Reload the page.
                navigator.serviceWorker.ready.then((registration) => {
                    registration.unregister().then(() => {
                        window.location.reload();
                    });
                });
            } else {
                // Service worker found. Proceed as normal.
                registerValidSW(swUrl, config);
            }
        })
        .catch(() => {
            console.log(
                'No internet connection found. App is running in offline mode.'
            );
        });
}

export function unregister() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready
            .then((registration) => {
                registration.unregister();
            })
            .catch((error) => {
                console.error(error.message);
            });
    }
}
