const defaultHeader = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: 'Basic 4ddf33eeb1b1a81d4f2ceb926865681e',
};

const NutritionxHeader = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'x-app-id': '27c30c75',
  'x-app-key': '404bfe10120ba2f915658d7dd2184d46',
};

const customFetch = (url, method, body = false, headers) => {
  const options = {
    method,
    headers: {
      ...defaultHeader,
      ...headers,
    },
  };
  if (body) {
    options.body = JSON.stringify(body);
  }
  return fetch(url, options)
    .then(response => {
      if (response.status === 401) {
        return;
      }
      return response.json();
    })
    .catch(err => {
      console.log(err);
      //throw new Error(err);
    });
};

const customFetchNX = (url, method, body = false, headers) => {
  const options = {
    method,
    headers: {
      ...defaultHeader,
      ...NutritionxHeader,
    },
  };
  if (body) {
    options.body = JSON.stringify(body);
  }
  return fetch(url, options)
    .then(response => {
      if (response.status === 401) {
        return;
      }
      return response.json();
    })
    .catch(err => {
      throw new Error(err);
    });
};

const get = (url, body, headers) => {
  return customFetch(url, 'GET', body, headers);
};

const post = (url, body, headers) => {
  return customFetch(url, 'POST', body, headers);
};

const getNX = (url, body, headers) => {
  return customFetchNX(url, 'GET', body, headers);
};

const postNX = (url, body, headers) => {
  return customFetchNX(url, 'POST', body, headers);
};

export {get, post, getNX, postNX};
