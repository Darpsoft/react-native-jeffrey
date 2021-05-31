import { storage } from "../../index";

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  return response.status === 204 ? "" : response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.status);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(url, options) {
  return fetch(url, options).then(checkStatus).then(parseJSON);
}

export function postOptionsFormData(body = {}, method = "POST", headers = {}) {
  const { auth } = storage.getState();
  return {
    method,
    headers: {
      ...headers,
      // Authorization: `Bearer ${auth.tokenUser}`,
      Token: auth.tokenUser,
      App: auth.dataUser.app,
    },
    body,
  };
}

export function postOptionsWithoutToken(body = {}, method = "POST", headers = {}) {
  return {
    method,
    headers: {
      ...headers,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
}

export function getOptions(method = "GET", headers = {}) {
  const { auth } = storage.getState();
  return {
    method,
    headers: {
      ...headers,
      Accept: "application/json",
      "Content-Type": "application/json",
      // Authorization: `Bearer ${auth.tokenUser}`,
      Token: auth.tokenUser,
      App: auth.dataUser.app,
    },
  };
}

export function getOptionsWithToken(token = "", method = "GET", headers = {}) {
  return {
    method,
    headers: {
      ...headers,
      Accept: "application/json",
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`,
    },
  };
}

export function getOptionsWithoutToken(method = "GET", headers = {}) {
  return {
    method,
    headers: {
      ...headers,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
}

export function postOptions(body = {}, method = "POST", headers = {}) {
  const { auth } = storage.getState();
  return {
    method,
    headers: {
      ...headers,
      Accept: "application/json",
      "Content-Type": "application/json",
      // Authorization: `Bearer ${auth.tokenUser}`,
      Token: auth.tokenUser,
      App: auth.dataUser.app,
    },
    body: JSON.stringify(body),
  };
}

export function putOptionsWithoutToken(body = {}, method = "PUT", headers = {}) {
  return {
    method,
    headers: {
      ...headers,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
}

export function putOptions(body = {}, method = "PUT", headers = {}) {
  const { auth } = storage.getState();
  return {
    method,
    headers: {
      ...headers,
      Accept: "application/json",
      "Content-Type": "application/json",
      // Authorization: `Bearer ${auth.tokenUser}`,
      Token: auth.tokenUser,
      App: auth.dataUser.app,
    },
    body: JSON.stringify(body),
  };
}

export function patchOptions(body = {}, method = "PATCH", headers = {}) {
  const { auth } = storage.getState();
  return {
    method,
    headers: {
      ...headers,
      "Content-Type": "application/json",
      Accept: "application/json",
      // Authorization: `Bearer ${auth.tokenUser}`,
      Token: auth.tokenUser,
      App: auth.dataUser.app,
    },
    body: JSON.stringify(body),
  };
}

export function deleteOptions(body, method = "DELETE", headers = {}) {
  const { auth } = storage.getState();
  return {
    method,
    headers: {
      ...headers,
      Accept: "application/json",
      "Content-Type": "application/json",
      // Authorization: `Bearer ${auth.tokenUser}`,
      Token: auth.tokenUser,
      App: auth.dataUser.app,
    },
    body: JSON.stringify(body),
  };
}

export async function showMessageError(err) {
  console.log(err);
  if (typeof err === "string") {
    // message.error(err);
    return;
  }
  if (err.response) {
    const errResp = await err.response.json();
    if (errResp.error) {
      switch (errResp.error.statusCode) {
        case 422:
          // message.error(errResp.error.details[0].message);
          return;
        case 500:
          // message.error(errResp.error.message);
          return;
        default:
          if (errResp.error.message) {
            // message.error(errResp.error.message);
            return;
          }
        // message.error(err.message);
      }
    }
  }
}
