const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const massive = require('massive')

const FavsCtrl = require('./Controllers/FavsCtrl')
const RestCtrl = require('./Controllers/RestCtrl')
const AuthCtrl = require('./Controllers/AuthCtrl')
const path = require('path')

require('dotenv').config()

const app = express()
const port = process.env.SERVER_PORT

massive(process.env.CONNECTION_SESSION).then(db => {
    app.set('db', db)
    console.log(`Never gonna run around and desert db!`)
}).catch(err => console.log(err))

app.use( express.static( `${__dirname}/../build` ) );

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}))

app.use(bodyParser.json())

app.use((req, res, next) => {
    if(req.query.test === process.env.REQ_QUERY){
        req.session.user = {
            id: 4
        }
    }
    next()
})


app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '../build/index.html'));
});

//Auth
app.get('/auth/callback', AuthCtrl.auth)

app.get('/api/currentUser', (req, res) => {
    res.send(req.session.user.name)
})

app.get('/api/logout', AuthCtrl.logout)

//Food
app.get('/api/cuisineNames', RestCtrl.getCuisine)

//Favs
app.get('/api/favorites', FavsCtrl.getFavorites)
app.put('/api/favorite/desc/:restId', FavsCtrl.changeDesc)
app.post('/api/favorite/:restId', FavsCtrl.createFavorite)
app.delete('/api/favorite/delete/:restId', FavsCtrl.deleteFavorite)


// YELP API
app.post('/api/yelp', RestCtrl.getRest)
app.get('/api/yelp/:id', RestCtrl.getById)


app.listen(port, () => {
        console.log(`Never gonna give ${port} up, Never gonna let ${port} down`)
})