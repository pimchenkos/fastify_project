async function pingServer() {
    return 'Hello handler!';
}

module.exports = {
    get: pingServer,
};