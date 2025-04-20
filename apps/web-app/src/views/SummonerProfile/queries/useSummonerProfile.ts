import { useQuery } from "@tanstack/react-query";
import { fetchProfile } from "../../../api/profile";
import { buildProfileQueryKey } from "../../../api/helpers";

export function useSummonerProfile(
  name?: string,
  tag?: string,
) {
  return useQuery({
    queryKey: buildProfileQueryKey(name, tag),
    queryFn: () => fetchProfile(name!, tag!),

    enabled: !!name && !!tag,
    retry: false,
    refetchOnWindowFocus: false,
  });
}
