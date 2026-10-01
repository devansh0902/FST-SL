"use server";

import { profileSchema } from "@/lib/validation";

export type FormState = {
  ok: boolean;
  message: string;
};

export async function submitProfile(_prevState: FormState | undefined, formData: FormData): Promise<FormState> {
  const raw = Object.fromEntries(formData.entries());
  const result = profileSchema.safeParse(raw);

  if (!result.success) {
    const firstIssue = result.error.issues[0];
    return {
      ok: false,
      message: firstIssue?.message ?? "Please review the form fields and try again.",
    };
  }

  await new Promise((resolve) => setTimeout(resolve, 600));

  return {
    ok: true,
    message: `Thanks ${result.data.name}! Your ${result.data.team.toLowerCase()} workflow has been queued for review.`,
  };
}
