export default function Skeleton({ type = 'product' }) {
  if (type === 'product') {
    return (
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg animate-pulse">
        <div className="h-48 bg-gray-700"></div>
        <div className="p-4 space-y-3">
          <div className="h-4 bg-gray-700 rounded w-1/3"></div>
          <div className="h-5 bg-gray-700 rounded w-3/4"></div>
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <div className="h-6 bg-gray-700 rounded w-20"></div>
              <div className="h-4 bg-gray-700 rounded w-16"></div>
            </div>
            <div className="h-4 bg-gray-700 rounded w-16"></div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'trending') {
    return (
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg animate-pulse min-w-[200px]">
        <div className="h-32 bg-gray-700"></div>
        <div className="p-3 space-y-2">
          <div className="h-3 bg-gray-700 rounded w-1/4"></div>
          <div className="h-4 bg-gray-700 rounded w-3/4"></div>
          <div className="flex justify-between items-center">
            <div className="h-5 bg-gray-700 rounded w-16"></div>
            <div className="h-3 bg-gray-700 rounded w-12"></div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'hero') {
    return (
      <div className="h-64 md:h-80 bg-gray-700 rounded-lg animate-pulse"></div>
    );
  }

  return (
    <div className="animate-pulse bg-gray-700 rounded h-48 w-full" />
  );
}
