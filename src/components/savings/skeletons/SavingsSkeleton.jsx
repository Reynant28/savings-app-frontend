import { motion } from "framer-motion";

const SkeletonItem = ({ className }) => (
  <div className={`animate-pulse bg-white/10 rounded-xl ${className}`} />
);

export default function SavingsSkeleton() {
  return (
    <div className="space-y-8">
      {/* Stats Card Skeleton */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-4">
            <SkeletonItem className="w-12 h-12" />
            <div className="space-y-2">
              <SkeletonItem className="h-4 w-20" />
              <SkeletonItem className="h-6 w-12" />
            </div>
          </div>
        ))}
      </div>

      {/* Warning/Urgent Section Skeleton */}
      <div className="bg-red-500/5 rounded-2xl p-6 border border-red-500/10">
        <SkeletonItem className="h-7 w-48 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <SkeletonItem className="h-24 w-full" />
          <SkeletonItem className="h-24 w-full" />
        </div>
      </div>

      {/* Goals Section Skeleton */}
      <div>
        <SkeletonItem className="h-8 w-64 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-6 rounded-2xl border border-white/15 bg-white/5 space-y-4">
              <div className="flex gap-4">
                <SkeletonItem className="w-20 h-20" />
                <div className="flex-1 space-y-2">
                  <SkeletonItem className="h-6 w-3/4" />
                  <SkeletonItem className="h-4 w-1/2" />
                </div>
              </div>
              <SkeletonItem className="h-2 w-full" />
              <div className="flex justify-between">
                <SkeletonItem className="h-8 w-24" />
                <SkeletonItem className="h-8 w-24" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}