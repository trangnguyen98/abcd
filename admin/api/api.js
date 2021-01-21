var express = require("express");
var router = express.Router();
const prDb = require("../models/sanpham.model");
const userDb = require("../models/users.model");
const cartDb = require("../models/cart.model");
const jwt = require("jsonwebtoken"); // json web token

const encodedToken = data => {
  return jwt.sign(
    {
      iss: "jwt",
      sub: data,
      iat: new Date().getTime()
    },
    "nodejsApi"
  );
};

router.get("/products", async (req, res) => {
  let prs = await prDb.find();
  res.json(prs);
});

router.post("/login", async (req, res) => {
  let user = await userDb.findOne({ email: req.body.email });
  if (user) {
    if (user.password == req.body.password) {
      let token = encodedToken(user); // tao token
      return res.json({ token: token, user: user }).send("login success");
    } else {
      return res.status(400).json({ thongbao: "Sai mật khẩu" });
    }
  } else {
    return res.status(400).json({ thongbao: "Tài khoản không tồn tại" });
  }
});

//update giỏ hàng
router.put('/cart/:id', async (req, res) =>{
  await userDb.findOneAndUpdate({_id : req.params.id}, {$set:{cart : req.body}})
  return res.send('done')
})

// lay gio hang
router.get('/getCart/:id', async (req, res) =>{
  let cart =  (await userDb.findOne({_id : req.params.id})).cart
  res.json(cart)
})

router.post("/dangky", async (req, res) => {
  let user = await userDb.findOne({ email: req.body.email });
  if (!user) {
    await userDb.create(req.body);
    return res.status(200).send("done");
  } else {
    return res.json({ thongbao: "Tài khoản đã tồn tại" });
  }
});

router.get("/detail/:id", async (req, res) => {
  let id = req.params.id;
  let product = await prDb.findOne({ _id: id });
  return res.json(product);
});

router.post("/addCart", async (req, res) => {
    await cartDb.create(req.body)
    return res.status(200).send({status: 'Success'});
});

router.get('/getCartUser/:id', async (req, res) =>{
  let cart =  await cartDb.find({UserId : req.params.id})
  res.json(cart)
})

module.exports = router;
