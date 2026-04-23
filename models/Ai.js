import { checkSchema, validationResult } from "express-validator";

const schema = checkSchema({
  title: {
    in: ["query"],
    notEmpty: {
      errorMessage: "Title is required",
    },
    isString: {
      errorMessage: "Title must be a string",
    },
  },
});

export const validatePostContent = [
  schema,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];