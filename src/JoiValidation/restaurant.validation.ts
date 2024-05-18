import * as Joi from "joi";
export const createRestaurantValidation = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required()
})
