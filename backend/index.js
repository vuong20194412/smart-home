

const app = require('./app');

const PORT = 8080;
const HOST = 'localhost';

app.listen(PORT, HOST, () => {
    console.log(`Server is running on port http://${HOST}:${PORT}.`);
});