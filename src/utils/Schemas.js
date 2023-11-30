import joi from "joi";

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

export { UserJoi, AdminJoi };
