const router =require('express').Router()
const passport = require('../helpers/passport')
const User = require('../models/User')


const isAuth = (req,res,next)=>{
  if(req.isAuthenticated())return next()
  return res.status(403).json({message:'No pasaras!!!'})
}

router.post('/signup',(req,res,next)=>{
  User.register(req.body, req.body.password)
    .then(user=>{
      res.status(201).json(user)
    })
    .catch(e=>{
      res.status(500).json(e)
    })

})

router.post('/login',(req,res,next)=>{
  passport.authenticate('local',(err,user,info)=>{
    if(err)return res.status(500).json(info)
    if(!user) return res.status(404).json(info)
    req.login(user,err=>{
      return res.status(201).json(user)
    })
  })(req,res,next)
})


//profile
router.get('/profile',isAuth,(req,res,next)=>{
  return res.status(201).json(req.user) 
})

router.get('/logout',(req,res,next)=>{
  req.logOut()
  res.status(200).json({message:'Logged out successfully'})
})



module.exports = router
