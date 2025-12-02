'use client';

import { LegitProvider, type LegitConfig } from "@legit-sdk/react";
import Editor from "@/app/Editor";

export default function Home() {
  const config: LegitConfig = {
    serverUrl: process.env.NEXT_PUBLIC_LEGIT_SERVER_URL,
    publicKey: process.env.NEXT_PUBLIC_LEGIT_PUBLIC_KEY,
    gitRoot: '/',
  };

  return (
    <LegitProvider config={config}>
      <Editor />
    </LegitProvider>
  );
}
