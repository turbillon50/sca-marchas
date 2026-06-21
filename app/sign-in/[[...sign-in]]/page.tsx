import { SignIn } from "@clerk/nextjs";
import { AuthShell, AuthPlaceholder } from "@/components/AuthShell";
import { clerkEnabled } from "@/lib/clerk";

export default function SignInPage() {
  return (
    <AuthShell>
      {clerkEnabled ? <SignIn /> : <AuthPlaceholder mode="in" />}
    </AuthShell>
  );
}
