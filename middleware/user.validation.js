import { number, z } from "zod";

const validate = (schema) => (req, res, next) => {
  try {
    schema.parse({
      file: req.file,
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
      role: z.literal("user"),
      password: z
        .string({
          required_error: "Password is required",
        })
        .min(6, "Password must be at least 6 characters long"),
    }),
  })
);

export const validateDonationRequest = validate(
  z.object({
    body: z.object({
      itemName: z.string({
        required_error: "Name is required",
      }),
      numberOfItems: z.coerce.number({
        required_error: "Number of items is required",
        default: 1,
      }),
      description: z.string({
        required_error: "Description is required",
      }),

      street: z.string({
        required_error: "Street is required",
      }),

      city: z.string({
        required_error: "City is required",
      }),

      region: z.string({
        required_error: "Region is required",
      }),

      latitude: z.coerce.number({
        required_error: "Latitude is required",
      }),
      longitude: z.coerce.number({
        required_error: "Longitude is required",
      }),
    }),

    file: z.object({
      mimetype: z
        .string()
        .refine(
          (type) => type.startsWith("image/"),
          "Only image files are allowed"
        ),

      size: z.number().max(3 * 1024 * 1024, "Image must be less than 3MB"),
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
