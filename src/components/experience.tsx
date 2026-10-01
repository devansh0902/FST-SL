"use client";

import * as React from "react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { ArrowRight, Check, Database, Lock, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { useTheme } from "next-themes";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ThemeToggle } from "@/components/theme-toggle";
import { useCartStore, catalogItems } from "@/lib/store";
import { profileSchema, type ProfileFormValue } from "@/lib/validation";
import { submitProfile, type FormState } from "@/app/actions";

const categoryOptions = ["All", "Automation", "Analytics", "Security", "Operations"] as const;

const statusCards = [
  { label: "Hydration confidence", value: "96%" },
  { label: "Cart persistence", value: "Zustand" },
  { label: "Validation coverage", value: "Zod + RHF" },
];

const architectureCards = [
  {
    title: "RSC & hydration boundary",
    detail: "Server-rendered layout shells stay static while interactive state is isolated to client boundaries.",
    icon: Sparkles,
  },
  {
    title: "Data and auth",
    detail: "Route handlers, middleware gates, and Prisma-backed models protect the transaction lifecycle.",
    icon: Lock,
  },
  {
    title: "Delivery events",
    detail: "Resend webhooks feed delivery and bounce logs back into the relational store for monitoring.",
    icon: Database,
  },
];

export function Experience() {
  const { resolvedTheme } = useTheme();
  const cart = useCartStore((state) => state.cart);
  const filters = useCartStore((state) => state.filters);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const clearCart = useCartStore((state) => state.clearCart);
  const setCategory = useCartStore((state) => state.setCategory);
  const setSort = useCartStore((state) => state.setSort);

  const [status, setStatus] = React.useState<FormState | null>(null);
  const [isSaving, setIsSaving] = React.useState(false);

  const filteredItems = React.useMemo(() => {
    const next = [...catalogItems];
    const byCategory = filters.category === "All" ? next : next.filter((item) => item.category === filters.category);

    return byCategory.sort((a, b) => {
      if (filters.sort === "price-asc") return a.price - b.price;
      if (filters.sort === "price-desc") return b.price - a.price;
      return 0;
    });
  }, [filters]);

  const form = useForm<ProfileFormValue>({
    mode: "onBlur",
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      email: "",
      team: "",
      message: "",
    },
  });

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  async function handleSubmit(values: ProfileFormValue) {
    setIsSaving(true);
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => formData.append(key, value));

    const nextStatus = await submitProfile(undefined, formData);
    setStatus(nextStatus);
    setIsSaving(false);
  }

  return (
    <div className="studio-page mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="studio-header flex items-center justify-between rounded-full border border-white/10 bg-slate-800/85 px-4 py-3 shadow-[0_12px_30px_rgba(15,23,42,0.18)] backdrop-blur-xl dark:border-slate-700 dark:bg-slate-800/85">
        <div className="flex items-center gap-3">
          <div className="studio-brand-mark flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 via-cyan-500 to-blue-600 text-lg font-bold text-white shadow-lg shadow-sky-500/30">
            A
          </div>
          <div>
            <p className="studio-brand-name text-[2.2rem] font-black tracking-[0.12em] text-sky-300 sm:text-[2.5rem]">AURORAFLOW</p>
            <p className="studio-brand-caption text-xs text-slate-300">Operations, made legible.</p>
          </div>
        </div>
        <nav className="studio-nav hidden items-center gap-7 text-sm font-medium text-slate-200 md:flex">
          <a href="#features" className="transition hover:text-white">Features</a>
          <a href="#store" className="transition hover:text-white">Store</a>
          <a href="#form" className="transition hover:text-white">Mutation form</a>
        </nav>
        <ThemeToggle />
      </header>

      <main className="studio-main space-y-10 pb-16">
        <section className="studio-hero grid gap-6 rounded-[32px] border border-white/10 bg-slate-800/70 p-6 shadow-[0_30px_80px_rgba(15,23,42,0.26)] backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/70 lg:grid-cols-[1.35fr_0.65fr] lg:p-8">
          <div className="space-y-6">
            <div className="studio-kicker inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-sky-300">
              <ShieldCheck className="h-3.5 w-3.5" />
              Next.js full-stack architecture
            </div>
            <div className="space-y-4">
              <h1 className="studio-title max-w-xl text-5xl font-black tracking-[-0.06em] text-white sm:text-6xl">
                Build the systems that move <span className="studio-title-accent">work</span> forward.
              </h1>
              <p className="studio-lede max-w-lg text-base leading-7 text-slate-300">
                One calm workspace for sharper operations: understand the signal, choose the right tools, and send a request without losing the thread.
              </p>
            </div>
            <div className="studio-actions flex flex-wrap gap-3">
              <a href="#store" className="studio-primary-button inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-400 to-blue-500 px-5 py-3 text-base font-semibold text-slate-950 shadow-lg shadow-sky-500/30 transition hover:brightness-110">
                Launch workflow <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#features" className="studio-secondary-button rounded-full border border-white/10 bg-slate-700/80 px-5 py-3 text-base font-semibold text-slate-100 transition hover:bg-slate-600">
                Review architecture
              </a>
            </div>
            <div className="studio-metrics grid gap-3 sm:grid-cols-3">
              {statusCards.map((card) => (
                <div key={card.label} className="studio-metric rounded-2xl border border-border bg-white/70 p-4 dark:bg-slate-900/70">
                  <p className="studio-metric-value text-2xl font-black text-slate-900 dark:text-white">{card.value}</p>
                  <p className="studio-metric-label mt-2 text-xs uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">{card.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="studio-console rounded-[28px] border border-border bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 p-5 text-white shadow-2xl shadow-sky-500/10">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="studio-console-eyebrow text-xs uppercase tracking-[0.2em] text-sky-300">System status / 01</p>
                <p className="mt-2 text-2xl font-black">Operational</p>
              </div>
              <div className="rounded-full bg-emerald-400/20 p-2 text-emerald-300">
                <Check className="h-5 w-5" />
              </div>
            </div>
            <div className="space-y-4">
              {[
                { label: "Middleware gates", value: "Protected" },
                { label: "Prisma seeding", value: "Ready" },
                { label: "Transactional email", value: "Linked" },
              ].map((item) => (
                <div key={item.label} className="studio-console-row rounded-2xl border border-white/10 bg-white/4 p-3">
                  <div className="flex items-center justify-between text-sm text-slate-200">
                    <span>{item.label}</span>
                    <span className="font-semibold text-sky-300">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="studio-console-note mt-6 rounded-2xl border border-sky-500/30 bg-sky-500/10 p-4 text-sm text-sky-100">
              <p className="font-semibold">Hydration-safe default</p>
              <p className="mt-2 text-sky-200/90">{resolvedTheme === "dark" ? "Dark" : "Light"} mode is active while avoiding visual mismatch for server-rendered layout shell content.</p>
            </div>
          </div>
        </section>

        <section id="features" className="studio-capabilities grid gap-4 md:grid-cols-3">
          {architectureCards.map(({ title, detail, icon: Icon }) => (
            <article key={title} className="studio-capability rounded-[26px] border border-border bg-white/90 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)] dark:bg-slate-900/75">
              <div className="studio-capability-icon mb-4 inline-flex rounded-xl bg-sky-100 p-3 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300">
                <Icon className="h-5 w-5" />
              </div>
              <h2 className="studio-capability-title text-xl font-bold text-slate-900 dark:text-white">{title}</h2>
              <p className="studio-capability-detail mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{detail}</p>
            </article>
          ))}
        </section>

        <section id="store" className="studio-store grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="studio-catalog rounded-[30px] border border-border bg-card/75 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="studio-section-label text-xs uppercase tracking-[0.18em] text-sky-500">The toolkit / 04 products</p>
                <h2 className="studio-section-title mt-2 text-2xl font-black text-slate-900 dark:text-white">Choose your tools</h2>
              </div>
              <div className="flex items-center gap-3">
                <label className="text-sm text-slate-500 dark:text-slate-400">Sort by</label>
                <select
                  value={filters.sort}
                  onChange={(event) => setSort(event.target.value as typeof filters.sort)}
                  className="studio-select rounded-full border border-border bg-white/80 px-3 py-2 text-sm text-slate-700 outline-none ring-0 dark:bg-slate-900/70 dark:text-slate-200"
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: low to high</option>
                  <option value="price-desc">Price: high to low</option>
                </select>
              </div>
            </div>

            <div className="mb-5 flex flex-wrap gap-3">
              {categoryOptions.map((category) => (
                <label
                  key={category}
                  className="studio-filter inline-flex cursor-pointer items-center gap-2 rounded-full border border-border bg-white/70 px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  <Checkbox.Root
                    checked={filters.category === category}
                    onCheckedChange={() => setCategory(category)}
                    className="studio-filter-checkbox flex h-4 w-4 items-center justify-center rounded border border-slate-300 bg-white data-[state=checked]:bg-sky-500 dark:border-slate-600 dark:bg-slate-800"
                  >
                    <Checkbox.Indicator>
                      <Check className="h-3 w-3 text-white" />
                    </Checkbox.Indicator>
                  </Checkbox.Root>
                  {category}
                </label>
              ))}
            </div>

            <div className="studio-products grid gap-4 md:grid-cols-2">
              {filteredItems.map((item) => (
                <article key={item.id} className="studio-product overflow-hidden rounded-[24px] border border-border bg-white/80 dark:bg-slate-900/80">
                  <div className={`studio-product-art h-24 bg-gradient-to-r ${item.accent}`} />
                  <div className="p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="studio-tag rounded-full bg-slate-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                        {item.badge}
                      </span>
                      <span className="text-sm text-slate-500 dark:text-slate-400">{item.category}</span>
                    </div>
                    <h3 className="studio-product-title text-xl font-bold text-slate-900 dark:text-white">{item.name}</h3>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="studio-product-price text-lg font-black text-slate-900 dark:text-white">${item.price}</span>
                      <button
                        type="button"
                        onClick={() => addToCart(item)}
                        className="studio-add-button inline-flex items-center gap-2 rounded-full bg-slate-950 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-800 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400"
                      >
                        Add to cart <Zap className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="studio-cart rounded-[30px] border border-border bg-white/90 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)] dark:bg-slate-900/75">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="studio-cart-label text-xs uppercase tracking-[0.18em] text-sky-500">Your selection</p>
                <h2 className="studio-cart-title mt-2 text-2xl font-black text-slate-900 dark:text-white">Cart</h2>
              </div>
              <div className="studio-cart-count rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                {cart.length} items
              </div>
            </div>

            <div className="space-y-3">
              {cart.length === 0 ? (
                <div className="studio-cart-empty rounded-2xl border border-dashed border-border p-5 text-sm text-slate-500 dark:text-slate-400">
                  Your cart is empty. Add a product to see persistent state behavior.
                </div>
              ) : (
                cart.map((item, index) => (
                  <div key={`${item.id}-${index}`} className="studio-cart-item flex items-center justify-between rounded-2xl border border-border bg-white/80 p-3 dark:bg-slate-900/70">
                    <div>
                      <p className="studio-cart-item-name font-medium text-slate-900 dark:text-white">{item.name}</p>
                      <p className="studio-cart-item-category text-xs text-slate-500 dark:text-slate-400">{item.category}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="studio-cart-total font-semibold text-slate-900 dark:text-white">${item.price}</span>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="text-xs font-medium text-rose-500 transition hover:text-rose-600"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-6 border-t border-border pt-4">
              <div className="studio-cart-subtotal mb-3 flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
                <span>Subtotal</span>
                <span className="studio-cart-total font-semibold text-slate-900 dark:text-white">${total}</span>
              </div>
              <button
                type="button"
                onClick={clearCart}
                className="studio-cart-clear w-full rounded-full border border-border bg-white/80 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:bg-slate-900/80 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Clear cart
              </button>
            </div>
          </aside>
        </section>

        <section id="form" className="studio-form-layout grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="studio-request-form rounded-[30px] border border-border bg-card/75 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
            <div className="mb-5">
              <p className="studio-section-label text-xs uppercase tracking-[0.18em] text-sky-500">Make it happen / 01</p>
              <h2 className="studio-section-title mt-2 text-2xl font-black text-slate-900 dark:text-white">Tell us what you need</h2>
            </div>

            <form
              className="space-y-4"
              onSubmit={form.handleSubmit(handleSubmit)}
              noValidate
            >
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-slate-700 dark:text-slate-200">Name</label>
                  <input
                    id="name"
                    {...form.register("name")}
                    placeholder="Aarav Shenoy"
                    className="studio-input w-full rounded-2xl border border-border bg-white/80 px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-sky-400 dark:bg-slate-950/70 dark:text-white"
                  />
                  {form.formState.errors.name && <p className="text-xs text-rose-500">{form.formState.errors.name.message}</p>}
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-200">Email</label>
                  <input
                    id="email"
                    type="email"
                    {...form.register("email")}
                    placeholder="team@auroraflow.dev"
                    className="studio-input w-full rounded-2xl border border-border bg-white/80 px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-sky-400 dark:bg-slate-950/70 dark:text-white"
                  />
                  {form.formState.errors.email && <p className="text-xs text-rose-500">{form.formState.errors.email.message}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="team" className="text-sm font-medium text-slate-700 dark:text-slate-200">Target team</label>
                <select
                  id="team"
                  {...form.register("team")}
                  className="studio-input w-full rounded-2xl border border-border bg-white/80 px-4 py-3 text-slate-900 outline-none focus:border-sky-400 dark:bg-slate-950/70 dark:text-white"
                  defaultValue=""
                >
                  <option value="" disabled>Select a team</option>
                  <option value="Product">Product</option>
                  <option value="Platform">Platform</option>
                  <option value="Operations">Operations</option>
                  <option value="Security">Security</option>
                </select>
                {form.formState.errors.team && <p className="text-xs text-rose-500">{form.formState.errors.team.message}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-slate-700 dark:text-slate-200">Workflow brief</label>
                <textarea
                  id="message"
                  rows={4}
                  {...form.register("message")}
                  placeholder="Describe your onboarding, automation, or compliance scenario."
                  className="studio-input w-full rounded-2xl border border-border bg-white/80 px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-sky-400 dark:bg-slate-950/70 dark:text-white"
                />
                {form.formState.errors.message && <p className="text-xs text-rose-500">{form.formState.errors.message.message}</p>}
              </div>

              <div className="flex items-center justify-between gap-4 pt-2">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="studio-form-submit inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400"
                >
                  {isSaving ? "Submitting…" : "Submit workflow request"}
                </button>
                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                  <ShieldCheck className="h-4 w-4 text-emerald-500" />
                  Secure by default
                </div>
              </div>
            </form>

            {status && (
              <div
                className={`mt-5 rounded-2xl border p-4 text-sm ${
                  status.ok
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300"
                    : "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-300"
                }`}
              >
                {status.message}
              </div>
            )}
          </div>

          <div className="studio-overview rounded-[30px] border border-border bg-slate-950 p-5 text-white shadow-[0_18px_40px_rgba(15,23,42,0.16)]">
            <p className="text-xs uppercase tracking-[0.18em] text-sky-300">Behind the workflow</p>
            <h2 className="mt-2 text-2xl font-black">Secure backend pipeline</h2>
            <div className="mt-5 space-y-4">
              <div className="studio-overview-item rounded-2xl border border-white/10 bg-white/4 p-4">
                <div className="studio-overview-item-title mb-2 flex items-center gap-2 text-sky-300"><Database className="h-4 w-4" /> Prisma schema</div>
                <p className="studio-overview-item-copy text-sm text-slate-300">Users, roles, transactions, and audit logs stay normalized and seeding-ready for local or cloud PostgreSQL.</p>
              </div>
              <div className="studio-overview-item rounded-2xl border border-white/10 bg-white/4 p-4">
                <div className="studio-overview-item-title mb-2 flex items-center gap-2 text-sky-300"><Lock className="h-4 w-4" /> Middleware gate</div>
                <p className="studio-overview-item-copy text-sm text-slate-300">Edge routing and protected handlers authorize guests, members, and admins before route resolution.</p>
              </div>
              <div className="studio-overview-item rounded-2xl border border-white/10 bg-white/4 p-4">
                <div className="studio-overview-item-title mb-2 flex items-center gap-2 text-sky-300"><Sparkles className="h-4 w-4" /> Email lifecycle</div>
                <p className="studio-overview-item-copy text-sm text-slate-300">Resend notifications and webhook auditing keep delivery states visible across the service boundary.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
