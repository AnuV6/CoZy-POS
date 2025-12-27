"use client";

import { MainLayout } from "@/components/layout";
import { CartProvider } from "@/lib/cart-context";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <CartProvider>
            <MainLayout>{children}</MainLayout>
        </CartProvider>
    );
}
