import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type Mode = "signin" | "register";

const AuthModal = ({ open, onOpenChange }: AuthModalProps) => {
  const [mode, setMode] = useState<Mode>("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // UI mockup only — no real authentication
    await new Promise((r) => setTimeout(r, 600));
    setSubmitting(false);
    toast.info("Accounts coming soon", {
      description: "Customer accounts will be available in a future update.",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <DialogTitle className="font-sans text-2xl font-semibold tracking-tight">
            {mode === "signin" ? "Welcome back" : "Create your account"}
          </DialogTitle>
          <DialogDescription className="text-sm font-sans text-muted-foreground">
            {mode === "signin"
              ? "Sign in to track orders and sync your wishlist."
              : "Join Yarneria for faster checkout and saved favorites."}
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-2 mb-1 mt-2 border border-border rounded-full p-1 bg-muted/40">
          <button
            type="button"
            onClick={() => setMode("signin")}
            className={`flex-1 py-2 rounded-full text-sm font-sans font-medium transition-colors ${
              mode === "signin" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
            }`}
          >
            Sign in
          </button>
          <button
            type="button"
            onClick={() => setMode("register")}
            className={`flex-1 py-2 rounded-full text-sm font-sans font-medium transition-colors ${
              mode === "register" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
            }`}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 pt-2">
          {mode === "register" && (
            <div className="space-y-1.5">
              <Label htmlFor="auth-name" className="text-xs font-sans tracking-wide uppercase text-muted-foreground">
                Full name
              </Label>
              <Input
                id="auth-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                required
                style={{ fontSize: "16px" }}
              />
            </div>
          )}
          <div className="space-y-1.5">
            <Label htmlFor="auth-email" className="text-xs font-sans tracking-wide uppercase text-muted-foreground">
              Email
            </Label>
            <Input
              id="auth-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              style={{ fontSize: "16px" }}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="auth-password" className="text-xs font-sans tracking-wide uppercase text-muted-foreground">
              Password
            </Label>
            <Input
              id="auth-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={6}
              style={{ fontSize: "16px" }}
            />
          </div>

          {mode === "signin" && (
            <button
              type="button"
              onClick={() => toast.info("Accounts coming soon")}
              className="text-xs font-sans text-muted-foreground hover:text-foreground underline underline-offset-2"
            >
              Forgot password?
            </button>
          )}

          <Button
            type="submit"
            disabled={submitting}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-5 mt-2 text-sm font-sans font-semibold tracking-wide"
          >
            {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : mode === "signin" ? "Sign in" : "Create account"}
          </Button>

          <p className="text-[11px] font-sans text-muted-foreground text-center pt-1">
            Customer accounts are coming soon — your details are not stored yet.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
