const { SECRET_KEY, SLICE, TIME_EXPIRED } = require("../configs/authConfig.js");
const User = require("../models/userModel.js");
const BlackToken = require("../models/blackTokenModel.js");
var jwt = require("jsonwebtoken");
const { createHash } = require("node:crypto");

async function signUp(req, res) 
{
  const { fullname, phone, email, password, personalIdCode } = req.body;
  
  const hashedPassword = hashPassword(password?.trim());

  const user = new User(fullname?.trim(), phone?.trim(), email?.trim(), hashedPassword, personalIdCode?.trim());

  User.create(user)
      .then(id => res.status(200).send(id))
      .catch(err => res.status(500).send({ message: err.message }));
};

async function signIn(req, res) 
{
  const { phone, email, password } = req.body;
  if (email) {
    User.findByEmail(email.trim())
        .then(user =>  ans(user, password, res))
        .catch(err => res.status(500).send({ message: err.message }));
  }
  else if (phone) {
    User.findByPhone(phone.trim())
        .then(user =>  ans(user, password, res))
        .catch(err => res.status(500).send({ message: err.message }));
  }
  else {
    res.status(404).send({ message: "User Not found." });
  }
};

async function signOut() {
    // đưa access token chưa hết hạn vào black_tokens
}

function ans(user, password, res) 
{
  if (!user)
    return res.status(404).send({ message: "User Not found." });

  
  if (! comparePassword(password?.trim(), user.password))
    return res.status(401).send({accessToken: null, message: "Invalid Password!"});

  BlackToken.removeTokens().then(() => {
    res.status(200).send(
      {
        id: user.id,
        accessToken: jwt.sign({ id: user.id }, SECRET_KEY, {expiresIn: TIME_EXPIRED})
      }
    );
  })
  .catch(err => res.status(500).send({ message: err.message }));
}

function hashPassword(password) {
  const salt = Math.round(Math.random() * 3333);
  const hashedPassword = createHash('sha256').update(password + salt).digest('hex');
  return hashedPassword.slice(0, SLICE) + salt + hashedPassword.slice(SLICE);
}

function comparePassword(password, storedPassword) {
  const afterSlice = storedPassword.length - 64 + SLICE;
  const salt = storedPassword.slice(SLICE, afterSlice);
  const hashedPassword = storedPassword.slice(0, SLICE) + storedPassword.slice(afterSlice);
  const tryHashPassword = createHash('sha256').update(password + salt).digest('hex');
  return hashedPassword == tryHashPassword;
}

module.exports = {
  signUp,
  signIn,
  signOut,
}