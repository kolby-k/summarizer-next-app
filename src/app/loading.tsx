export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 bg-neutral-500/10 backdrop-blur-sm">
      <div className="flex flex-1 h-full justify-center items-center text-xl font-semibold text-neutral-400">
        Loading...
      </div>
    </div>
  );
}
