export function ArrowTopNotification({ children }) {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 mt-2 bg-red-600 p-2 text-white rounded shadow-md z-10 select-none">
      {children}
      <div className="arrow-up absolute left-1/2 -top-2 -translate-x-1/2 border-red-600 z-30"></div>
    </div>
  );
}
