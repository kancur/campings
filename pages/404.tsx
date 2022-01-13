import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col flex-grow justify-center">
      <div className="text-center flex flex-col gap-4">
        <h1 className="text-5xl font-semibold">
          <span className="text-pink-500">404</span> - Not Found
        </h1>
        <p className="text-xl">
          Return to{' '}
          <Link href="/">
            <a>homepage</a>
          </Link>
        </p>
      </div>
    </div>
  );
}
