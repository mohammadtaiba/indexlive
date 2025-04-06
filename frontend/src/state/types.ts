// Um die Struktur der Antwortdaten beim Abrufen von Informationen aus einer API zu definieren.

export interface ExpensesByCategory {
    salaries: number;
    supplies: number;
    services: number;
}

export interface Month {
    id: string;
    month: string;
    revenue: number;
    expenses: number;
}

export interface Day {
    id: string;
    date: string;
    revenue: number;
    expenses: number;
}

export interface GetKpisResponse {
    id: string;                     // User-friendly identifier
    _id: string;                    // MongoDB document identifier.
    __v: number;                    // Mongoose document version for concurrency control.
    totalProfit: number;
    totalRevenue: number;
    totalExpenses: number;
    expensesByCategory: ExpensesByCategory; // --> object
    monthlyData: Array<Month>;
    dailyData: Array<Day>;
    createdAt: string;              // Times staps
    updatedAt: string;              // Times staps
}

export interface GetProductsResponse {
    id: string;
    _id: string;
    __v: number;
    price: number;
    expense: number;
    transactions: Array<string>;
    createdAt: string;
    updatedAt: string;
}

export interface GetTransactionsResponse {
    id: string;
    _id: string;
    __v: number;
    buyer: string;
    amount: number;
    productIds: Array<string>;
    createdAt: string;
    updatedAt: string;
}

export interface CreateProductRequest {
    id?: string;
    _id?: string;
    __v?: number;
    price: number;
    expense: number;
    transactions: Array<string>;
    createdAt?: string;
    updatedAt?: string;
}

export interface UpdateProductRequest {
    id: string;
    _id?: string;
    __v?: number;
    price?: number;
    expense: number;
    transactions?: Array<string>;
    createdAt?: string;
    updatedAt?: string;
}

export interface CreateTransactionRequest {
    id?: string;
    _id?: string;
    __v?: number;
    buyer: string;
    amount: number;
    productIds: Array<string>;
    createdAt?: string;
    updatedAt?: string;
}

export interface UpdateTransactionRequest {
    id: string;
    _id?: string;
    __v?: number;
    buyer?: string;
    amount?: number;
    productIds?: Array<string>;
    createdAt?: string;
    updatedAt?: string;
}