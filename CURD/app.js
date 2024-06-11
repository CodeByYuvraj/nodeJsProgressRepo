// setting up express app
const express = require('express');
const app = express();

// defining port
const PORT = process.env.PORT || 3000;

// defining user
const user = require('./user/user');

// using middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.get('', (req, res) => {
    res.json({msg: "welcome to simple website to perform curd operation"});
})

app.get('/api/users', (req, res) => {
    res.json({msg: 'list of all users', users: user});
});

app.get('/api/users/:id', (req, res) => {
    const findUser = user.find(user => user.id === parseInt(req.params.id));
    if(findUser) res.json({msg: 'your user based on id',user: findUser});
    else res.status(404).json({msg: `user with id ${req.params.id} does not exist.`});
});

app.post('/api/users', (req, res) =>{
    const newUser = {
        id: user.length + 1,
        name: req.body.name,
        gender: req.body.gender,
        salary: parseInt(req.body.salary),
        status: req.body.status,
    }

    if(!newUser.name || !newUser.gender || !newUser.salary || !newUser.status){
        return res.json({msg: "invalid credintial"});
    }

    user.push(newUser);
    res.json({msg: 'user added' ,users: user});

});

app.put('/api/users/:id', (req, res) => {
    const findUser = user.find(user => user.id === parseInt(req.params.id));
    if(findUser) {
        const updateUser = req.body;
        user.forEach(element => {
            if(element.id === parseInt(req.params.id)){
                element.name = updateUser.name ? updateUser.name : element.name;
                element.gender = updateUser.gender ? updateUser.gender : element.gender;
                element.salary = updateUser.salary ? parseInt(updateUser.salary) : element.salary;
                element.status = updateUser.status ? updateUser.status : element.status;
                res.json({msg: 'user updated', user:element})
            }
        });
    } else {
        res.status(404).json({msg: `user with id ${req.params.id} does not exist.`});
    }
});

app.delete('/api/users/:id', (req, res) => {
    const findUser = user.find(user => user.id === parseInt(req.params.id));
    if(findUser) {
        const findIndex = user.findIndex(a => a.id === parseInt(req.params.id));
        user.splice(findIndex, 1);
        res.json({msg: 'user deleated', users: user})
    }

    else res.status(404).json({msg: `user with id ${req.params.id} does not exist.`});
});
// listning port
app.listen(PORT, () => console.log(`listning on port ${PORT}`))
