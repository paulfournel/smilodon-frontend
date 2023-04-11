import axios from "axios";

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(url, options) {
    const headers = options.headers || {
        'Accept': 'application/json', 'Content-Type': 'application/json'
    }

    return axios({
        method: options.method, url, headers: {...headers}, data: options.body,
    });
}