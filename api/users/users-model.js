  
let users = [
        { name: 'Ed', password: "12345" },
        { name: 'Mary', password: "54321" },
]


const find = () => {
    return Promise.resolve(users)
}


const addNewUser = ({ name, password }) => {
    // INSERT INTO users (name, bio) VALUES ('foo', 'bar');
    const newUser = { name, password }
    users.push(newUser)
    console.log(users)
    return Promise.resolve(newUser)
}

const checkLoginInfo = ({ name, password }) => {
    const user = users.find(user => user.name === name && user.password === password)
    return Promise.resolve(user)
}

module.exports = { find, addNewUser, checkLoginInfo };