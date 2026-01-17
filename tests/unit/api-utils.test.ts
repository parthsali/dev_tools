import { NextRequest } from 'next/server';
import { getPagination, paginateArray, filterAndSortArray } from '@/lib/api-utils';

// Helper to create a mock NextRequest
const createMockRequest = (url: string) => {
    const urlObj = new URL(url);
    return {
        nextUrl: {
            searchParams: urlObj.searchParams
        }
    } as unknown as NextRequest;
};

describe('API Utils', () => {
    describe('getPagination', () => {
        it('should return default pagination values', () => {
            const req = createMockRequest('http://localhost/api/test');
            const pagination = getPagination(req);

            expect(pagination).toEqual({ page: 1, limit: 50 });
        });

        it('should return custom pagination values', () => {
            const req = createMockRequest('http://localhost/api/test?page=2&limit=10');
            const pagination = getPagination(req);

            expect(pagination).toEqual({ page: 2, limit: 10 });
        });

        it('should cap limit at 100', () => {
            const req = createMockRequest('http://localhost/api/test?limit=200');
            const pagination = getPagination(req);

            expect(pagination.limit).toBe(100);
        });
    });

    describe('paginateArray', () => {
        const data = Array.from({ length: 20 }, (_, i) => i + 1);

        it('should paginate correctly', () => {
            const result = paginateArray(data, 1, 10);
            expect(result).toHaveLength(10);
            expect(result[0]).toBe(1);
            expect(result[9]).toBe(10);
        });

        it('should handle last page correctly', () => {
            const result = paginateArray(data, 2, 12);
            expect(result).toHaveLength(8); // 20 - 12 = 8 items remaining
        });
    });

    describe('filterAndSortArray', () => {
        const data = [
            { id: 1, name: 'Alice', age: 30, active: true },
            { id: 2, name: 'Bob', age: 25, active: false },
            { id: 3, name: 'Charlie', age: 35, active: true },
        ];

        it('should filter by string field', () => {
            const req = createMockRequest('http://localhost/api/test?name=Alice');
            const result = filterAndSortArray(data, req);

            expect(result).toHaveLength(1);
            expect(result[0].name).toBe('Alice');
        });

        it('should filter by number field', () => {
            const req = createMockRequest('http://localhost/api/test?age=25');
            const result = filterAndSortArray(data, req);

            expect(result).toHaveLength(1);
            expect(result[0].name).toBe('Bob');
        });

        it('should filter by boolean field', () => {
            const req = createMockRequest('http://localhost/api/test?active=false');
            const result = filterAndSortArray(data, req);

            expect(result).toHaveLength(1);
            expect(result[0].name).toBe('Bob');
        });

        it('should sort ascending', () => {
            const req = createMockRequest('http://localhost/api/test?sort=age&order=asc');
            const result = filterAndSortArray(data, req);

            expect(result[0].age).toBe(25);
            expect(result[2].age).toBe(35);
        });

        it('should sort descending', () => {
            const req = createMockRequest('http://localhost/api/test?sort=name&order=desc');
            const result = filterAndSortArray(data, req);

            expect(result[0].name).toBe('Charlie'); // C comes after B and A
            expect(result[2].name).toBe('Alice');
        });

        it('should search globally with q param', () => {
            const req = createMockRequest('http://localhost/api/test?q=Bob');
            const result = filterAndSortArray(data, req);

            expect(result).toHaveLength(1);
            expect(result[0].name).toBe('Bob');
        });
    });
});
