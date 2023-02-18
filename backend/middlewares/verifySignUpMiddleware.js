const User = require("../models/userModel.js");

function checkDuplicatePhoneOrEmail(req, res, next)
{
  const { phone, email } = req.body;

  if (email) { 
	// email
	User.findByEmail(email.trim()).then(
		user => {
			if (user) {
				res.status(400).send({message: "Failed! Email is already in use!"});
				return;
			}
		}
	);
  }

  if (phone) {
	// phone
	User.findByPhone(phone.trim()).then(
		user => {
			
			if (user) {
				res.status(400).send({message: "Failed! Phone is already in use!"});
				return;
			}
		}
	);
  }

  next();
};

module.exports = {
    checkDuplicatePhoneOrEmail: checkDuplicatePhoneOrEmail,
};