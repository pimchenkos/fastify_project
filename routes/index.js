async function pingServer() {
    return 'Hello everybody!';
}

module.exports = {
    get: pingServer,
};