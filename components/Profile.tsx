// components/Profile.js
"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import useUser from "@/app/hook/useUser"; // Adjust the import path as necessary
import Image from "next/image";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { protectedPaths } from "@/lib/constant";
import { manageBilling } from "@/lib/actions/stripe";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Profile() {
  const { isFetching, data } = useUser();
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();

  if (isFetching) {
    return <></>; // Or a loading spinner
  }

  const handleLogout = async () => {
    const supabase = supabaseBrowser();

    try {
      await Promise.all([
        queryClient.clear(),
        supabase.auth.signOut(),
      ]);
      router.refresh();

      if (protectedPaths.includes(pathname)) {
        router.replace(`/auth?next=${encodeURIComponent(pathname)}`);
      }
    } catch (error) {
      console.error("Logout failed:", error);
      // Optionally, display an error message to the user
    }
  };

  const handleBilling = async () => {
    if (data?.subscription?.customer_id) {
      try {
        const response = await manageBilling(data.subscription.customer_id);
        const billingData = JSON.parse(response);

        if (billingData.error) {
          console.error(billingData.error);
          // Optionally, display an error message to the user
        } else {
          window.location.href = billingData.url;
        }
      } catch (error) {
        console.error("Error handling billing:", error);
        // Optionally, display an error message to the user
      }
    }
  };

  const isSubscriber = Boolean(data?.subscription?.subscription_id);

  return (
    <div>
      {!data?.id ? (
        <Link href="/auth" className="animate-fade">
          <Button variant="outline">Sign In</Button>
        </Link>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <>
              {data.image_url ? (
                <Image
                  src={data.image_url}
                  alt={data.display_name || "User Avatar"}
                  width={50}
                  height={50}
                  className="rounded-full animate-fade ring-2 cursor-pointer"
                />
              ) : (
                <div className="h-12 w-12 flex items-center justify-center ring-2 rounded-full text-2xl font-bold cursor-pointer">
                  <h1>{data.email[0].toUpperCase()}</h1>
                </div>
              )}
            </>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {isSubscriber && (
              <>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={handleBilling}>
                  Billing
                </DropdownMenuItem>
              </>
            )}
            <DropdownMenuItem onClick={handleLogout}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}