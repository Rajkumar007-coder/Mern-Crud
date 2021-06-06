const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const UserModel = require("./models/User");

app.use(express.json());
app.use(cors());
mongoose.connect("mongodb+srv://crud-mern:hey007@cluster0.lzsns.mongodb.net/users?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
    });

app.post('/upload', async (req, res) =>
{
    const userEmail = req.body.userEmail;
    const userName = req.body.userName;
    const userPhone = req.body.userPhone;
    const user = new UserModel({ userEmail: userEmail, userName: userName, userPhone: userPhone });

    try
    {
        await user.save();
        res.send("uploaded")
    } catch (error)
    {
        console.log(error);
    }
});
app.get('/read', async (req, res) =>
{
    UserModel.find({}, (err, data) =>
    {
        if (err)
        {
            res.send(err);
        }
        res.send(data);
    })
});
app.put('/update', async (req, res) =>
{
    const newData = req.body.newData;
    const id = req.body.id;
    try
    {
        await UserModel.findById(id, (error, updatedUser) =>
        {
            updatedUser.userEmail = newData;
            updatedUser.save();
            res.send("update");
        })
    } catch (error)
    {
        console.log(error);
    }
});
app.delete("/delete/:id", async (req, res) =>
{
    const id = req.params.id;

    await UserModel.findByIdAndRemove(id).exec();
    res.send("deleted");
})

app.listen(3001, () =>
{
    console.log(`server running on PORT 3001...`);
});