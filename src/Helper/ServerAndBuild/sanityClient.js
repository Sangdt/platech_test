const sanityClient = require('@sanity/client')
const client = sanityClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: new Date().toISOString().slice(0, 10), // use current UTC date - see "specifying API version"!
    // token: 'sanity-auth-token', // or leave blank for unauthenticated usage
    useCdn: true, // `false` if you want to ensure fresh data
});

module.exports = {
    client
}