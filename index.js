'use strict'

require('./config/config');
const app = require('./app');

app.listen(process.env.PORT, () => {
    console.log(`Server correctly running on port ${ process.env.PORT }`);
});