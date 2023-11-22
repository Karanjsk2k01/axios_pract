//AXIOS GLOBALS

axios.defaults.headers.common['X-Auth-Token'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

// GET REQUEST

function getTodos() {
  // axios({
  //   method: 'GET',
  //   url: 'https://jsonplaceholder.typicode.com/todos',
  //   params: {
  //     _limit: 5
  //   }
  // })
  //   .then((res) => showOutput(res))
  //   .catch(err => console.log(err))

  axios.get('https://jsonplaceholder.typicode.com/todos', { params: { _limit: 5 } })
    .then((res) => showOutput(res))
    .catch(err => console.log(err))
}

// POST REQUEST
function addTodo() {
  // axios({
  //   method: 'POST',
  //   url: 'https://jsonplaceholder.typicode.com/todos',
  //   data: {
  //     'title': ' test todo',
  //     'completed': false
  //   },
  // })
  //   .then(res => showOutput(res))
  //   .catch(err => console.log(err))
  axios.post('https://jsonplaceholder.typicode.com/todos', { data: { 'title': 'test todo', 'completed': false } })
    .then((res) => showOutput(res))
    .catch(err => console.log(err))
}

// PUT/PATCH REQUEST
function updateTodo() {
  axios.patch('https://jsonplaceholder.typicode.com/todos/1', { 'title': 'Updated todo', 'completed': true })
    .then(res => showOutput(res))
    .catch(err => console.log(err))
}

// DELETE REQUEST
function removeTodo() {
  axios.delete('https://jsonplaceholder.typicode.com/todos/1')
    .then(res => showOutput(res))
    .catch(err => console.log(err))
}

// SIMULTANEOUS DATA
function getData() {
  axios.all([
    axios.get('https://jsonplaceholder.typicode.com/todos', { params: { _limit: 2 } }),
    axios.get('https://jsonplaceholder.typicode.com/posts', { params: { _limit: 2 } })
  ])
    // .then(res => {
    //   showOutput(res[1]);
    //   console.log(res[0].data);
    // })
    // .catch(err => console.log(err))
    //we can use axios.spread as well
    .then(axios.spread((todos, post) => {
      showOutput(todos)
    }))
    .catch(err => console.log(err))
}

// CUSTOM HEADERS
function customHeaders() {
  let config = {
    headers: {
      'Content-Type': "Application/json",
      Authorization: "SomeToken"
    }
  }

  axios.post('https://jsonplaceholder.typicode.com/todos', { data: { 'title': 'test todo', 'completed': false } }, config)
    .then((res) => showOutput(res))
    .catch(err => console.log(err))
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  const options = {
    method: 'POST',
    url: 'https://jsonplaceholder.typicode.com/todos',
    data: {
      'title': 'Hello world',
      'completed': false
    },
    transformResponse: axios.defaults.transformResponse.concat(data => {
      data.title = data.title.toUpperCase()
      return data;
    })
  }

  axios(options).then((res) => showOutput(res))
    .catch(err => console.log(err))
}

// ERROR HANDLING
function errorHandling() {
  axios.get('https://jsonplaceholder.typicode.com/todoss')
    .then((res) => showOutput(res))
    .catch(err => {
      if (err.response) {
        console.log(err.response.status);
        console.log(err.response.data);
        console.log(err.response.headers);
      }
    })
}


// INTERCEPTING REQUESTS & RESPONSES
axios.interceptors.request.use(confiq => {
  console.log(`${confiq.method.toUpperCase()} request sent to ${confiq.url} at ${new Date().getTime()}`)
  return confiq;
}, error => {
  return Promise.reject(error);
})
// AXIOS INSTANCES

// Show output in browser
function showOutput(res) {
  document.getElementById('res').innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document
  .getElementById('transform')
  .addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);
