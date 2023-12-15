class Api {
  constructor(options) {
    this._options = options;
    this._baseUrl = this._options.baseUrl;
    this._headers = this._options.headers;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  login(name, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        password,
      }),
      credentials: 'include',
    })
      .then((res) => this._getResponseData(res));
  }

  register(name, department, password, confirmation) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify( {name, department, password, confirmation} ),
      credentials: 'include',
    })
    .then((res) => this._getResponseData(res))
  }

  addData(department, lesson, cn, eng, example) {
    return fetch(`${this._baseUrl}/add`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify( {department, lesson, cn, eng, example} ),
      credentials: 'include'
    })
  .then((res) => this._getResponseData(res))
  }
}

const MainApi = new Api({
  baseUrl: 'http://leka-english.online'
});

export default MainApi;

