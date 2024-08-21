export default function PageLoader() {
  return (
    <div className="bg-Gray-100">
      <div className="flex justify-center items-center w-full h-screen ">
        <h1 className="text-Gray-700 text-2xl animate-pulse font-medium">
          <span className="loading loading-bars loading-lg"></span>
        </h1>
      </div>
    </div>
  );
}
