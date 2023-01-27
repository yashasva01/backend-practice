const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const port = 8000;

let taskList = [];
let id = 1;

app.get('/', (req, res) => {
    res.send('This is todo app!!!!!');
});
app.get('/tasks', (req, res) => {
    const obj = req.body;
    //console.log(obj);
    if(JSON.stringify(obj) === '{}'){
        res.send(JSON.stringify(taskList));
    }else {
        let taskId = obj.id;
        const foundTask = taskList.find(task => task.id === taskId);
        return res.send(JSON.stringify(foundTask));
    }
});
app.post('/tasks', (req, res) => {
    //console.log('POST method hit');
    const obj = req.body;
    let taskName = obj.Name;
    if(!taskName){
        //console.log('Provide task name');
        return res.status(400).send('Name not provided');
    }
    let taskId = id;
    let taskStatus = false;
    let newTask = {
        'id' : taskId,
        'Name' : taskName,
        'isComplete' : taskStatus,
    };
    taskList.push(newTask);
    id += 1;
    //console.log(taskList);
    res.send(newTask);
});
app.delete('/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    if (!taskId){
        return res.status(400).send('provide id of the task');
    }
    let taskIndex = taskList.findIndex(task => task.id === Number(taskId));
    const deletedTask = taskList[taskIndex];
    taskList.splice(taskIndex, 1);
    return res.send(`${JSON.stringify(deletedTask)} is deleted`);
});
app.put('/tasks/:id', (req,res) => {
    const taskId = req.params.id;
    if (!taskId){
        return res.status(400).send('provide id of the task');
    }
    let taskIndex = taskList.findIndex(task => task.id === Number(taskId));
    if(taskIndex === -1){
        return res.status(404).send('Id not found');
    }
    // const obj = req.body;
    const updatedTask= {
        ...taskList[taskIndex],
        ...req.body
    };
    // Object.keys(obj).forEach((key) => {
    //     taskList[taskIndex][key] = obj[key];
    // });
    taskList[taskIndex] = updatedTask;
    return res.send(JSON.stringify(taskList[taskIndex]));
});
app.listen(port, () => {
    console.log(`server is running on port: localhost:${port}`);
});