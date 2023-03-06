const {
    json
} = require("express");
const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../models/order');

router.post('/', (req, res, next) => {

    const orders = new Order({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });

    if (req.body.hasOwnProperty('name') && req.body.hasOwnProperty('price')) {
        orders.save().then(result => {
            console.log(result);
        }).catch(err => console.log(err));

        res.status(200).json({
            success: true,
            error: null,
            data: orders
        });
    } else {
        res.status(500).json({
            success: false,
            error: ["missing params"],
            data: null
        });
    }
});


router.get('/:orderId', (req, res, next) => {

    const id = req.params.orderId;
    console.log(id);
    Order.findById(id).exec().then(doc => {

        if (doc) {
            res.status(200).json({
                success: true,
                error: null,
                data: doc
            });
        } else {
            res.status(500).json({
                success: false,
                error: ["No data found with following id" + id],
                data: null
            });
        }

    }).catch(err => {
        res.status(500).json({
            success: false,
            error: ["No data found with following id" + id],
            data: null
        });
    });
});


router.delete('/:orderId', (req, res, next) => {
    const id = req.params.orderId;
    Order.deleteOne({
        _id: id
    }).exec().then(doc => {
        res.status(200).json({
            success: true,
            error: null,
            data: doc
        });
    }).catch(err => {
        res.status(500).json({
            success: false,
            error: ["not deleted"],
            data: null
        });
    });
    
    
});



module.exports = router;