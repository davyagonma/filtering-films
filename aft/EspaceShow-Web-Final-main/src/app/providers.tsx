"use client";
import { SessionProvider } from "next-auth/react";
import { Suspense, useState } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
    const [hasError, setHasError] = useState(false);

    return (
        <SessionProvider>
            <Suspense fallback={<div>Loading...</div>}>
                {children}
            </Suspense>
        </SessionProvider>
    );
}