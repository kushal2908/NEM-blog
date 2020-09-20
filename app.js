const express = require ('express');
const morgan = require('morgan')
const mongoose = require('mongoose');

//routes Import
const blogRoutes = require('./routes/blogRoutes')

//importing Schemas
const Blog = require ('./model/blog') //for index page blogs otherwise we dont need to import this

//Connection to MongoDB
dbURI=" YOUR_MONGODB_ATLAS_URI ";
mongoose.connect(dbURI, {useNewUrlParser: true , useUnifiedTopology: true})
  .then( () => console.log('Connected to DB'))
  .catch ( (err) => console.log(err));

//express app
const app = express();

//view engine
app.set('view engine', 'ejs');

//Middlewares
app.use(express.static('public')) //static file
app.use(morgan('dev')); //logger
app.use(express.urlencoded({ extended: true })) // posting form data to the DB via web 



// ==================================================================================================================================
//    ROUTES
// ==================================================================================================================================

  //index page
  app.get('/', (req, res) => {

    Blog.find().sort({createdAt: -1})
    .then((result) =>{
        res.render('index', {title: 'index',  blogs: result})
    })
    .catch((err)=>console.log(err))
  })

  //about page
  app.get('/about',  (req, res) => {
    res.render('about', {title: 'About'})
  })

  //blogs
  //it will use as middleware
  app.use(blogRoutes)


  //404
  app.use((req,res)=>{
    res.status(404).render('404', {title: 'Oh crap!!'})
  })

  //server
  const port = 3000;
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
