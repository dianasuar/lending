"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, List } from "lucide-react";
import { motion } from "framer-motion";
import Somnia from "./Somnia.png";

export default function HomePage() {
  return (
    <div className="relative mx-auto w-[min(1200px,94vw)] py-10 md:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* LEFT: Image – no fade, 100% visible */}
        <motion.div
          // no opacity animation: image is fully visible
          initial={false}
          animate={{ y: [0, -10, 0, 6, 0] }} // gentle idle float
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ y: -8, scale: 1.01 }} // soft hover only
          className="order-1 lg:order-none will-change-transform"
        >
          <Image
            src={Somnia}
            alt="letslend illustration"
            priority
            className="rounded-3xl object-cover w-full h-auto"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </motion.div>

        {/* RIGHT: Content */}
        <motion.div
          initial={{ opacity: 1, x: 0 }} // keep text steady too
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0 }}
          className="space-y-7"
        >
          <Badge className="bg-white/10 border-white/20 text-white/80 w-fit">
            Built on Somnia L1 Testnet
          </Badge>

          <h1 className="font-display text-4xl md:text-5xl leading-tight font-black tracking-[-0.01em]">
            The Future of <span className="text-cyan-300">P2P Lending</span>
          </h1>

          <p className="text-white/80 text-base md:text-lg max-w-prose">
            Create offers, borrow against collateral, and manage loans—fast,
            secure, and transparent. letslend is a non-custodial, on-chain
            marketplace for capital.
          </p>

          {/* CTAs – minimal, no shine */}
          <div className="flex flex-wrap gap-4">
            {/* Primary: flat cyan, subtle border, no glow */}
            <Link href="/create">
              <Button
                className="
                  h-11 px-5 rounded-xl
                  bg-cyan-400 text-slate-900 font-semibold
                  hover:bg-cyan-300 active:bg-cyan-200
                  border border-white/10 shadow-none
                "
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Create Loan Offer
              </Button>
            </Link>

            {/* Secondary: simple border, faint hover tint */}
            <Link href="/offers">
              <Button
                variant="ghost"
                className="
                  h-11 px-5 rounded-xl
                  bg-transparent text-white/90
                  border border-white/20
                  hover:bg-white/5 hover:border-white/30
                  shadow-none
                "
              >
                <List className="h-4 w-4 mr-2 opacity-90" />
                Browse Offers
              </Button>
            </Link>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <StepCard number={1} title="Create / Browse">
              Lenders post offers with amount, APR, and duration. Borrowers find the best fit.
            </StepCard>
            <StepCard number={2} title="Deposit Collateral">
              Borrowers supply approved collateral and accept the loan in a single on-chain transaction.
            </StepCard>
            <StepCard number={3} title="Manage & Repay">
              Track health, top-up collateral, and repay anytime. Collateral is released automatically.
            </StepCard>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function StepCard({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-white/5 border border-white/15 p-5 text-white/80 hover:bg-white/10 transition">
      <div className="flex items-center gap-3 mb-2">
        <div className="h-8 w-8 flex items-center justify-center rounded-xl bg-cyan-400/20 text-cyan-200 font-extrabold">
          {number}
        </div>
        <h3 className="font-display font-bold">{title}</h3>
      </div>
      <p className="text-sm leading-relaxed">{children}</p>
    </div>
  );
}
