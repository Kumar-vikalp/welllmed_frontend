export default function Skeleton({ type = 'product' }) {
  if (type === 'product') {
    return (
      <div className="bg-white border-4 border-neo-ink overflow-hidden shadow-neo animate-pulse">
        <div className="h-32 md:h-48 bg-gray-200 border-b-4 border-neo-ink"></div>
        <div className="p-3 md:p-4 space-y-3">
          <div className="h-3 bg-gray-200 w-1/3"></div>
          <div className="h-4 bg-gray-200 w-3/4"></div>
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <div className="h-5 bg-gray-200 w-16"></div>
              <div className="h-3 bg-gray-200 w-12"></div>
            </div>
            <div className="h-6 bg-gray-200 w-16"></div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'trending') {
    return (
      <div className="bg-white border-4 border-neo-ink overflow-hidden shadow-neo animate-pulse min-w-[160px] md:min-w-[224px]">
        <div className="h-28 md:h-40 bg-gray-200 border-b-4 border-neo-ink"></div>
        <div className="p-3 space-y-2">
          <div className="h-3 bg-gray-200 w-1/4"></div>
          <div className="h-4 bg-gray-200 w-3/4"></div>
          <div className="flex justify-between items-center">
            <div className="h-4 bg-gray-200 w-12"></div>
            <div className="h-3 bg-gray-200 w-10"></div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'hero') {
    return (
      <div className="h-48 md:h-80 bg-gray-200 border-4 border-neo-ink shadow-neo animate-pulse"></div>
    );
  }

  return (
    <div className="animate-pulse bg-gray-200 border-4 border-neo-ink shadow-neo h-48 w-full" />
  );
}
