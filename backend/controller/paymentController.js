const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const asyncHandler = require("express-async-handler");

exports.postPaymentToStripe = asyncHandler(async (req, res, next) => {
  stripe.charges.create(
    {
      source: req.body.tokenId.id,
      amount: req.body.amount,
      currency: "usd",
    },
    (error, respose) => {
      if (!error) {
        res.status(200).json(respose);
      } else {
        res.status(500);
        next(new Error(error));
      }
    }
  );
});
