//importing Schemas
const Blog = require ('../model/blog')

    // the blogs page which is '/blogs'
    const blog_index = (req,res) => {
        Blog.find().sort({createdAt: -1})
        .then((result)=>{
        res.render('blogs', {title: 'Blogs', blogs: result})
        })
        .catch((err)=>console.log(err))
    }

    // The create-blog form fill-up page  
    const blog_create = (req, res) => {
        res.render('create', {title: 'Create a new Blog'});
    }

    //Posting blog to the DB
    const blog_post = (req,res)=>{    

        const blog = new Blog (req.body) //re.body is the form data
        blog.save()
        .then((result)=>{
          res.redirect('/blogs')
        })
        .catch((err)=> console.log(err))
    }

    //show in a new URL 
    const blog_show_byId = (req,res)=> {

        const id = req.params.id;
            Blog.findById(id)
            .then((result)=>{
            res.render('single', {title: 'Signle Blog', blog: result})
            })
            .catch((err)=>console.log(err))
    }

    //DELETE a blog
    const blog_delete = (req,res)=> {

        const id = req.params.id;    
            Blog.findByIdAndDelete(id)
            .then((result)=>{
            res.json({ redirect: '/blogs' }) //we have to response in JSON then we can redirect.
            })
            .catch((err)=> console.log(err))
    }

    
module.exports = {
    blog_index,
    blog_create,
    blog_post,
    blog_show_byId,
    blog_delete
}

        



