const API_URL = "http://5e16456b22b5c600140cf9bf.mockapi.io/api/v1/"

function fetchData(path, callback, method, body, staticURL) {
    return fetch(!staticURL ? `${API_URL}${path}` : path, {
        method,
        body: body ? JSON.stringify(body) : null,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })
      .then((data) => data.json())
      .then((dataJson) => callback(dataJson))
      .catch((error) => callback(error))
  }

  function GET(path, callback) {
    return fetchData(path, callback, 'GET', null)
  }

  export const Fetch = {
    GET,
  }
  