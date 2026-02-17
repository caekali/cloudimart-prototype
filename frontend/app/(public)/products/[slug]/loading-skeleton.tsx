export default function ProductDetailsSkeleton() {
  return (
    <div className="p-6 max-w-4xl mx-auto animate-pulse">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/2 h-80 bg-gray-300 rounded"></div>

        <div className="flex-1 flex flex-col gap-4">
          <div className="h-8 bg-gray-300 rounded w-3/4"></div>

          <div className="h-6 bg-gray-300 rounded w-1/4"></div>

          <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3"></div>
          </div>

          <div className="flex gap-4 mt-4">
            <div className="h-10 w-32 bg-gray-300 rounded"></div>
            <div className="h-10 w-32 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
