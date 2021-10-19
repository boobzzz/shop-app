import { merge } from "lodash";

// Fetch JSON
export const fetchJSON = async (url: string, options = {}) => {
    options = merge(options, {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify((options as Options).body)
    })

    let res = await fetch(url, options)

    if ((res.headers.get("Content-Type") || "").includes("application/json")) {
        try {
            return {
                body: await res.json(),
                status: res.status
            }
        } catch (e) {
            // Bad JSON
            throw new Error(`Status: ${res.status}, Message: Bad JSON`)
        }
    } else {
        // Bad Content-type
        throw new Error(`Status: ${res.status}, Message: Incorrect MIME type`);
    }
}


interface Options {
    headers: Headers,
    body: JSON
}

interface Headers {
    "Accept": "application/json";
    "Content-Type": "application/json";
}