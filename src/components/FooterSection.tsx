const FooterSection = () => {
  return (
    <footer className="py-12 px-6 border-t border-border bg-background">
      <div className="container mx-auto max-w-4xl flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-heading text-lg font-semibold text-foreground">cvnest</p>
        <p className="text-xs text-muted-foreground tracking-wide">
          © {new Date().getFullYear()} cvnest. Free forever.
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;
