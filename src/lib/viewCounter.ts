import { supabase } from "./supabase";

export const trackVisitor = async () => {
  let visitorId = localStorage.getItem("visitor_id");

  if (!visitorId) {
    visitorId = crypto.randomUUID();

    const { data, error } = await supabase
      .from("portfolio_visitors")
      .insert([{ visitor_id: visitorId }]);

    console.log("Visitor ID:", visitorId);
    console.log("Insert Data:", data);
    console.log("Insert Error:", error);

    if (!error) {
      localStorage.setItem("visitor_id", visitorId);
    }
  }

  const { count, error } = await supabase
    .from("portfolio_visitors")
    .select("*", { count: "exact", head: true });

  console.log("Count:", count);
  console.log("Count Error:", error);

  return count || 0;
};