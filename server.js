const express = require("express");
const socketio = require("socket.io");
const { instrument } = require("@socket.io/admin-ui");
// const bcrypt = require("bcrypt");
const app = express();

app.use(express.static(__dirname + "/public"));

const expressServer = app.listen(9000);
const io = socketio(expressServer, {
    cors: {
        origin: ["http://localhost:3030"],
        credentials: true
    }
});

// bcrypt.genSalt(10, function (err, salt) {
//     bcrypt.hash("admin-ui", salt, function (err, hash) {
//         console.log(hash);
//         // Store hash in your password DB.
//     });
// });

instrument(io, {
    auth: {
        type: "basic",
        username: "admin",
        password: "$2b$10$axiIhKbFNKXPKAuJqxZS5uVN/p.UOoC9QCkR5nqOeP/PuUF/T5n9i" //encrypted with bcrypt
    },
    mode: "development",
});

module.exports = {
    app,
    io
};
