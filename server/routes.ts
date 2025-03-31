import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoint to evaluate a Lisp expression
  app.post("/api/evaluate", (req, res) => {
    const { expression } = req.body;
    
    if (!expression) {
      return res.status(400).json({ 
        error: "Missing expression parameter" 
      });
    }
    
    try {
      // Parse and evaluate logic is on the client side
      // This endpoint is just for demonstrating the API structure
      res.status(200).json({ 
        success: true,
        message: "Expression evaluated on client side"
      });
    } catch (error) {
      res.status(400).json({ 
        error: error instanceof Error ? error.message : "Unknown error" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
