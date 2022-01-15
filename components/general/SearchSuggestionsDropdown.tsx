export function Dropdown({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative inline-block">
      <div
        role="menu"
        className="z-50 absolute top-2 bg-gray-50 border border-gray-200 shadow-lg rounded-md w-52 text-gray-600 ring-black ring-1 ring-opacity-5"
      >
        {children}
      </div>
    </div>
  );
}
