const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const isAuth = require('../middleware/is-auth')
const Product = require('../models/userDetail');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/profiles',isAuth, shopController.getProducts);

router.get('/profiles/:productId',isAuth, shopController.getProduct);

router.get('/favourites',isAuth, shopController.getCart);

router.post('/favourites',isAuth, shopController.postCart);

router.post('/cart-delete-item',isAuth, shopController.postCartDeleteProduct);

//my code
router.post('/profiles', function(req, res, next) {

    var religion = req.body.religion;
    var gender = req.body.gender;
    var country = req.body.country;
    
    if(religion !='' && gender !='' && country !='' ){
  
     var flterParameter={ $and:[{ religion:religion},
    {$and:[{gender:gender},{country:country}]}
    ]
     }
    }else
     if(religion !='' && gender =='' && country !=''){
      var flterParameter={ $and:[{ religion:religion},{country:country}]
         }
    }else if(religion =='' && gender !='' && country !=''){
  
      var flterParameter={ $and:[{gender:gender},{country:country}]
         }
    }else if(religion =='' && gender =='' && country !=''){
  
      var flterParameter={country:country
         }
    }else{
      var flterParameter={}
    }
    var filterBtn = Product.find(flterParameter);
    console.log(filterBtn);
    filterBtn.exec(function(err,products){
        if(err) throw err;
        res.render('shop/product-list', {
             pageTitle: 'Profiles', 
             prods:products,
             path: "/products",
        isAuthenticated: req.session.isLoggedIn             

             });
     //    console.log("hello")

          });
    
    
  });



module.exports = router;
