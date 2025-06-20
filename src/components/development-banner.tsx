import { AlertTriangle, Info } from "lucide-react";

export function DevelopmentBanner() {
  return (
    <div className="bg-gradient-to-r from-amber-100 to-orange-100 border-l-4 border-amber-400 p-6 mb-8 rounded-r-lg shadow-sm">
      <div className="flex items-start px-6">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="h-6 w-6 text-amber-500 mt-0.5 flex-shrink-0" />
              <h3 className="text-lg font-semibold text-amber-800">
                Development Status
              </h3>
            </div>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-300 text-amber-800">
              Pre-Beta
            </span>
          </div>

          <p className="text-amber-700 leading-relaxed mb-4">
            While usable, Wispe is still currently in development and may still
            undergo some breaking changes as I near BETA and gather feedback. I
            invite you to try it out and provide feedback to help shape the
            final product!
          </p>

          <div className="bg-amber-200 rounded-lg p-4 mb-4">
            <div className="flex items-start space-x-2">
              <div>
                <div className="flex items-center space-x-3">
                  <Info className="h-5 w-5 text-amber-600 mt-1 flex-shrink-0" />
                  <h4 className="font-medium text-amber-800">
                    Production Usage Recommendation
                  </h4>
                </div>
                <p className="text-sm text-amber-700 pl-8">
                  If you choose to ship with this to production, I recommend
                  locking your dependencies to a specific version and keeping up
                  with the latest releases.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="https://github.com/pdevito3/wispe/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amber-200/70 shadow inline-flex items-center px-4 py-2 border border-amber-300 text-amber-700 text-sm font-medium rounded-lg hover:bg-amber-100 transition-colors"
            >
              View Latest Releases
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
