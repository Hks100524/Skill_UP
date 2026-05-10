export default function TermsAndConditions() {
  return (
    <main className="min-h-[calc(100vh-5rem)] bg-[#fcfbff] px-6 py-16 dark:bg-[#0d0c13] sm:px-8 lg:px-10">
      <div className="mx-auto max-w-4xl rounded-[2rem] border border-black/5 bg-white/90 p-8 shadow-[0_30px_80px_-50px_rgba(15,15,15,0.45)] backdrop-blur dark:border-white/10 dark:bg-white/5 sm:p-10">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-foreground/50">
            Legal
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-foreground sm:text-4xl">
            Terms and Conditions
          </h1>
          <p className="mt-4 text-sm leading-7 text-foreground/65 sm:text-base">
            These terms explain how Skill_up can be used. By continuing to use the platform,
            you agree to follow them.
          </p>
        </div>

        <div className="mt-10 grid gap-6">
          <section className="rounded-2xl border border-black/5 bg-background/85 p-6 dark:border-white/10 dark:bg-white/5">
            <h2 className="text-lg font-semibold text-foreground">1. Use of the service</h2>
            <p className="mt-3 text-sm leading-7 text-foreground/65">
              Use the platform responsibly and keep your activity aligned with applicable laws
              and community guidelines.
            </p>
          </section>

          <section className="rounded-2xl border border-black/5 bg-background/85 p-6 dark:border-white/10 dark:bg-white/5">
            <h2 className="text-lg font-semibold text-foreground">2. Accounts</h2>
            <p className="mt-3 text-sm leading-7 text-foreground/65">
              You are responsible for maintaining the security of your account and for any
              activity that happens under your login.
            </p>
          </section>

          <section className="rounded-2xl border border-black/5 bg-background/85 p-6 dark:border-white/10 dark:bg-white/5">
            <h2 className="text-lg font-semibold text-foreground">3. Changes</h2>
            <p className="mt-3 text-sm leading-7 text-foreground/65">
              We may update these terms from time to time. Continued use of Skill_up means you
              accept the latest version.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
