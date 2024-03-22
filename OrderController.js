const Order = require('../../models/OrderModel');

exports.AddOrder= async (req,res)=>{
    let customer_id = req.body.user;
    let adressDetails = req.body.adressDetails;
    let products = req.body.products;
    let total = req.body.total;

    let existingOrder ={};
    for (const product of products) {
         existingOrder = await Order.findOne({
          customer_id: customer_id,
          'products.productId': product.productId, 
        });

    if(existingOrder){
      return res.status(400).json({success : false , message : "Already exists"});
    }   


    let order = await Order.create({customer_id,products, adressDetails , total});
    return res.status(200).json({success : true , message : "Order entered" , order});
    };

}
