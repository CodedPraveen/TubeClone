import { Suspense } from "react";
import AppShell from "@/Components/AppShell";
import SearchResults from "@/Components/SearchResults";

function SearchFallback() {
  return (
    <div className="px-3 py-8 text-center text-zinc-400">Loading search…</div>
  );
}

export default function SearchPage() {
  return (
    <AppShell>
      <Suspense fallback={<SearchFallback />}>
        <SearchResults />
      </Suspense>
    </AppShell>
  );
}
