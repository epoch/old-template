var axios = require('axios')

axios
  .delete('http://localhost:4741/questions/1')
  .catch(e => console.log(e))
