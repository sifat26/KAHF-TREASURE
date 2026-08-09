export interface PaginationOptions {
  page: number;
  limit: number;
  skip: number;
  sort: Record<string, 1 | -1>;
}

export function getPagination(query: Record<string, unknown>): PaginationOptions {
  const page = Math.max(1, parseInt(String(query.page || '1'), 10));
  const limit = Math.min(100, Math.max(1, parseInt(String(query.limit || '20'), 10)));
  const skip = (page - 1) * limit;

  let sort: Record<string, 1 | -1> = { createdAt: -1 };
  if (query.sort) {
    const sortStr = String(query.sort);
    if (sortStr.startsWith('-')) {
      sort = { [sortStr.slice(1)]: -1 };
    } else {
      sort = { [sortStr]: 1 };
    }
  }

  return { page, limit, skip, sort };
}
