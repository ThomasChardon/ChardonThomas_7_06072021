const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // console.log(req);
  // console.log(req.headers);
  try {

    const token = req.headers.authorization.split('"'); 
    // console.log("le token contenant le header :");
    // console.log(token[5]);
    const decodedToken = jwt.verify(token[5], 'RANDOM_TOKEN_SECRET'); 
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      console.log("jwt ok - routes des posts");
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};