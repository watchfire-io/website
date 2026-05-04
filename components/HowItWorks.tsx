"use client";

import dynamic from "next/dynamic";

// HowItWorks sits well below the fold and is ~10 KB gz of step data + inline
// SVGs. ssr:false splits it into its own chunk and skips the initial render
// entirely so it doesn't pad the landing-page hydration tree.
const HowItWorksInternal = dynamic(() => import("./HowItWorksInternal"), {
  ssr: false,
  loading: () => (
    <div
      aria-hidden="true"
      className="mx-auto min-h-[44rem] w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:min-h-[36rem]"
    />
  ),
});

export default HowItWorksInternal;
