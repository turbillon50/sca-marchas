import { SignUp } from "@clerk/nextjs";
import { AuthShell, AuthPlaceholder } from "@/components/AuthShell";
import { clerkEnabled } from "@/lib/clerk";

export default function SignUpPage() {
  return (
    <AuthShell>
      {clerkEnabled ? <SignUp /> : <AuthPlaceholder mode="up" />}
    </AuthShell>
  );
}
