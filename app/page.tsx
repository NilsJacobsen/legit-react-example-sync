'use client';

import { LegitProvider, type LegitConfig } from "@legit-sdk/react";
import { Suspense } from "react";
import Editor from "./Editor";


// Prevent static generation - this page uses browser-only APIs
export const dynamic = 'force-dynamic';

export default function Home() {
  const config: LegitConfig = {
    serverUrl: process.env.NEXT_PUBLIC_LEGIT_SERVER_URL,
    publicKey: process.env.NEXT_PUBLIC_LEGIT_PUBLIC_KEY,
    gitRoot: '/',
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LegitProvider config={config}>
        <Editor />
      </LegitProvider>
    </Suspense>
  );
}
