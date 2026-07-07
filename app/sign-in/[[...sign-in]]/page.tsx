import { SignIn } from "@clerk/nextjs";
import { AuthShell, AuthPlaceholder } from "@/components/AuthShell";
import { clerkEnabled } from "@/lib/clerk";

export default function SignInPage() {
  return (
    <AuthShell>
      {clerkEnabled ? <SignIn fallbackRedirectUrl="/mis-ordenes" /> : <AuthPlaceholder mode="in" />}
    </AuthShell>
  );
}
