import { z } from "zod";

const validate = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    next();
  } catch (err) {
      return res.status(422).json({
        success: false,
        err,
      });
  }
};

export const createUserSchemaValidation = validate(
  z.object({
    body: z.object({
      name: z.string({
        required_error: "Name is required",
      }),
      email: z
        .string({
          required_error: "Email is required",
        })
        .email("Not a valid email"),
      password: z
        .string({
          required_error: "Password is required",
        })
        .min(6, "Password must be at least 6 characters long"),
    }),
  })
);

export const loginUserSchemaValidation = validate(
  z.object({
    body: z.object({
      email: z
        .string({
          required_error: "Email is required",
        })
        .email("Not a valid email"),
      password: z
        .string({
          required_error: "Password is required",
        })
        .min(6, "Password must be at least 6 characters long"),
    }),
  })
);
