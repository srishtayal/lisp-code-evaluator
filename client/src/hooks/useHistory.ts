import { useState, useEffect } from "react";
import { HistoryItem } from "@/types";

const HISTORY_STORAGE_KEY = "lisp-eval-history";
const MAX_HISTORY_ITEMS = 20;

export function useHistory() {
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    // Load history from localStorage on initial load
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(HISTORY_STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          // Convert stored dates back to Date objects
          return parsed.map((item: any) => ({
            ...item,
            timestamp: new Date(item.timestamp)
          }));
        } catch (e) {
          console.error("Failed to parse history from localStorage", e);
          return [];
        }
      }
    }
    return [];
  });
  
  // Save to localStorage whenever history changes
  useEffect(() => {
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
  }, [history]);
  
  const addToHistory = (item: HistoryItem) => {
    setHistory(prevHistory => {
      // Add new item at the beginning and limit the total number
      const newHistory = [item, ...prevHistory.slice(0, MAX_HISTORY_ITEMS - 1)];
      return newHistory;
    });
  };
  
  const clearHistory = () => {
    setHistory([]);
  };
  
  return {
    history,
    addToHistory,
    clearHistory
  };
}
