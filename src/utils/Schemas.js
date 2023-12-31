const joi = require("joi");
const JoiObjectId = require("joi-objectid");

const myJoiObjectId = JoiObjectId(joi);

// USER
const userSchema = joi
  .object({
    name: joi.string().required(),
    CNIC: joi.string().required(),
    fatherName: joi.string(),
    address: joi.string(),
    nationality: joi.string(),
    country: joi.string(),
    area: joi.string(),
    DOB: joi.string(),
    email: joi.string().required(),
    uniqueId: joi.string().required(),
    hash_password: joi.string().min(5).max(20).required(),
  })
  .unknown(true);

const UserJoi = (req, res, next) => {
  const { error } = userSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({ error });
  } else {
    next();
  }
};

// ADMIN
const AdminSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(5).max(20).required(),
});

const AdminJoi = (req, res, next) => {
  const { error } = AdminSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({ error });
  } else {
    next();
  }
};

// BLOCK
const BlockSchema = joi.object({
  blockName: joi.string().required(),
  plotStartNumber: joi.number().required(),
  plotEndNumber: joi.number().required(),
});

const blockJoi = (req, res, next) => {
  const { error } = BlockSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({ error });
  } else {
    next();
  }
};

// PLOT
const PlotArraySchema = joi.array().items(
  joi.object({
    plotNumber: joi.string().required(),
    BlockNumber: myJoiObjectId().required(),
    type: joi.string().required().valid("commercial", "residential"),
    sqYard: joi.number().required(),
    feature: joi.string(),
    details: joi.string(),
    price: joi.number().required(),
  })
);

const plotJoiArray = (req, res, next) => {
  const { error } = PlotArraySchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({ error });
  } else {
    next();
  }
};

// PLOT
const PlotSchema = joi.object({
  plotNumber: joi.string().required(),
  BlockNumber: myJoiObjectId().required(),
  type: joi.string().required().valid("commercial", "residential"),
  sqYard: joi.number().required(),
  feature: joi.string(),
  details: joi.string(),
  price: joi.number().required(),
});

const plotJoi = (req, res, next) => {
  const { error } = PlotSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({ error });
  } else {
    next();
  }
};

// PLANS
const PlansSchema = joi
  .object({
    bookingAmount: joi.number().required(),
    instalmentAmount: joi.number().required(),
    investmentMonth: joi.number().required(),
    extraPaymentTerm: joi.number().required(),
    extraPaymentAmount: joi.number().required(),
    possessionAmount: joi.number().required(),
    plotId: myJoiObjectId().required(),
  })
  .unknown(true);

const planJoi = (req, res, next) => {
  const { error } = PlansSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({ error });
  } else {
    next();
  }
};

const authJoi = joi.object({
  email: joi.string().required(),
  password: joi.string().required(),
});

const mailSchema = joi.object({
  name: joi.string().required(),
  subject: joi.string().required(),
  from: joi.string().email().required(),
  data: joi.object().required(),
});

const mailJoi = (req, res, next) => {
  const { error } = mailSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({ error });
  } else {
    next();
  }
};

module.exports = {
  UserJoi,
  AdminJoi,
  blockJoi,
  planJoi,
  plotJoi,
  plotJoiArray,
  authJoi,
  mailJoi,
};
