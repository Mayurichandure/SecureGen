import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Code2, Play, Loader2, AlertTriangle, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CodeEditorProps {
  code: string;
  onCodeChange: (code: string) => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
}

const CODE_EXAMPLES = [
  {
    name: "SQL Injection",
    code: `# SQL Injection vulnerable code
user_input = request.args.get('id')
query = "SELECT * FROM users WHERE id=" + user_input
cursor.execute(query)`,
  },
  {
    name: "XSS Attack",
    code: `// Cross-Site Scripting vulnerable code
function displayMessage(userInput) {
  document.getElementById('output').innerHTML = userInput;
  // User input directly inserted without sanitization
}`,
  },
  {
    name: "Code Injection",
    code: `# Code Injection vulnerable code
user_expression = request.form['expression']
result = eval(user_expression)
print(f"Result: {result}")`,
  },
  {
    name: "Path Traversal",
    code: `# Path Traversal vulnerable code
filename = request.args.get('file')
with open('/uploads/' + filename) as f:
    content = f.read()`,
  },
];

const CodeEditor = ({ code, onCodeChange, onAnalyze, isAnalyzing }: CodeEditorProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showExamples, setShowExamples] = useState(false);

  const lineNumbers = code.split("\n").length;

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const target = e.target as HTMLTextAreaElement;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const newValue = code.substring(0, start) + "    " + code.substring(end);
      onCodeChange(newValue);
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 4;
      }, 0);
    }
  }, [code, onCodeChange]);

  const loadExample = (example: typeof CODE_EXAMPLES[0]) => {
    onCodeChange(example.code);
    setShowExamples(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="glass-card overflow-hidden"
    >
      {/* Header Bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-secondary/30">
        <div className="flex items-center gap-3">
          <div className="p-1.5 rounded-md bg-primary/10">
            <Code2 className="w-4 h-4 text-primary" />
          </div>
          <h2 className="text-sm font-medium text-foreground">Code Input</h2>
        </div>
        
        {/* Examples Dropdown */}
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowExamples(!showExamples)}
            className="gap-1.5 h-8 text-xs text-muted-foreground hover:text-foreground"
          >
            <span>Sample Code</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showExamples ? 'rotate-180' : ''}`} />
          </Button>
          
          {showExamples && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute right-0 top-full mt-1 w-44 bg-card border border-border rounded-md shadow-md p-1 z-20"
            >
              {CODE_EXAMPLES.map((example) => (
                <button
                  key={example.name}
                  onClick={() => loadExample(example)}
                  className="w-full text-left px-3 py-1.5 text-xs rounded hover:bg-secondary transition-colors"
                >
                  {example.name}
                </button>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Editor Area */}
      <div className={`transition-all duration-200 ${isFocused ? "ring-1 ring-primary/20" : ""}`}>
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-2 bg-code-bg border-b border-white/5">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-warning/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-success/60" />
          </div>
          <span className="text-[10px] text-code-comment font-mono">{lineNumbers} lines</span>
        </div>

        {/* Code Area */}
        <div className="relative flex bg-code-bg min-h-[200px] max-h-[320px]">
          {/* Line Numbers */}
          <div className="flex-shrink-0 py-3 px-3 text-right select-none border-r border-white/5">
            {Array.from({ length: Math.max(lineNumbers, 10) }, (_, i) => (
              <div key={i} className="text-[10px] font-mono text-code-comment/40 leading-6">
                {i + 1}
              </div>
            ))}
          </div>

          {/* Textarea */}
          <textarea
            value={code}
            onChange={(e) => onCodeChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={handleKeyDown}
            placeholder="# Paste code here..."
            className="flex-1 p-3 bg-transparent text-code-foreground font-mono text-xs leading-6 resize-none focus:outline-none placeholder:text-code-comment/30 overflow-auto"
            spellCheck={false}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-5 py-3 border-t border-border bg-secondary/20">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <AlertTriangle className="w-3.5 h-3.5 text-warning" />
          <span>Code will be scanned for vulnerabilities</span>
        </div>
        
        <Button
          onClick={onAnalyze}
          disabled={!code.trim() || isAnalyzing}
          size="sm"
          className="h-8 px-4 text-xs font-medium"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
              Analyzing
            </>
          ) : (
            <>
              Analyze
              <Play className="w-3.5 h-3.5 ml-1.5" />
            </>
          )}
        </Button>
      </div>
    </motion.div>
  );
};

export default CodeEditor;
