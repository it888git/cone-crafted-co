import { useState } from "react";
import { toast } from "sonner";

interface NewsletterFormProps {
  variant?: "hero" | "footer";
}

const NewsletterForm = ({ variant = "hero" }: NewsletterFormProps) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      toast.error("Please enter a valid email address");
      return;
    }
    setLoading(true);
    // Simulate subscribe (no backend yet)
    await new Promise((r) => setTimeout(r, 800));
    toast.success("Thanks for subscribing! 🎉");
    setEmail("");
    setLoading(false);
  };

  if (variant === "footer") {
    return (
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 bg-background/10 border border-background/20 rounded-l-md px-3 py-2 text-sm font-sans placeholder:opacity-40 focus:outline-none focus:border-accent"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-accent text-accent-foreground px-4 py-2 rounded-r-md text-sm font-sans font-medium hover:bg-accent/90 transition-opacity disabled:opacity-50"
        >
          {loading ? "..." : "Join"}
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-sm mx-auto">
      <input
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 min-w-0 bg-primary-foreground/10 border border-primary-foreground/20 rounded-l-lg px-4 py-3 text-sm font-sans text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-primary-foreground/50"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-accent text-accent-foreground px-6 py-3 rounded-r-lg text-sm font-sans font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {loading ? "..." : "Subscribe"}
      </button>
    </form>
  );
};

export default NewsletterForm;
