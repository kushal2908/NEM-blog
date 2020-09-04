const express = require('express');

//Importing BLOG Controller 
const blogController = require('../controller/blogController');

//Declaring router 
const router = express.Router();

/////////////////////////////////////////////////////////////////////////////////////////

//Showing all blog page 
router.get ('/blogs', blogController.blog_index)

//create blog fill-up page
router.get('/create/blog',blogController.blog_create )   

//Posting blog to the DB
router.post('/blogs', blogController.blog_post)

//Show each blogs in new path
router.get('/blogs/:id', blogController.blog_show_byId)

//DELETE a blog
router.delete('/blogs/:id', blogController.blog_delete)  

///////////////////////////////////////////////////////////////////////////////////////////

module.exports = router;
 