import Magnetic from "@/components/Magnetic";

export default function Footer() {
  return (
    <footer className="pt-8 pb-28 md:pb-12 bg-background border-t border-border">
      <div className="container mx-auto px-6 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-sm font-mono uppercase tracking-widest text-foreground/50">
          © {new Date().getFullYear()} Hrishikesh
        </div>

        <div className="flex gap-6 flex-wrap md:flex-nowrap">
          <Magnetic><a href="https://github.com/rishiiicreates" className="text-sm font-mono uppercase tracking-widest text-foreground/50 hover:text-accent transition-colors block">GitHub</a></Magnetic>
          <Magnetic><a href="https://x.com/rishiicreates" className="text-sm font-mono uppercase tracking-widest text-foreground/50 hover:text-accent transition-colors block">Twitter (X)</a></Magnetic>
          <Magnetic><a href="https://www.linkedin.com/in/hrishikesh-yadav-b4a736360/" className="text-sm font-mono uppercase tracking-widest text-foreground/50 hover:text-accent transition-colors block">LinkedIn</a></Magnetic>
          <Magnetic><a href="https://www.instagram.com/rishii.docx/" className="text-sm font-mono uppercase tracking-widest text-foreground/50 hover:text-accent transition-colors block">Instagram</a></Magnetic>
          <Magnetic><a href="mailto:rishiicreates@gmail.com" className="text-sm font-mono uppercase tracking-widest text-foreground/50 hover:text-accent transition-colors block">Email</a></Magnetic>
        </div>
      </div>
    </footer>
  );
}
