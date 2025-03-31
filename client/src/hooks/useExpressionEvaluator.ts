import { useState, useEffect } from "react";
import { parseLisp, lispToJS, evaluateLisp } from "@/lib/parser";
import { ExpressionError } from "@/types";

export function useExpressionEvaluator(initialExpression: string = "(multiply 6 7)") {
  const [expression, setExpression] = useState(initialExpression);
  const [result, setResult] = useState<number | null>(null);
  const [jsEquivalent, setJsEquivalent] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState<ExpressionError | null>(null);
  
  useEffect(() => {
    validateExpression(expression);
  }, [expression]);
  
  const validateExpression = (expr: string) => {
    const parseResult = parseLisp(expr);
    
    if (parseResult.valid && parseResult.node) {
      setIsValid(true);
      setError(null);
      
      try {
        const js = lispToJS(parseResult.node);
        setJsEquivalent(js);
      } catch (e) {
        setIsValid(false);
        setError({
          message: e instanceof Error ? e.message : "Unknown error during conversion",
          help: "Check your expression syntax"
        });
        setJsEquivalent("");
      }
    } else {
      setIsValid(false);
      setError(parseResult.error || {
        message: "Invalid expression",
        help: "Check your syntax and try again"
      });
      setJsEquivalent("");
    }
  };
  
  const evaluate = (): number | null => {
    if (!isValid) return null;
    
    const result = evaluateLisp(expression);
    setResult(result);
    return result;
  };
  
  const clearExpression = () => {
    setExpression("");
    setResult(null);
    setJsEquivalent("");
    setError(null);
  };
  
  return {
    expression,
    setExpression,
    result,
    jsEquivalent,
    isValid,
    error,
    evaluate,
    clearExpression,
  };
}
