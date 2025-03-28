import { DataItem } from "@/types/data";

export async function generateData(count = 1000): Promise<DataItem[]> {
  const statuses: DataItem["status"][] = ["active", "inactive", "pending"];
  const roles: DataItem["role"][] = ["user", "admin", "editor"];
  const countries = [
    "United States",
    "Canada",
    "United Kingdom",
    "Germany",
    "France",
    "Australia",
    "Japan",
    "Brazil",
    "India",
    "China",
  ];
  const cities = {
    "United States": ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"],
    Canada: ["Toronto", "Vancouver", "Montreal", "Calgary", "Ottawa"],
    "United Kingdom": ["London", "Manchester", "Birmingham", "Glasgow", "Liverpool"],
    Germany: ["Berlin", "Munich", "Hamburg", "Cologne", "Frankfurt"],
    France: ["Paris", "Marseille", "Lyon", "Toulouse", "Nice"],
    Australia: ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide"],
    Japan: ["Tokyo", "Osaka", "Kyoto", "Yokohama", "Sapporo"],
    Brazil: ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador", "Fortaleza"],
    India: ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai"],
    China: ["Beijing", "Shanghai", "Guangzhou", "Shenzhen", "Chengdu"],
  };

  const data: DataItem[] = [];

  for (let i = 0; i < count; i++) {
    const id = `USR-${(1000 + i).toString()}`;
    const firstName = ["John", "Jane", "Michael", "Emily", "David", "Sarah", "Robert", "Lisa", "William", "Emma"][
      Math.floor(Math.random() * 10)
    ];
    const lastName = [
      "Smith",
      "Johnson",
      "Williams",
      "Brown",
      "Jones",
      "Miller",
      "Davis",
      "Garcia",
      "Rodriguez",
      "Wilson",
    ][Math.floor(Math.random() * 10)];
    const name = `${firstName} ${lastName}`;
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${Math.floor(Math.random() * 100)}@example.com`;
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const role = roles[Math.floor(Math.random() * roles.length)];

    // Random dates within the last 2 years
    const now = new Date();
    const twoYearsAgo = new Date();
    twoYearsAgo.setFullYear(now.getFullYear() - 2);

    const joinedAt = new Date(twoYearsAgo.getTime() + Math.random() * (now.getTime() - twoYearsAgo.getTime()));
    const lastActive = new Date(joinedAt.getTime() + Math.random() * (now.getTime() - joinedAt.getTime()));

    const country = countries[Math.floor(Math.random() * countries.length)];
    const countryCities = cities[country as keyof typeof cities];
    const city = countryCities[Math.floor(Math.random() * countryCities.length)];

    const transactions = Math.floor(Math.random() * 100);
    const revenue = Math.round(transactions * (50 + Math.random() * 200));

    data.push({
      id,
      name,
      email,
      status,
      role,
      lastActive,
      joinedAt,
      country,
      city,
      transactions,
      revenue,
    });
  }

  return data;
}

export interface DataQueryParams {
  page: number;
  pageSize: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  filters?: {
    status?: DataItem["status"][];
    role?: DataItem["role"][];
    country?: string[];
    search?: string;
  };
}

export interface DataQueryResult {
  data: DataItem[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export async function queryData(params: DataQueryParams): Promise<DataQueryResult> {
  await new Promise((resolve) => setTimeout(resolve, 800));

  let data = await generateData();
  let total = data.length;

  if (params.filters) {
    if (params.filters.status && params.filters.status.length > 0) {
      data = data.filter((item) => params.filters?.status?.includes(item.status));
    }

    if (params.filters.role && params.filters.role.length > 0) {
      data = data.filter((item) => params.filters?.role?.includes(item.role));
    }

    if (params.filters.country && params.filters.country.length > 0) {
      data = data.filter((item) => params.filters?.country?.includes(item.country));
    }

    if (params.filters.search) {
      const search = params.filters.search.toLowerCase();
      data = data.filter(
        (item) =>
          item.name.toLowerCase().includes(search) ||
          item.email.toLowerCase().includes(search) ||
          item.id.toLowerCase().includes(search),
      );
    }

    total = data.length;
  }

  // Apply sorting
  if (params.sortBy) {
    const sortOrder = params.sortOrder === "desc" ? -1 : 1;
    data = data.sort((a, b) => {
      const aValue = a[params.sortBy as keyof DataItem];
      const bValue = b[params.sortBy as keyof DataItem];

      if (aValue < bValue) return -1 * sortOrder;
      if (aValue > bValue) return 1 * sortOrder;
      return 0;
    });
  }

  const startIndex = (params.page - 1) * params.pageSize;
  const endIndex = startIndex + params.pageSize;
  const paginatedData = data.slice(startIndex, endIndex);

  return {
    data: paginatedData,
    total,
    page: params.page,
    pageSize: params.pageSize,
    totalPages: Math.ceil(total / params.pageSize),
  };
}

// Get unique values for filters
export async function getFilterOptions(): Promise<{
  countries: string[];
  statuses: DataItem["status"][];
  roles: DataItem["role"][];
}> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    countries: [
      "United States",
      "Canada",
      "United Kingdom",
      "Germany",
      "France",
      "Australia",
      "Japan",
      "Brazil",
      "India",
      "China",
    ],
    statuses: ["active", "inactive", "pending"],
    roles: ["user", "admin", "editor"],
  };
}