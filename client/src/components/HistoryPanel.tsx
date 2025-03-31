import { formatDistanceToNow } from "date-fns";
import { HistoryItem } from "@/types";
import { X, Clock } from "lucide-react";

interface HistoryPanelProps {
  history: HistoryItem[];
  onHistoryItemClick: (expression: string) => void;
  onClearHistory: () => void;
}

export default function HistoryPanel({ 
  history, 
  onHistoryItemClick,
  onClearHistory
}: HistoryPanelProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-5 border border-slate-200 dark:border-slate-700">
      <h2 className="text-lg font-medium mb-4 flex items-center justify-between">
        <span className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary-600" />
          History
        </span>
        <button 
          onClick={onClearHistory}
          className="text-xs px-2 py-1 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
        >
          Clear All
        </button>
      </h2>
      
      <div className="flex flex-col gap-2 max-h-80 overflow-y-auto pr-2">
        {history.length === 0 ? (
          <div className="text-center text-slate-500 dark:text-slate-400 py-4">
            No history yet. Evaluate expressions to see them here.
          </div>
        ) : (
          history.map((item, index) => (
            <div 
              key={index}
              onClick={() => onHistoryItemClick(item.expression)}
              className="history-item p-3 bg-slate-50 dark:bg-slate-700 rounded-md border border-slate-200 dark:border-slate-600 hover:border-primary-400 dark:hover:border-primary-500 cursor-pointer transition-colors"
            >
              <div className="font-mono text-sm mb-1">{item.expression}</div>
              <div className="flex justify-between items-center">
                <div className="text-green-600 dark:text-green-400 font-mono font-medium">{item.result}</div>
                <div className="text-xs text-slate-400">
                  {formatDistanceToNow(item.timestamp, { addSuffix: true })}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
