import Header from "@/components/Header";
import ExpressionInput from "@/components/ExpressionInput";
import Result from "@/components/Result";
import ErrorPanel from "@/components/ErrorPanel";
import HistoryPanel from "@/components/HistoryPanel";
import HelpPanel from "@/components/HelpPanel";
import HelpModal from "@/components/HelpModal";
import { useState } from "react";
import { useExpressionEvaluator } from "@/hooks/useExpressionEvaluator";
import { useHistory } from "@/hooks/useHistory";

export default function Home() {
  const [showHelpModal, setShowHelpModal] = useState(false);
  const {
    expression,
    setExpression,
    jsEquivalent,
    result,
    error,
    isValid,
    evaluate,
    clearExpression,
  } = useExpressionEvaluator();
  
  const { history, addToHistory, clearHistory } = useHistory();

  const handleEvaluate = () => {
    if (!isValid) return;
    
    const evaluationResult = evaluate();
    if (evaluationResult !== null) {
      addToHistory({
        expression: expression,
        result: evaluationResult,
        timestamp: new Date(),
      });
    }
  };

  const handleHistoryItemClick = (historyExpression: string) => {
    setExpression(historyExpression);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Header 
        onHelpClick={() => setShowHelpModal(true)}
      />
      
      <main className="container mx-auto px-4 py-6 flex flex-col md:flex-row gap-6">
        <div className="flex-1 flex flex-col gap-6">
          <ExpressionInput
            expression={expression}
            onChange={setExpression}
            onEvaluate={handleEvaluate}
            onClear={clearExpression}
            isValid={isValid}
          />
          
          {error ? (
            <ErrorPanel 
              message={error.message}
              help={error.help}
            />
          ) : (
            <Result
              expression={expression}
              jsEquivalent={jsEquivalent}
              result={result}
            />
          )}
        </div>
        
        <div className="md:w-80 flex flex-col gap-6">
          <HistoryPanel
            history={history}
            onHistoryItemClick={handleHistoryItemClick}
            onClearHistory={clearHistory}
          />
          
          <HelpPanel />
        </div>
      </main>
      
      <HelpModal
        isOpen={showHelpModal}
        onClose={() => setShowHelpModal(false)}
      />
    </div>
  );
}
