import { NextRequest, NextResponse } from "next/server";
import ordersData from "@/data/orders.json";

const orders = ordersData as Array<{
    id: number;
    userId: number;
    items: Array<{ productId: number; quantity: number; price: number }>;
    total: number;
    status: string;
    paymentMethod: string;
    shippingAddress: {
        address: string;
        city: string;
        state: string;
        postalCode: string;
    };
    orderDate: string;
    deliveryDate: string;
}>;

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = Math.min(parseInt(searchParams.get("limit") || "10"), 50);
    const status = searchParams.get("status");
    const userId = searchParams.get("userId");

    let filtered = [...orders];

    // Filter by status if provided
    if (status) {
        filtered = filtered.filter((o) => o.status.toLowerCase() === status.toLowerCase());
    }

    // Filter by userId if provided
    if (userId) {
        filtered = filtered.filter((o) => o.userId === parseInt(userId));
    }

    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedOrders = filtered.slice(start, end);

    return NextResponse.json({
        orders: paginatedOrders,
        total: filtered.length,
        page,
        limit,
        totalPages: Math.ceil(filtered.length / limit),
    });
}
