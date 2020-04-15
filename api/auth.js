const express = require('express');
const router  = express.Router();
const User = require('../models/User');
const { check,validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');
const multer = require('multer') ; 
const { rootNodes,file_path }= require('./../config/config');

// @Route api/auth
// @desc Login user

router.post('/login',[
    check('email','Please enter a valid email').isEmail(),
    // password must be at least 5 chars long
    check('password','Please enter a password').exists()
],async (req, res) => {
    const errors = validationResult(req);

    console.log(req.body);
    
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.mapped()});
    }

    const { email,password } = req.body;

    try{
        let user = await User.findOne({ email });
         /*
          error format shuold be 
          "email" :{ msg: 'Invalid email'}}
          where email should be name of field for with the error whoulb be displayed from front side
          <Alert name="email />":
          */

        if(!user){
            return res.status(400).json({ errors: { "invalid_credential" :{ msg: 'Invalid Credentials'}} })
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials'}]})
        }
        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload,config.get('jwtSecretToken'),
        { expiresIn : 360000},
        (err, token) => {
             if(err) throw err;
             res.json({ token })
        });


    } catch(err) {
        console.error(err);
        res.status(500).send(err);
    }
})

//@route POST  api/register
//@desc Register user
router.post('/register', [
    check('name','Name is required').not().isEmpty(),
    check('email','Please enter a valid email').isEmail(),
    // password must be at least 5 chars long
    check('password','Please enter a password with 6 or more characters').isLength({ min: 5 })
  ], 
  async (req,res) => {
      const errors = validationResult(req);
      console.log(req.body);
    if(!errors.isEmpty()){
     return res.status(400).json({ errors: errors.mapped()});
    }

    const { name,email,password } = req.body;
    try{
        let user = await User.findOne({ email })

        if(user){
            return res.status(400).json({ errors: { "email" :{ msg: 'User already exist'}} })
        }
        
        user = new User({
           name,
           email,
           password
        });
      
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password,salt);

        await user.save();

        console.log(file_path)
        rootNodes.map(rootNode => {
            multer({ storage : 
              multer.diskStorage({
              destination: file_path+'/'+user.name+'_'+user.id+'/'+rootNode
            })
         })
        });
      
        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload,config.get('jwtSecretToken'),
        { expiresIn : 360000},
        (err, token) => {
             if(err) throw err;
             res.json({ token })
        });


    } catch(err) {
        console.error(err );
        res.status(500).send(err.message);
    }
 
});


//@route GET  api/auth
router.get('/',auth,
    async (req,res) => {
        console.log('req.user',req.user);

            try{
                const user = await User.findById(req.user.id).select('-password');
                res.json(user);
            } catch {
                res.status(500).json({msg:'fdf'});
            }
});

module.exports = router;