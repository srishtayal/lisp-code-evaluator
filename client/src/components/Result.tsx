import { Card } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

interface ResultProps {
  expression: string;
  jsEquivalent: string;
  result: number | null;
}

export default function Result({ expression, jsEquivalent, result }: ResultProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-5 border border-slate-200 dark:border-slate-700">
      <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
        <span className="text-primary-600">
          <CheckCircle className="h-5 w-5" />
        </span>
        Evaluation Result
      </h2>
      
      <div className="flex flex-col gap-4">
        <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-md border border-slate-200 dark:border-slate-600">
          <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">Input Expression:</div>
          <div className="font-mono">{expression || "(No expression)"}</div>
        </div>
        
        <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-md border border-slate-200 dark:border-slate-600">
          <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">JavaScript Equivalent:</div>
          <div className="font-mono text-primary-700 dark:text-primary-400">{jsEquivalent || "(No JavaScript equivalent)"}</div>
        </div>
        
        <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-md border border-slate-200 dark:border-slate-600">
          <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">Result:</div>
          <div className="font-mono text-2xl text-green-600 dark:text-green-400 font-semibold">
            {result !== null ? result : "(Not evaluated)"}
          </div>
        </div>
      </div>
    </div>
  );
}
