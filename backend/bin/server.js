// const app = require('../src/app');
import app from '../src/app.js'
const port = "3000";

app.listen(port, function () {
    console.log(`app listening on port ${port}`)
})
