export default function HelpPanel() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-5 border border-slate-200 dark:border-slate-700">
      <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
        <i className="ri-questionnaire-line text-primary-600"></i>
        Quick Help
      </h2>
      
      <div className="space-y-4 text-sm">
        <div>
          <h3 className="font-medium mb-1">Lisp Syntax Basics:</h3>
          <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-400">
            <li>Expressions are enclosed in parentheses</li>
            <li>First element is the operator</li>
            <li>Remaining elements are arguments</li>
            <li>Expressions can be nested</li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-medium mb-1">Supported Operations:</h3>
          <ul className="space-y-2">
            <li className="flex items-start">
              <code className="font-mono bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded mr-2">(add a b)</code>
              <span className="text-slate-600 dark:text-slate-400">Addition (a + b)</span>
            </li>
            <li className="flex items-start">
              <code className="font-mono bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded mr-2">(subtract a b)</code>
              <span className="text-slate-600 dark:text-slate-400">Subtraction (a - b)</span>
            </li>
            <li className="flex items-start">
              <code className="font-mono bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded mr-2">(multiply a b)</code>
              <span className="text-slate-600 dark:text-slate-400">Multiplication (a * b)</span>
            </li>
            <li className="flex items-start">
              <code className="font-mono bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded mr-2">(divide a b)</code>
              <span className="text-slate-600 dark:text-slate-400">Division (a / b)</span>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-medium mb-1">Examples:</h3>
          <ul className="space-y-1 text-slate-600 dark:text-slate-400">
            <li><code className="font-mono">(add 5 10)</code> → 15</li>
            <li><code className="font-mono">(add (multiply 2 3) 4)</code> → 10</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
