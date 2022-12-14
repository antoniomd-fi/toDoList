const todoTasks = require('../models/todoTasks')

async function getTodoTasks(req, res) {
    const { user } = req
    if (user) {
        const todo = await todoTasks.findAll(
            { where: { userId: user.id } }
        )
        res.json(todo)}
    else {
        res.status(401).json({ message: "Unauthorized, login please" })
    }
}

async function createTodoTask(req, res) {
    const { user } = req
    const { task, completed } = req.body
    console.log(req.body)
    if (user) {
        const todoTask = await todoTasks.create({
            task,
            completed,
            userId: user.id
        })
        await todoTask.save()
        res.status(201).json({ data: todoTask })
    } else {
        res.status(401).json({ message: "Unauthorized, login please" })
    }
}

async function deleteTodoTask(req, res) {
    const todoTask = await todoTasks.findOne({
        where: { id: req.params.id }
    })
    if (!todoTask) {
        return res.status(404).json({ message: 'Task not found' })
    }

    await todoTasks.destroy({
        where: {
            id: req.params.id
        }
    })
    res.json({ success: 'Task deleted' })
}

async function updateTodoTask(req, res) {
    const todoTask = await todoTasks.findOne({
        where: {
            id: req.params.id
        }
    })
    if (!todoTask) {
        return res.status(404).json({ message: 'Task not found' })
    }
    await todoTasks.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    res.json({ success: 'Task updated' })
}

module.exports = {
    getTodoTasks,
    createTodoTask,
    deleteTodoTask,
    updateTodoTask
}