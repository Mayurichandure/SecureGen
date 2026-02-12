import { motion } from "framer-motion";
import { ShieldCheck, Copy, Check, Lightbulb, Code2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface SecureCodeOutputProps {
  secureCode: string | null;
  explanation: string | null;
  isLoading: boolean;
  originalVulnerable: boolean;
}

const SecureCodeOutput = ({ secureCode, explanation, isLoading, originalVulnerable }: SecureCodeOutputProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!secureCode) return;
    await navigator.clipboard.writeText(secureCode);
    setCopied(true);
    toast.success("Code copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card h-full"
      >
        <div className="px-5 py-3 border-b border-border bg-secondary/30">
          <div className="h-4 w-32 rounded shimmer" />
        </div>
        <div className="p-4 bg-code-bg">
          <div className="space-y-2">
            <div className="h-3 w-full rounded shimmer opacity-40" />
            <div className="h-3 w-4/5 rounded shimmer opacity-40" />
            <div className="h-3 w-3/5 rounded shimmer opacity-40" />
          </div>
        </div>
      </motion.div>
    );
  }

  if (!secureCode || !originalVulnerable) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card h-full flex flex-col"
      >
        <div className="px-5 py-3 border-b border-border bg-secondary/30">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-muted-foreground" />
            <h3 className="text-sm font-medium text-foreground">Secure Code</h3>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center p-8">
          <p className="text-sm text-muted-foreground text-center">
            Generated fix will appear here
          </p>
        </div>
      </motion.div>
    );
  }

  const lineNumbers = secureCode.split("\n").length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card h-full flex flex-col overflow-hidden"
    >
      {/* Header */}
      <div className="px-5 py-3 border-b border-success/20 bg-success/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-success" />
          <h3 className="text-sm font-medium text-success">Secure Code</h3>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="h-7 px-2 text-xs gap-1 text-muted-foreground hover:text-foreground"
        >
          {copied ? <Check className="w-3 h-3 text-success" /> : <Copy className="w-3 h-3" />}
          {copied ? "Copied" : "Copy"}
        </Button>
      </div>

      {/* Code Block */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex items-center justify-between px-4 py-2 bg-code-bg border-b border-white/5">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-warning/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-success/60" />
          </div>
          <span className="text-[10px] text-code-comment font-mono">{lineNumbers} lines</span>
        </div>

        <div className="flex bg-code-bg flex-1 overflow-auto max-h-[200px]">
          <div className="flex-shrink-0 py-3 px-3 text-right select-none border-r border-white/5">
            {Array.from({ length: lineNumbers }, (_, i) => (
              <div key={i} className="text-[10px] font-mono text-code-comment/40 leading-6">
                {i + 1}
              </div>
            ))}
          </div>

          <pre className="flex-1 p-3 overflow-x-auto">
            <code className="text-xs font-mono text-code-foreground leading-6 whitespace-pre">
              {secureCode}
            </code>
          </pre>
        </div>
      </div>

      {/* Explanation */}
      {explanation && (
        <div className="px-5 py-3 bg-secondary/30 border-t border-border">
          <div className="flex gap-2">
            <Lightbulb className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Fix Applied</span>
              <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">
                {explanation}
              </p>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default SecureCodeOutput;
