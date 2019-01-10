const router =require('express').Router()
const passport = require('../helpers/passport')
const User = require('../models/User')
var Web3 = require('web3');
//var web3 = new Web3(Web3.givenProvider || "ws://localhost:8546");
var web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/GfgWbe8c2O82N18RRSuJ'));

const isAuth = (req,res,next)=>{
  if(req.isAuthenticated())return next()
  return res.status(403).json({message:'No pasaras!!!'})
}

router.post('/signup',(req,res,next)=>{
  var blockchain = web3.eth.accounts.create();
  var balance = web3.eth.accounts.getBalance(req.user.blockchain.address)
  User.register({ 
    email: req.body.email,
    usertype: req.body.usertype ,
    bank:{
      name: req.body.name,
      bank: req.body.bank,
      number: req.body.number,
      currency:req.body.currency,
      country: req.body.country
    },
    blockchain:{
      address: blockchain.address,
      private: blockchain.privateKey
    }
  } , req.body.password)
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

//logout
router.get('/logout',(req,res,next)=>{
  //req.user.blockchain.address

  
 // console.log(balance.toNumber())
  req.logOut()
  res.status(200).json({message:'Logged out successfully'})
})

//profile

router.get("/profile/:id", isAuth, (req, res, next) => {
  const { id } = req.params;
  User.findById(req.params.id)
    .then(response => {
      return res.status(201).json(response);
    })
    .catch(e => res.json(e));
});

//edit profile

router.put("/profile/edit/:id", isAuth, (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    .then(user => {
      res.status(200).json(user);
    })
    .catch(e => res.status(500).json(e));
});

router.put("/balance", isAuth, (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    .then(user => {
      res.status(200).json(user);
    })
    .catch(e => res.status(500).json(e));
});


module.exports = router
