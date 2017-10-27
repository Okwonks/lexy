var crypto = require('crypto');

module.exports = function verifyFacebook(req, res, buf) {
    var signature = req.headers["x-hub-signature"];
    
    if (!signature) {
        console.log("Signature absent: %s", JSON.stringify(req));
    } else {
        var elements = signature.split('sha1=');
        var facebookSignature = elements[1];

        var expectedSignature = crypto.createHmac('sha1', process.env.FACEBOOK_APP_SECRET).update(buf).digest('hex');

        if (facebookSignature !== expectedSignature) {
            throw new Error("Could not verify message.");
        }
    }
}