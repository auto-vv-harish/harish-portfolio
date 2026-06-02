import { supabase } from "./supabase";

export const incrementAndGetViews = async () => {
  const { data } = await supabase
    .from("portfolio_views")
    .select("count")
    .eq("id", 1)
    .single();

  const currentCount = data?.count || 0;

  await supabase
    .from("portfolio_views")
    .update({ count: currentCount + 1 })
    .eq("id", 1);

  return currentCount + 1;
};