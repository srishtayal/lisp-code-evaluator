import { Moon, Sun, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/lib/theme";

interface HeaderProps {
  onHelpClick: () => void;
}

export default function Header({ onHelpClick }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  
  return (
    <header className="border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <i className="ri-code-box-line text-primary-600 text-2xl"></i>
          <h1 className="font-semibold text-xl">Lisp Expression Evaluator</h1>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost" 
            size="icon"
            onClick={onHelpClick}
            className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
          >
            <HelpCircle className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost" 
            size="icon"
            onClick={toggleTheme}
            className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
          >
            {theme === "dark" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
