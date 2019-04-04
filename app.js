const express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser');

const app = express(),
    port = 3000;

const userManager = {
    users: [
        { name: "Joey", password: "12345", detail: {fullName: "Joey Zhou", slogan: "Leave me alone."} },
        { name: "Jenny", password: "12345", detail: {fullName: "Jenny Wang", slogan: "Good good study, day day up!"} },
        { name: "Admin", password: "admin", detail: {fullName: "Admin", slogan: "Tomorow is another day!"} }
    ],
    getUser(username) {
        return this.users.find(user => user.name == username)
    },
    // store sessions to keep track of specific user
    sessionId: {}
}

const crypto = require('crypto');

const generate_key = function () {
    var sha = crypto.createHash('sha256');
    sha.update(Math.random().toString());
    return sha.digest('hex');
};

app.use(bodyParser.json());
app.use(cookieParser())
// clear session if either exits
app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');
    }
    next();
});
// redirect to login if not match
var sessionChecker = (req, res, next) => {
    console.log("check", userManager.sessionId[req.cookies.name], req.cookies.sid)
    if (req.cookies.name &&
        userManager.sessionId[req.cookies.name] === req.cookies.sid) {
        next();
    } else {
        res.json({ code: -1, msg: "your session has expired." });
    }
};

app.get('/api/user', sessionChecker, function (req, res) {
    res.json({ code: 1, msg: "get user info", data: userManager.getUser(req.cookies.name).detail });
})

// state code, -1: logged out, 0: error, 1: success, 
app.post('/api/login', function (req, res) {
    const user = userManager.getUser(req.body.username);
    if (user && user.password == req.body.password) {
        const sid = generate_key();
        userManager.sessionId[req.body.username] = sid;
        console.log("genid", sid);
        res.cookie("sid", sid, { maxAge: 2 * 60 * 60 * 1000 });
        res.cookie("name", req.body.username, { maxAge: 2 * 60 * 60 * 1000 });
        res.json({ code: 1, msg: "login success" });
    } else {
        res.json({ code: 0, msg: "User name or password is incorrect." });
    }
})

app.post('/api/logout', function (req, res) {
    req.session.user = null;
    res.cookie("sid", {expires: Date.now()})
    res.cookie("name", {expires: Date.now()})
    res.json({ code: 0, msg: "logged out" })
})

app.listen(port, () => console.log(`App listening on port ${port}!`))