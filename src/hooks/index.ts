import { useSearchParams } from "next/navigation";

export function useFeatureFlag(name: string): boolean {
  const query = useSearchParams();
  return query.has(name);
}