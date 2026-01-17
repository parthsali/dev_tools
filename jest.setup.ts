import '@testing-library/jest-dom'
import 'whatwg-fetch'

// Polyfill TextEncoder/TextDecoder if missing (needed for some Next.js internals)
if (typeof global.TextEncoder === 'undefined') {
    const { TextEncoder, TextDecoder } = require('util');
    global.TextEncoder = TextEncoder;
    global.TextDecoder = TextDecoder;
}

// Polyfill Request/Response if missing
if (typeof global.Request === 'undefined') {
    // @ts-ignore
    global.Request = require('whatwg-fetch').Request;
}
if (typeof global.Response === 'undefined') {
    // @ts-ignore
    global.Response = require('whatwg-fetch').Response;
}
if (typeof global.Headers === 'undefined') {
    // @ts-ignore
    global.Headers = require('whatwg-fetch').Headers;
}
