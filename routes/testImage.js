async function testImage(request) {
    if (request.body.data.image.url){
        return true
    }

    return request.body
}

module.exports = {
    post: testImage,
};