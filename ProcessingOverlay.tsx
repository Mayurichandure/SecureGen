import { motion } from "framer-motion";
import { Loader2, Shield, ShieldCheck } from "lucide-react";

interface ProcessingOverlayProps {
  isVisible: boolean;
  stage: "detecting" | "generating" | null;
}

const ProcessingOverlay = ({ isVisible, stage }: ProcessingOverlayProps) => {
  if (!isVisible) return null;

  const stages = [
    { id: "detecting", label: "Detecting", icon: Shield },
    { id: "generating", label: "Generating", icon: ShieldCheck },
  ];

  const currentStageIndex = stages.findIndex(s => s.id === stage);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-background/90 backdrop-blur-sm"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative glass-card p-6 sm:p-8 max-w-sm w-full"
      >
        {/* Spinner */}
        <div className="relative w-14 h-14 mx-auto mb-5">
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-border"
          />
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="w-5 h-5 text-primary animate-spin" />
          </div>
        </div>

        {/* Info */}
        <div className="text-center mb-5">
          <h3 className="text-base font-semibold text-foreground mb-1">
            {stage === "detecting" ? "Analyzing Code" : "Generating Fix"}
          </h3>
          <p className="text-sm text-muted-foreground">
            {stage === "detecting" 
              ? "Scanning for vulnerabilities..."
              : "Creating secure alternative..."
            }
          </p>
        </div>

        {/* Steps */}
        <div className="flex items-center justify-center gap-2">
          {stages.map((s, index) => (
            <div key={s.id} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                  index <= currentStageIndex
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                <s.icon className="w-4 h-4" />
              </div>
              {index < stages.length - 1 && (
                <div className={`w-8 h-0.5 mx-1 rounded-full ${
                  index < currentStageIndex ? "bg-primary" : "bg-border"
                }`} />
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-6 mt-3">
          {stages.map((s, index) => (
            <span 
              key={s.id}
              className={`text-xs ${
                index <= currentStageIndex ? "text-primary font-medium" : "text-muted-foreground"
              }`}
            >
              {s.label}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProcessingOverlay;
