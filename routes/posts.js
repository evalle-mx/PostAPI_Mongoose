const express = require('express');
const router = express.Router();


const Post = require('../models/Post');


// router.get('/posts', (req, res) =>{// defined on app.js > postsRoute
// router.get('/', (req, res) =>{
//     res.send('We are on posts');
// });

router.get('/', async (req, res) =>{
    console.log('GET');
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        res.json({message: error });
    }
});

router.post('/', async (req, res) =>{
    console.log('POST');
    //console.log(req.body);  //Requires a body-parser in main
    const post = new Post({
        title:req.body.title,
        description:req.body.description
    });

    try {
        const savedPost = await post.save();
        res.json(savedPost);    
    } catch (error) {
        res.json({message: error });
    }
    // post.save()
    //     .then( data => {
    //         res.status(200).json(data);
    //     })
    //     .catch( err => {
    //         res.json({message: err })
    //     });
    //res.send('We are on posts');
});

//READ Post by Param
router.get('/:postId', async (req, res) =>{
    console.log('READ');
     console.log(req.params.postId);
    try {
        const post = await Post.findById(req.params.postId)
        res.json(post);        
    } catch (err) {
        res.json({message: err });
    }
});

//Update
router.patch('/:postId', async (req, res) =>{    
    console.log('PATCH');
   try {
       const updPost = await Post.updateOne({_id:req.params.postId},
            {
                $set: {
                    title:req.body.title,
                    description:req.body.description
                }
            }
         );
       res.json(updPost);        
   } catch (err) {
       res.json({message: err });
   }
});

//Delete
router.delete('/:postId', async (req, res) =>{
    console.log('DELETE');
    console.log(req.params.postId);
   try {
       const postDel = await Post.deleteOne({_id:req.params.postId });
       res.json(postDel);        
   } catch (err) {
       res.json({message: err });
   }
});
module.exports = router;