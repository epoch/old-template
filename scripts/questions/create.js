var axios = require('axios')

axios
  .post('http://localhost:4567/questions', {
    question: {
      body: 'What is express.js?',
      posted_by: 'dt'
    }
  })
