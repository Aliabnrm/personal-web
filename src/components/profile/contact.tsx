import { ArrowUpRight, Github, Linkedin, Mail, Send } from "lucide-react";
import { site } from "@/lib/site";

export function Contact({ compact = false }: { compact?: boolean }) {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="contact-panel scroll-mt-8"
    >
      <div>
        <p className="eyebrow">LET’S CONNECT</p>
        <h2
          id="contact-title"
          className="mt-2 text-2xl font-semibold leading-snug tracking-tight sm:text-3xl"
        >
          A useful conversation starts with a shared problem.
        </h2>
        <p className="mt-4 max-w-xl text-sm text-muted">
          Interested in product engineering, thoughtful interfaces, or practical
          AI? Send me a question, an idea, or a project worth discussing.
        </p>
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <a href={`mailto:${site.email}`} className="contact-link">
          <Mail size={17} />
          {compact ? "Email me" : site.email}
          <ArrowUpRight size={14} />
        </a>
        <a
          href={site.linkedin}
          target="_blank"
          rel="noreferrer"
          className="contact-link"
        >
          <Linkedin size={17} />
          LinkedIn
          <ArrowUpRight size={14} />
        </a>
        <a
          href={site.telegram}
          target="_blank"
          rel="noreferrer"
          className="contact-link"
        >
          <Send size={17} />
          Telegram
          <ArrowUpRight size={14} />
        </a>
        <a
          href={site.github}
          target="_blank"
          rel="noreferrer"
          className="contact-link"
        >
          <Github size={17} />
          GitHub
          <ArrowUpRight size={14} />
        </a>
      </div>
    </section>
  );
}
