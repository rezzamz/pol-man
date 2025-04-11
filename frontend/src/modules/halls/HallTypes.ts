export interface Hall {
    id: string;
    hallName: string;
    importerName: string;
    numberOfChickens: number;
    initialWeight: number;
    budgetType: string;
    createdAt: string; // Change from Date to string
    
  }
  
  export type BudgetType = 'Standard' | 'Premium' | 'Economy';