const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = 5000
const dotenv = require('dotenv')
dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(port, () => console.log(`Server Running On ${port}`));

    /* ADDING DUMMY DATA ONE TIME FOR TEST */
    // User.insertMany(users);
    // Post.insertMany(posts);

}).catch((error) => console.log(`${error} not connected`));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require('./models/User')
require('./models/DataModel')
require('./models/SelfHosting')
app.use(require('./routes/Auth'))
app.use(require('./routes/Company'))
// app.use(require('./routes/Hosting'))

app.listen(PORT, () => {
    console.log("server is running on ", PORT)
})
