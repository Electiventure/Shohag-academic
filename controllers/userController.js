const User = require('../models/User');
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../service/auth");


async function registerPost (req, res) {
    const {username, password} = req.body;
    await  User.create({
    username, 
    password
});
return  res.redirect('/') ;
}

async function loginPost(req, res) {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (!user)
    return res.render("login", {
        error: "Invalid Username or Password",
    });
    const sessionId = uuidv4();
    setUser(sessionId, user);
    res.cookie("uid", sessionId);
    return res.redirect("/");
}

const { getUser } = require("../service/auth");

async function logout(req, res) {
  const userUid = req.cookies?.uid;

  if (userUid) {
    sessionIdToUserMap.delete(userUid);
  }

  res.clearCookie("uid");
  res.redirect("/login");
}

  module.exports = {
    registerPost,
    loginPost,
    logout
  };
  