import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HelpModal({ isOpen, onClose }: HelpModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex justify-between items-center">
          <DialogTitle className="text-xl font-semibold">Lisp Expression Evaluator Help</DialogTitle>
          <button 
            onClick={onClose}
            className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
          >
            <X className="h-6 w-6" />
          </button>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div>
            <h3 className="text-lg font-medium mb-3">What is this?</h3>
            <p className="text-slate-600 dark:text-slate-400">
              This application allows you to enter and evaluate mathematical expressions using 
              Lisp-style syntax. It then converts your input into JavaScript code and executes it.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-3">Lisp Syntax</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-3">
              Lisp uses prefix notation where the operator comes before the operands, all
              wrapped in parentheses:
            </p>
            <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-md">
              <code className="font-mono">(operator arg1 arg2 ...)</code>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-3">Supported Operations</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-md">
                <h4 className="font-medium mb-2">Addition</h4>
                <div className="font-mono mb-2">(add 5 10)</div>
                <div className="text-slate-600 dark:text-slate-400 text-sm">Converts to: 5 + 10</div>
                <div className="text-green-600 dark:text-green-400 mt-2">Result: 15</div>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-md">
                <h4 className="font-medium mb-2">Subtraction</h4>
                <div className="font-mono mb-2">(subtract 20 8)</div>
                <div className="text-slate-600 dark:text-slate-400 text-sm">Converts to: 20 - 8</div>
                <div className="text-green-600 dark:text-green-400 mt-2">Result: 12</div>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-md">
                <h4 className="font-medium mb-2">Multiplication</h4>
                <div className="font-mono mb-2">(multiply 6 7)</div>
                <div className="text-slate-600 dark:text-slate-400 text-sm">Converts to: 6 * 7</div>
                <div className="text-green-600 dark:text-green-400 mt-2">Result: 42</div>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-md">
                <h4 className="font-medium mb-2">Division</h4>
                <div className="font-mono mb-2">(divide 100 4)</div>
                <div className="text-slate-600 dark:text-slate-400 text-sm">Converts to: 100 / 4</div>
                <div className="text-green-600 dark:text-green-400 mt-2">Result: 25</div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-3">Nested Expressions</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-3">
              You can nest expressions to create more complex calculations:
            </p>
            <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-md">
              <div className="font-mono mb-2">(add (multiply 3 4) (divide 10 2))</div>
              <div className="text-slate-600 dark:text-slate-400 text-sm">Converts to: (3 * 4) + (10 / 2)</div>
              <div className="text-green-600 dark:text-green-400 mt-2">Result: 17</div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-3">Common Errors</h3>
            <div className="space-y-3">
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-md border border-red-200 dark:border-red-800/50">
                <div className="font-mono text-red-600 dark:text-red-400 mb-1">(add 5</div>
                <div className="text-slate-600 dark:text-slate-400 text-sm">Missing closing parenthesis</div>
              </div>
              
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-md border border-red-200 dark:border-red-800/50">
                <div className="font-mono text-red-600 dark:text-red-400 mb-1">(invalid 5 10)</div>
                <div className="text-slate-600 dark:text-slate-400 text-sm">Unknown operator 'invalid'</div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
