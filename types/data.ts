export interface DataPageProps {
    page?: number;
    pageSize?: number;
    sortBy: string;
    sortOrder: "asc" | "desc"
    filters?: {
        status?: DataItem["status"][]
        role?: DataItem["role"][]
        country?: string[]
        search?: string
    }
};

export interface DataItem {
    id: string
    name: string
    email: string
    status: "active" | "inactive" | "pending"
    role: "user" | "admin" | "editor"
    lastActive: Date
    joinedAt: Date
    country: string
    city: string
    transactions: number
    revenue: number
  }