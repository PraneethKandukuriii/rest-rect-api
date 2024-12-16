const express = require('express');
const fs = require('fs')
const bodyParser = require('body-parser');
const cors = require('cors');
const users = require('./MOCK_DATA-3.json');


console.log('Starting server...');


const app = express();
const port = 8000;


app.use(express.urlencoded({extended: false}));

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello From the REST API !');
});



app.get("/users",(req, res)=>{
    const html = `
    <ul>
    ${users.map((user)=> `<li>${user.first_name}`)}
    </ul>
    `;
    res.send(html);

});
// REST API 


app.get('/api/users',(req,res)=>{
    return res.json(users);
});

app.get("/api/users/:id",(req,res) =>{
    const id = Number(req.params.id);
    const user = users.find((user)=> user.id === id);
    return res.json(user);

});

app.post('/api/users',(req,res)=>{
    const body = req.body;
    users.push({...body,id: users.length+1});
    fs.writeFile('./MOCK_DATA-3.json',JSON.stringify(users),(err, data)=>{
        return res.json({status:"success",id:users.length+1});

    });
});

app.delete('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const updatedUsers = users.filter((user) => user.id !== id);

    if (updatedUsers.length === users.length) {
        return res.status(404).json({ message: 'User not found' });
    }

    fs.writeFile('./MOCK_DATA-3.json', JSON.stringify(updatedUsers), (err) => {
        if (err) return res.status(500).json({ message: 'Error deleting user' });
        users.length = 0;
        users.push(...updatedUsers);
        res.json({ message: 'User deleted' });
    });
});

app.delete('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const updatedUsers = users.filter((user) => user.id !== id);

    if (updatedUsers.length === users.length) {
        return res.status(404).json({ message: 'User not found' });
    }

    fs.writeFile('./MOCK_DATA-3.json', JSON.stringify(updatedUsers), (err) => {
        if (err) return res.status(500).json({ message: 'Error deleting user' });
        users.length = 0;
        users.push(...updatedUsers);
        res.json({ message: 'User deleted' });
    });
});


app.listen(port, () => {
    
    console.log(`Server is running on http://localhost:${port}`);
});

