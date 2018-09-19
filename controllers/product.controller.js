const Product = require('../models/product.model');

// //Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

// controllers/products.js
exports.product_create = function (req, res) {
    console.log('hit product');

    let product = new Product(
        {
            name: req.body.name,
            price: req.body.price
        }
    );
    console.log(product);
    
    product.save(function (err) {
        console.log(err);
        if (err) {
            return next(err);
        }
        res.send('Product Created successfully')
    })
};

// Find a single product with a id
exports.product_details = (req, res) => {
    Product.findById(req.params.id)
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.id
            });            
        }
        res.send(product);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.id
        });
    });
};

// Retrieve and return all product from the database.
exports.all_product = (req, res) => {
    console.log('hit all product');

    Product.find()
    .then(products => {
        res.send(products);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};
