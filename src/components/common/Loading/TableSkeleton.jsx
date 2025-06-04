const TableSkeleton = () => {
  return (
    <div className="m-4 border border-gray-800 shadow rounded-md p-1 max-full w-full mx-auto">
      <div className="animate-pulse">
        <div className="p-2 bg-slate-800 rounded mb-4">
          <div className=" flex gap-12 items-center justify-around">
            <div className="w-full h-10 bg-slate-700 rounded-lg"></div>
            <div className="w-full h-10 bg-slate-700 rounded-lg"></div>
            <div className="w-full h-10 bg-slate-700 rounded-lg"></div>
            <div className="w-full h-10 bg-slate-700 rounded-lg"></div>
            <div className="w-full h-10 bg-slate-700 rounded-lg"></div>
            <div className="w-full h-10 bg-slate-700 rounded-lg"></div>
            <div className="w-full h-10 bg-slate-700 rounded-lg"></div>
          </div>
        </div>
        <div className="h-12 bg-slate-900 rounded "></div>
        <div className="h-12 bg-slate-800 rounded"></div>
        <div className="h-12 bg-slate-900 rounded"></div>
        <div className="h-12 bg-slate-800 rounded"></div>
        <div className="h-12 bg-slate-900 rounded"></div>
        <div className="h-12 bg-slate-800 rounded"></div>
        <div className="h-12 bg-slate-900 rounded"></div>
        <div className="h-12 bg-slate-800 rounded"></div>
        <div className="h-12 bg-slate-900 rounded"></div>
        <div className="h-12 bg-slate-800 rounded"></div>
      </div>
    </div>
  );
};

export default TableSkeleton;
