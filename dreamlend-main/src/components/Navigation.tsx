"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ConnectButton } from "@/components/ConnectButton";
import { FaucetDropdown } from "@/components/FaucetDropdown";
import { useP2PLending } from "@/hooks/useP2PLending";
import { useRewards } from "@/hooks/useRewards";
import { Home, PlusCircle, List, User, Menu, X, Gift } from "lucide-react";
import { useState } from "react";

export function Navigation() {
  const pathname = usePathname();
  const { isConnected } = useP2PLending();
  const { pendingRewards, formatDreamAmount, rewardsSystemAvailable } =
    useRewards();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/create", label: "Create", icon: PlusCircle },
    { href: "/offers", label: "Offers", icon: List },
    { href: "/my-loans", label: "My Loans", icon: User },
  ];

  return (
    <nav className="sticky top-0 z-50">
      <div className="mx-auto mt-3 w-[min(96%,1200px)] px-2 md:px-0">
        <div className="anime-card border-white/10 bg-white/5 px-3 py-2 md:px-4 md:py-2.5 rounded-2xl">
          <div className="flex items-center justify-between gap-3">
            {/* Brand */}
            <Link href="/" className="group select-none">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-xl border border-white/15 bg-gradient-to-br from-[var(--magenta)] to-[var(--ink)] shadow-md transition-transform group-hover:scale-105" />
                <span className="arcade text-[13px] md:text-sm neon-ink tracking-wide">
                  letslend
                </span>
                <Badge
                  variant="secondary"
                  className="ml-1 hidden md:inline-block text-[10px] px-2 py-0.5 bg-white/8 border-white/15 text-white/75"
                >
                  Somnia L1
                </Badge>
              </div>
            </Link>

            {/* Center: segmented nav */}
            <div className="hidden md:flex items-center">
              <div className="anime-card bg-white/5 border-white/10 p-1 rounded-xl flex items-center gap-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link key={item.href} href={item.href}>
                      <Button
                        size="sm"
                        variant={isActive ? "default" : "ghost"}
                        className={[
                          "h-9 rounded-lg px-3 leading-none whitespace-nowrap text-[12px] font-extrabold tracking-wide",
                          isActive
                            ? "btn-ink text-black shadow"
                            : "bg-transparent border border-white/12 text-white/85 hover:border-[var(--ink)] hover:text-[var(--ink)]",
                        ].join(" ")}
                      >
                        <Icon className="h-4 w-4 shrink-0" />
                        <span className="ml-2 uppercase">{item.label}</span>
                      </Button>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Right: controls in matching pill (uniform height) */}
            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center gap-2 anime-card bg-white/5 border-white/10 p-1 rounded-xl">
                {isConnected &&
                  rewardsSystemAvailable &&
                  pendingRewards &&
                  pendingRewards > 0n && (
                    <Link href="/rewards" className="h-9 flex items-center">
                      <span className="sticker text-[11px] whitespace-nowrap leading-none">
                        <Gift className="h-3.5 w-3.5 text-[var(--magenta)]" />
                        {formatDreamAmount(pendingRewards).slice(0, 6)} DREAM
                      </span>
                    </Link>
                  )}

                {/* Force Faucet & Connect to match height and not wrap */}
                <div className="h-9 flex items-center">
                  <FaucetDropdown />
                </div>
                <div className="h-9 flex items-center">
                  <ConnectButton />
                </div>

                {/* Mobile menu button appears outside on small screens */}
              </div>

              {/* Mobile toggler */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden anime-btn bg-transparent border border-white/15 hover:border-[var(--ink)] hover:text-[var(--ink)] h-9 w-9 p-0 rounded-xl"
                onClick={() => setMobileMenuOpen((v) => !v)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Mobile dropdown */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-2">
              <div className="anime-card p-2">
                <div className="flex flex-col">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`rounded-md px-3 py-2 text-sm transition ${
                          isActive
                            ? "text-[var(--ink)]"
                            : "text-white/85 hover:bg-white/5"
                        }`}
                      >
                        <div className="flex items-center">
                          <Icon className="h-4 w-4" />
                          <span className="ml-2">{item.label}</span>
                        </div>
                      </Link>
                    );
                  })}
                  <div className="mt-2 border-t border-white/10 pt-2 space-y-2">
                    <FaucetDropdown />
                    <ConnectButton />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
