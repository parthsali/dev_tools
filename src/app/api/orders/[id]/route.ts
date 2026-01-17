import { NextResponse } from "next/server";
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

export async function GET(
    _request: Request,
    { params }: { params: { id: string } }
) {
    const id = parseInt(params.id);
    const order = orders.find((o) => o.id === id);

    if (!order) {
        return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(order);
}
