// The page width: full width on phones, growing to 1640px on wide screens.
export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[min(1640px,100%)] px-4 sm:px-8 lg:px-12 2xl:px-16 ${className}`}>{children}</div>;
}

// The hand-drawn brush stroke between sections.
export function Brush() {
  return (
    <svg className="mx-auto my-14 block h-auto w-[min(260px,60%)] lg:my-20" viewBox="0 0 260 14" aria-hidden="true">
      <path d="M2,8 C60,3 200,3 258,7 C200,11 60,12 2,8 Z" fill="#8a3a4b" />
    </svg>
  );
}
