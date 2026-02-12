import { motion } from "framer-motion";
import { ShieldAlert, ShieldCheck, AlertTriangle, TrendingUp, CheckCircle2, FileSearch } from "lucide-react";

interface AnalysisResultProps {
  result: {
    vulnerable: boolean;
    type?: string;
    risk?: "High" | "Medium" | "Low";
    confidence?: number;
    details?: string;
  } | null;
  isLoading: boolean;
}

const AnalysisResult = ({ result, isLoading }: AnalysisResultProps) => {
  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card h-full"
      >
        <div className="px-5 py-3 border-b border-border bg-secondary/30">
          <div className="h-4 w-28 rounded shimmer" />
        </div>
        <div className="p-5 space-y-3">
          <div className="h-3 w-full rounded shimmer" />
          <div className="h-3 w-4/5 rounded shimmer" />
          <div className="h-3 w-3/5 rounded shimmer" />
        </div>
      </motion.div>
    );
  }

  if (!result) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card h-full flex flex-col"
      >
        <div className="px-5 py-3 border-b border-border bg-secondary/30">
          <div className="flex items-center gap-2">
            <FileSearch className="w-4 h-4 text-muted-foreground" />
            <h3 className="text-sm font-medium text-foreground">Analysis Result</h3>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center p-8">
          <p className="text-sm text-muted-foreground text-center">
            Submit code to view results
          </p>
        </div>
      </motion.div>
    );
  }

  const riskConfig = {
    High: { bg: "bg-destructive/10", text: "text-destructive" },
    Medium: { bg: "bg-warning/10", text: "text-warning" },
    Low: { bg: "bg-success/10", text: "text-success" },
  };

  const config = result.risk ? riskConfig[result.risk] : riskConfig.Low;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card h-full flex flex-col"
    >
      {/* Header */}
      <div className={`px-5 py-3 border-b ${result.vulnerable ? "border-destructive/20 bg-destructive/5" : "border-success/20 bg-success/5"}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {result.vulnerable ? (
              <ShieldAlert className="w-4 h-4 text-destructive" />
            ) : (
              <ShieldCheck className="w-4 h-4 text-success" />
            )}
            <h3 className={`text-sm font-medium ${result.vulnerable ? "text-destructive" : "text-success"}`}>
              {result.vulnerable ? "Vulnerability Detected" : "Code is Secure"}
            </h3>
          </div>
          
          {result.vulnerable && result.risk && (
            <span className={`px-2 py-0.5 rounded text-xs font-medium ${config.bg} ${config.text}`}>
              {result.risk} Risk
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1">
        {result.vulnerable ? (
          <div className="space-y-4">
            {/* Type */}
            {result.type && (
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <AlertTriangle className="w-3 h-3 text-warning" />
                  <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Type</span>
                </div>
                <span className="text-sm text-foreground font-medium">{result.type}</span>
              </div>
            )}

            {/* Confidence */}
            {result.confidence !== undefined && (
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <TrendingUp className="w-3 h-3 text-primary" />
                  <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Confidence</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full transition-all" 
                      style={{ width: `${result.confidence}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-foreground">{result.confidence}%</span>
                </div>
              </div>
            )}

            {/* Details */}
            {result.details && (
              <div>
                <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Details</span>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{result.details}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
            <p className="text-sm text-muted-foreground">
              No security vulnerabilities detected in your code.
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AnalysisResult;
