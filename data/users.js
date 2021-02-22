const bcrypt = require("bcryptjs");

const users = [
    {
        username: "tester123",
        email: "tester@domain.com",
        runs: [
            {
                words: ["require", "meet", "home"],
                time: 32,
            },
            {
                words: ["reckless", "tomb", "home"],
                time: 10,
            },
        ],
        password: bcrypt.hash("sectret", 10),
    },
    {
        username: "Test109",
        email: "tester231@domain.com",
        runs: [
            {
                words: ["brandish", "sheath", "sword"],
                time: 4,
            },
            {
                words: ["music", "symphony", "trombone"],
                time: 10,
            },
        ],
        password: bcrypt.hash("testPass", 10),
    },
];

module.exports = users;
