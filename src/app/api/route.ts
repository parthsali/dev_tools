import { NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://tools.parthsali.com";

export async function GET() {
    return NextResponse.json({
        message: "DevTools Mock REST API - Indian Data for Testing & Prototyping",
        provider: "DevTools",
        version: "1.0.0",
        documentation: `${BASE_URL}/tools/dummy-api`,
        resources: [
            {
                name: "users",
                endpoints: {
                    list: `${BASE_URL}/api/users`,
                    single: `${BASE_URL}/api/users/:id`,
                },
                description: "1000+ Indian users with realistic names, emails, addresses, phone numbers",
                params: ["page", "limit", "sortBy", "order"],
            },
            {
                name: "posts",
                endpoints: {
                    list: `${BASE_URL}/api/posts`,
                    single: `${BASE_URL}/api/posts/:id`,
                },
                description: "1000+ blog posts with tags, reactions, and views",
                params: ["page", "limit", "sortBy", "order"],
            },
            {
                name: "products",
                endpoints: {
                    list: `${BASE_URL}/api/products`,
                    single: `${BASE_URL}/api/products/:id`,
                },
                description: "1000+ products with Indian brands and categories",
                params: ["page", "limit", "sortBy", "order"],
            },
            {
                name: "todos",
                endpoints: {
                    list: `${BASE_URL}/api/todos`,
                    single: `${BASE_URL}/api/todos/:id`,
                },
                description: "1000+ todo items with completion status",
                params: ["page", "limit"],
            },
            {
                name: "comments",
                endpoints: {
                    list: `${BASE_URL}/api/comments`,
                    single: `${BASE_URL}/api/comments/:id`,
                },
                description: "1000+ comments with user and post references",
                params: ["page", "limit", "postId", "userId"],
            },
            {
                name: "orders",
                endpoints: {
                    list: `${BASE_URL}/api/orders`,
                    single: `${BASE_URL}/api/orders/:id`,
                },
                description: "1000+ e-commerce orders with items and status",
                params: ["page", "limit", "status", "userId"],
            },
            {
                name: "companies",
                endpoints: {
                    list: `${BASE_URL}/api/companies`,
                    single: `${BASE_URL}/api/companies/:id`,
                },
                description: "1000+ Indian companies with GST numbers and industries",
                params: ["page", "limit", "industry"],
            },
            {
                name: "quotes",
                endpoints: {
                    list: `${BASE_URL}/api/quotes`,
                    single: `${BASE_URL}/api/quotes/:id`,
                },
                description: "1000+ inspirational quotes from Indian personalities",
                params: ["page", "limit", "category"],
            },
        ],
        features: [
            "No authentication required",
            "CORS enabled",
            "Pagination support",
            "Sorting and filtering",
            "Indian-specific data",
        ],
        examples: {
            getAllUsers: `${BASE_URL}/api/users`,
            paginatedUsers: `${BASE_URL}/api/users?page=2&limit=20`,
            singleUser: `${BASE_URL}/api/users/1`,
            sortedProducts: `${BASE_URL}/api/products?sortBy=price&order=desc`,
            filteredOrders: `${BASE_URL}/api/orders?status=delivered`,
        },
    });
}
