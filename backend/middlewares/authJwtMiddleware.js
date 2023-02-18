const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../configs/authConfig.js");
const BlackToken = require("../models/blackTokenModel.js");

function verifyToken(req, res, next)
{
  const token = req.headers["x-access-token"];

  if (!token) 
  	return res.status(403).send({message: "No x-access-token provided!"});

  
	jwt.verify(token, SECRET_KEY, 
		(err, decoded) => {
			if (err) 
				return res.status(401).send({message: "Unauthorized!"});

			BlackToken.findByToken(token).then(
				(blackToken) => {
					if (blackToken) {
						return res.status(404).send({message: "token did not use!"});
					}
					else {
						req.userId = decoded.id;
						next();
					}
				})
				.catch(err => res.status(500).send({ message: err.message }));
			
		}
	);
};

module.exports = {
	verifyToken: verifyToken,
};