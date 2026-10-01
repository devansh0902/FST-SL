import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().trim().min(2, "Name must contain at least 2 characters."),
  email: z.string().trim().email("Use a valid email address."),
  team: z.string().trim().min(1, "Please choose a team."),
  message: z
    .string()
    .trim()
    .min(12, "Tell us a bit more so we can personalize the workflow.")
    .max(240, "Keep the summary under 240 characters."),
});

export type ProfileFormValue = z.infer<typeof profileSchema>;
