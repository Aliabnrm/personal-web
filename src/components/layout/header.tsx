"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useTheme } from "next-themes";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, Moon, Rss, Search, Sun, X } from "lucide-react";
import { navigation } from "@/lib/site";
import { cn } from "@/lib/utils";

function Identity() {
  return (
    <Link
      href="/"
      aria-label="AI Notebook home"
      className="flex shrink-0 items-center gap-[10px] text-primary"
    >
      <span
        aria-hidden="true"
        className="flex h-8 w-7 flex-col gap-1 rounded-[3px] border-[1.5px] border-primary p-[6px]"
      >
        <span className="mt-px h-px w-[14px] bg-primary" />
        <span className="h-px w-[10px] bg-primary" />
        <span className="h-px w-[14px] bg-primary" />
      </span>
      <span className="text-[18px] font-semibold leading-[1.95] sm:text-[21px]">
        AI Notebook
      </span>
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        router.push("/search");
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [router]);
  return (
    <header className="border-b border-border bg-background">
      <div className="page-container flex h-16 items-center justify-between gap-3">
        <Identity />
        <nav
          aria-label="Main navigation"
          className="hidden items-start gap-[25px] lg:flex"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname.startsWith(item.href) ? "page" : undefined}
              className={cn(
                "text-[13px] leading-[1.95] text-primary hover:underline",
                pathname.startsWith(item.href) &&
                  "underline decoration-2 underline-offset-8",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-0 sm:gap-4">
          <Link
            href="/search"
            aria-label="Search the notebook"
            className="flex min-h-11 w-10 items-center gap-[10px] rounded-md text-primary hover:bg-accent sm:w-auto sm:px-1.5"
          >
            <kbd className="hidden font-sans text-[11px] text-muted sm:inline">
              ⌘ K
            </kbd>
            <span className="flex h-11 w-10 shrink-0 items-center justify-center">
              <Search size={18} strokeWidth={1.6} />
            </span>
          </Link>
          <a
            href="/feed.xml"
            aria-label="RSS feed"
            className="hidden h-11 w-10 items-center justify-center rounded-md text-primary hover:bg-accent sm:flex"
          >
            <Rss size={18} strokeWidth={1.6} />
          </a>
          <button
            type="button"
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
            aria-label="Toggle color theme"
            className="flex h-11 w-10 items-center justify-center rounded-md text-primary hover:bg-accent"
          >
            <Moon size={18} strokeWidth={1.6} className="dark:hidden" />
            <Sun size={18} strokeWidth={1.6} className="hidden dark:block" />
          </button>
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <button
                type="button"
                aria-label="Open navigation"
                className="flex h-11 w-10 items-center justify-center rounded-md text-primary hover:bg-accent lg:hidden"
              >
                <Menu size={20} />
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-40 bg-black/35 backdrop-blur-xs" />
              <Dialog.Content className="fixed inset-y-0 right-0 z-50 w-[min(340px,90vw)] overflow-y-auto border-l border-border bg-background p-6 shadow-xl">
                <Dialog.Title className="text-xl font-semibold">
                  AI Notebook
                </Dialog.Title>
                <Dialog.Description className="mt-1 text-sm text-muted">
                  Find your next place to explore.
                </Dialog.Description>
                <Dialog.Close asChild>
                  <button
                    aria-label="Close navigation"
                    className="absolute right-3 top-3 flex size-11 items-center justify-center rounded-md text-primary hover:bg-accent"
                  >
                    <X size={20} />
                  </button>
                </Dialog.Close>
                <nav
                  aria-label="Mobile navigation"
                  className="mt-8 flex flex-col gap-1"
                >
                  {[
                    { label: "Home", href: "/" },
                    ...navigation,
                    { label: "Projects", href: "/projects" },
                    { label: "Now", href: "/now" },
                  ].map((item) => (
                    <Dialog.Close key={item.href} asChild>
                      <Link
                        className={cn(
                          "rounded-md px-3 py-3 text-base text-primary hover:bg-accent",
                          pathname === item.href && "bg-accent font-semibold",
                        )}
                        href={item.href}
                      >
                        {item.label}
                      </Link>
                    </Dialog.Close>
                  ))}
                </nav>
                <a
                  className="mt-8 inline-flex min-h-11 items-center gap-3 text-primary"
                  href="/feed.xml"
                >
                  <Rss size={18} />
                  Subscribe via RSS
                </a>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </header>
  );
}
