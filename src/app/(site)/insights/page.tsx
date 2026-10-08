import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PostRow } from "@/components/sections/Insights";
import { buildMetadata } from "@/lib/seo";
import { getHome, getPosts, getSettings } from "@/sanity/content";

async function getInsightsText() {
  const home = await getHome();
  const section = home.sections.find((s) => s._type === "insightsSection");
  return section?._type === "insightsSection" ? section : undefined;
}

export async function generateMetadata(): Promise<Metadata> {
  const [settings, insights] = await Promise.all([getSettings(), getInsightsText()]);
  return buildMetadata({ settings, title: insights?.heading || "Insights", description: insights?.intro, path: "/insights", label: "Insights" });
}

export default async function InsightsPage() {
  const [posts, insights] = await Promise.all([getPosts(), getInsightsText()]);
  return (
    <div className="pt-32 pb-24 sm:pt-36 2xl:pt-40">
      <header className="bg-maroon px-4 py-14 text-center text-white sm:py-20">
        <h1 className="font-head text-[clamp(56px,8vw,140px)] leading-none font-normal">{insights?.heading || "Insights"}</h1>
        {insights?.intro && <p className="mx-auto mt-3 max-w-[52ch] text-[clamp(16px,1.5vw,22px)] text-white/90">{insights.intro}</p>}
      </header>
      <Container className="mt-10">
        {posts.length ? (
          <div className="border-t border-maroon/25">
            {posts.map((post) => (
              <PostRow key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-lg text-mut">No posts yet.</p>
        )}
      </Container>
    </div>
  );
}
