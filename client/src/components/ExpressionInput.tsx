import { Button } from "@/components/ui/button";
import { CheckCircle, Play, Eraser, AlertCircle } from "lucide-react";
import { useRef, useEffect } from "react";

interface ExpressionInputProps {
  expression: string;
  onChange: (value: string) => void;
  onEvaluate: () => void;
  onClear: () => void;
  isValid: boolean;
}

const examples = [
  { label: "add", expression: "(add 5 10)" },
  { label: "subtract", expression: "(subtract 20 8)" },
  { label: "multiply", expression: "(multiply 6 7)" },
  { label: "divide", expression: "(divide 100 4)" },
  { label: "nested", expression: "(add (multiply 3 4) (divide 10 2))" },
];

export default function ExpressionInput({ 
  expression, 
  onChange, 
  onEvaluate, 
  onClear,
  isValid
}: ExpressionInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [expression]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      e.preventDefault();
      onEvaluate();
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-5 border border-slate-200 dark:border-slate-700">
      <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
        <span className="text-primary-600">
          <Play className="h-5 w-5" />
        </span>
        Expression Input
      </h2>
      
      <div className="mb-4">
        <textarea 
          ref={textareaRef}
          value={expression}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full h-24 p-3 border border-slate-300 dark:border-slate-600 rounded-md bg-slate-50 dark:bg-slate-700 font-mono text-base focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-600 dark:focus:border-primary-600 outline-none transition-all resize-y"
          placeholder="Enter a Lisp-style expression: (add 5 10)"
        />
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {examples.map((example) => (
          <button 
            key={example.label}
            onClick={() => onChange(example.expression)}
            className="px-3 py-1.5 text-sm bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 rounded transition-colors"
          >
            {example.label}
          </button>
        ))}
      </div>
      
      <div className="flex justify-between items-center">
        <div className={`text-sm ${isValid ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
          {isValid ? (
            <>
              <CheckCircle className="inline-block mr-1 h-4 w-4" />
              Valid expression
            </>
          ) : (
            <>
              <AlertCircle className="inline-block mr-1 h-4 w-4" />
              Invalid expression
            </>
          )}
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={onClear}
            className="flex items-center gap-1"
          >
            <Eraser className="h-4 w-4" />
            Clear
          </Button>
          <Button
            onClick={onEvaluate}
            disabled={!isValid}
            className="flex items-center gap-1 bg-primary-600 hover:bg-primary-700"
          >
            <Play className="h-4 w-4" />
            Evaluate
          </Button>
        </div>
      </div>
    </div>
  );
}
