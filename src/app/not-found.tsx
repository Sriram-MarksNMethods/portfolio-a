import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-[80vh] place-items-center px-4 text-center">
      <div>
        <p className="font-mono text-sm text-mut">404</p>
        <h1 className="mt-2 font-head text-[clamp(56px,9vw,140px)] leading-none font-normal text-maroon">Page not found</h1>
        <p className="mt-4 text-lg text-mut">Even good SEO can&apos;t rank a page that doesn&apos;t exist.</p>
        <Link href="/" className="mt-8 inline-block rounded-full bg-maroon px-6 py-3 font-bold text-white">
          Back to the home page
        </Link>
      </div>
    </main>
  );
}
