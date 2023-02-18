
const User = require('../models/userModel.js');

async function getUser(req, res) {

    User.findById(req.userId)
        .then(user => {
            delete user.password; 
            res.status(200).send(user);
        })
        .catch(err => res.status(500).send({ message: err.message }));
}

async function updateUser(req, res) {
    const { fullname, phone, email, personalIdCode } = req.body;

    let user = {};
    if (fullname != undefined) user.fullname = fullname.trim();
    if (phone != undefined) user.phone = phone.trim();
    if (email != undefined) user.email = email.trim();
    if (personalIdCode != undefined) user.personalIdCode = personalIdCode.trim();

    User.editById(req.userId, user)
      .then(id => res.status(200).send(id))
      .catch(err => res.status(500).send({ message: err.message }));
}

async function deleteUser(req, res) {
    User.removeById(req.userId)
      .then(id => res.status(200).send(id))
      .catch(err => res.status(500).send({ message: err.message }));
}

module.exports = {
    getUser: getUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
}