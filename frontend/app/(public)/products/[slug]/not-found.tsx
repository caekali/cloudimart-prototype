import Link from 'next/link';

export default function ProductNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh]">
      <h2 className="text-2xl font-bold">Product Not Found</h2>
      <p>Sorry, we couldn't find the product you're looking for.</p>
      <Link href="/" className="mt-4 text-primary underline">
        Back to Products
      </Link>
    </div>
  );
}
