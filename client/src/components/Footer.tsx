export default function Footer() {
  return (
    <footer className="py-4 bg-background border-t border-border">
      <div className="container mx-auto px-6 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-sm font-mono uppercase tracking-widest text-foreground/50">
          © {new Date().getFullYear()} Hrishikesh Yadav
        </div>

        <div className="flex gap-6">
          <a href="https://x.com/rishiicreates" className="text-sm font-mono uppercase tracking-widest text-foreground/50 hover:text-accent transition-colors">Twitter (X)</a>
          <a href="https://www.linkedin.com/in/hrishikesh-yadav-b4a736360/" className="text-sm font-mono uppercase tracking-widest text-foreground/50 hover:text-accent transition-colors">LinkedIn</a>
          <a href="https://www.instagram.com/rishiicreatess/" className="text-sm font-mono uppercase tracking-widest text-foreground/50 hover:text-accent transition-colors">Instagram</a>
          <a href="mailto:rishiicreates@icloud.com" className="text-sm font-mono uppercase tracking-widest text-foreground/50 hover:text-accent transition-colors">Email</a>
        </div>
      </div>
    </footer>
  );
}
