export interface HistoryItem {
  expression: string;
  result: number;
  timestamp: Date;
}

export interface ExpressionError {
  message: string;
  help?: string;
}
