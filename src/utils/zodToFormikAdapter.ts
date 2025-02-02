import { z } from "zod";

export const zodToFormikAdapter = (schema: z.ZodSchema) => {
  return (values: any) => {
    try {
      schema.parse(values); // Attempt to parse the values
      return {}; // No errors
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        // Map ZodError to Formik errors format
        const errors: Record<string, string> = {};
        err.errors.forEach((issue) => {
          if (issue.path.length > 0) {
            errors[issue.path[0]] = issue.message;
          }
        });
        return errors;
      }
      return {};
    }
  };
};
