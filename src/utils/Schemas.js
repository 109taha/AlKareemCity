import joi from "joi";

// USER
const userSchema = joi
  .object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(5).max(20).required(),
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
  totalNumberOfPlot: joi.number().required(),
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
const PlotSchema = joi.object({
  plotNumber: joi.string().required(),
  BlockNumber: joi.string().hex().length(24),
  type: joi.string().required().valid("commercial", "residential"),
  sqYard: joi.number().required(),
  details: joi.string().required(),
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
const PlansSchema = joi.object({
  plotId: joi.string().hex().length(24),
  blockId: joi.string().hex().length(24),
  bookingAmount: joi.number().required(),
  instalmentAmount: joi.number().required(),
  investmentMonth: joi.number().required(),
  extraPaymentTerm: joi.number().required(),
  possessionAmount: joi.number().required(),
});

const planJoi = (req, res, next) => {
  const { error } = PlansSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({ error });
  } else {
    next();
  }
};

export { UserJoi, AdminJoi, blockJoi, planJoi, plotJoi };
