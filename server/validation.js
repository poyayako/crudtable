const Joi = require('Joi');

const productsValidation = data => {
    
    const { prodName,prodCategory,prodDescription,prodPrice,prodSize } = data;

    const schema = Joi.object({
        productname: Joi.string().min(3).required(),
        productcategory: Joi.number().max(11).required(),
        productdescription: Joi.string().min(10).required(),
        productprice: Joi.number().required(),
        productsize: Joi.number().min(1).max(11).required()
    });

    return schema.validate({ 
        productname: prodName,
        productcategory:prodCategory,
        productdescription:prodDescription,
        productprice:prodPrice,
        productsize:prodSize
    });

}

module.exports.productsValidation = productsValidation;
