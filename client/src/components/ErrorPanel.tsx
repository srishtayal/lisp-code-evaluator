import { AlertTriangle } from "lucide-react";

interface ErrorPanelProps {
  message: string;
  help?: string;
}

export default function ErrorPanel({ message, help }: ErrorPanelProps) {
  return (
    <div className="bg-red-50 dark:bg-red-900/20 rounded-lg shadow-md p-5 border border-red-200 dark:border-red-800/50">
      <h2 className="text-lg font-medium mb-4 text-red-700 dark:text-red-400 flex items-center gap-2">
        <AlertTriangle className="h-5 w-5" />
        Error
      </h2>
      
      <div className="p-4 bg-white dark:bg-slate-800 rounded-md border border-red-200 dark:border-red-800/50">
        <div className="font-mono text-red-600 dark:text-red-400">
          {message}
        </div>
        {help && (
          <div className="mt-2 text-slate-600 dark:text-slate-400 text-sm">
            {help}
          </div>
        )}
      </div>
    </div>
  );
}
