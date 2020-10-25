const fetchFunction = async (todo, body, method) => {
  let url = 'http://localhost:8000/api/todos';
  if (method !== 'POST') {
    url += `/${todo.id}`;
  }

  url = todo && todo.complete ? `${url}?tasks=completed` : url;

  if (method !== 'DELETE') {
    await fetch(url, {
      method: `${method}`,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  } else {
    await fetch(url, {
      method: `${method}`,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }
};

export default fetchFunction;
