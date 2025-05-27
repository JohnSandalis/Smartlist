export default function AccountLoading() {
  return (
    <>
      <div className="flex justify-end items-center w-full mb-4 py-1 container-default">
        <div className="absolute top-[20px] left-[20px] lg:left-[max(20px,calc((100vw-1400px)/2))] w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
        <div className="w-32 h-8 bg-gray-200 rounded animate-pulse" />
      </div>

      <div className="flex flex-col items-start container-default">
        <div className="w-48 h-8 bg-gray-200 rounded mb-6 animate-pulse" />

        <div className="w-full max-w-2xl">
          {/* Personal Information Section */}
          <section className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="w-56 h-7 bg-gray-200 rounded mb-4 animate-pulse" />
            <div className="space-y-4">
              <div className="flex flex-col">
                <div className="w-16 h-5 bg-gray-200 rounded mb-1 animate-pulse" />
                <div className="w-48 h-6 bg-gray-200 rounded animate-pulse" />
              </div>
              <div className="flex flex-col">
                <div className="w-24 h-5 bg-gray-200 rounded mb-1 animate-pulse" />
                <div className="w-32 h-6 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          </section>

          {/* Account Settings Section */}
          {/* <section className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="w-56 h-7 bg-gray-200 rounded mb-4 animate-pulse" />
            <div className="space-y-4 flex flex-col w-full justify-start">
              <div className="w-32 h-5 bg-gray-200 rounded animate-pulse" />
              <div className="w-40 h-5 bg-gray-200 rounded animate-pulse" />
            </div>
          </section> */}
        </div>
      </div>
    </>
  );
}
