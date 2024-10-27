"use client";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { useQuery } from "@tanstack/react-query";

// Helper function to sanitize input
function sanitizeInput(input: string): string {
	return input.replace(/[^\w\s@.-]/gi, '');
}

export default function useUser() {
	return useQuery({
		queryKey: ["user"],
		queryFn: async () => {
			const supabase = supabaseBrowser();
			const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

			if (sessionError) {
				console.error("Error fetching session:", sessionError);
				return null;
			}

			if (sessionData.session?.user) {
				const userId = sanitizeInput(sessionData.session.user.id);

				// Fetch user profile
				const { data: profileData, error: profileError } = await supabase
					.from("profiles")
					.select("id, created_at, display_name, email, image_url")
					.eq("id", userId)
					.single();

				if (profileError) {
					console.error("Error fetching profile:", profileError);
					return null;
				}

				if (!profileData || !profileData.email) {
					console.error("Invalid profile data");
					return null;
				}

				const sanitizedEmail = sanitizeInput(profileData.email);

				// Fetch subscription separately
				const { data: subscriptionData, error: subscriptionError } = await supabase
					.from("subscription")
					.select("created_at, customer_id, email, end_at, subscription_id")
					.eq("email", sanitizedEmail)
					.single();

				if (subscriptionError && subscriptionError.code !== 'PGRST116') {
					console.error("Error fetching subscription:", subscriptionError);
				}

				// Combine profile and subscription data
				return {
					...profileData,
					subscription: subscriptionData || null
				};
			}
			return null;
		},
	});
}
