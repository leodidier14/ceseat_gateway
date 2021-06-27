//Load required elements
const jwt = require('jsonwebtoken');

const generateTokenApp = function (tokenapp){
    var tokenapp = {
        id: 27062021,
        token: jwt.sign(
          { id: 27062021 },
          'bu5f4EGg8x3XYe3rU7MK59hkK2TjpY24',
          { expiresIn: '15s' }
        )
    }
    return tokenapp.token
}

module.exports.generateTokenApp = generateTokenApp;