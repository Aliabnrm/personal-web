"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useTheme } from "next-themes";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, Moon, Search, Sun, X } from "lucide-react";
import { navigation, site } from "@/lib/site";
import { cn } from "@/lib/utils";

function Identity() {
  return (
    <Link href="/" className="flex shrink-0 items-center gap-2.5">
      <span
        aria-hidden="true"
        className="flex size-8 items-center justify-center rounded-md border border-primary/25 bg-accent font-mono text-xs font-semibold text-primary"
      >
        aa<span className="text-primary/50">.</span>
      </span>
      <span className="text-base font-semibold tracking-tight sm:text-lg">
        Ali Abnar
        <span aria-hidden="true" className="text-primary">
          .
        </span>
      </span>
      <span className="sr-only"> home</span>
    </Link>
  );
}
function activePath(pathname: string, href: string) {
  if (href === "/writing")
    return ["/writing", "/notes", "/library", "/roadmaps", "/lab"].some(
      (path) => pathname === path || pathname.startsWith(`${path}/`),
    );
  return pathname === href || pathname.startsWith(`${href}/`);
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
      <div className="page-container flex h-[76px] items-center justify-between gap-3">
        <Identity />
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-8 md:flex"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={
                activePath(pathname, item.href) ? "page" : undefined
              }
              className={cn(
                "inline-flex min-h-11 items-center text-[13px] transition-colors hover:text-primary",
                activePath(pathname, item.href)
                  ? "font-semibold text-primary"
                  : "text-muted",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-0 sm:gap-1">
          <Link
            href="/search"
            aria-label="Search the site"
            className="flex size-11 items-center justify-center rounded-md text-muted hover:bg-accent hover:text-primary"
          >
            <Search size={18} strokeWidth={1.7} />
          </Link>
          <button
            type="button"
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
            aria-label="Toggle color theme"
            className="flex size-11 items-center justify-center rounded-md text-muted hover:bg-accent hover:text-primary"
          >
            <Moon size={18} strokeWidth={1.7} className="dark:hidden" />
            <Sun size={18} strokeWidth={1.7} className="hidden dark:block" />
          </button>
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <button
                type="button"
                aria-label="Open navigation"
                className="flex size-11 items-center justify-center rounded-md text-primary hover:bg-accent md:hidden"
              >
                <Menu size={20} />
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-40 bg-black/35 backdrop-blur-xs" />
              <Dialog.Content className="fixed inset-y-0 right-0 z-50 w-[min(340px,90vw)] overflow-y-auto border-l border-border bg-background p-6 shadow-xl">
                <Dialog.Title className="text-xl font-semibold">
                  Ali Abnar
                </Dialog.Title>
                <Dialog.Description className="mt-1 text-sm text-muted">
                  Work, writing, and ways to connect.
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
                  {[{ label: "Home", href: "/" }, ...navigation].map((item) => (
                    <Dialog.Close key={item.href} asChild>
                      <Link
                        className={cn(
                          "rounded-md px-3 py-3 text-base hover:bg-accent",
                          pathname === item.href &&
                            "bg-accent font-semibold text-primary",
                        )}
                        aria-current={
                          pathname === item.href ? "page" : undefined
                        }
                        href={item.href}
                      >
                        {item.label}
                      </Link>
                    </Dialog.Close>
                  ))}
                </nav>
                <a
                  className="text-link mt-8 inline-flex min-h-11 items-center text-sm"
                  href={site.resume}
                  download
                >
                  Download résumé ↗
                </a>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </header>
  );
}
