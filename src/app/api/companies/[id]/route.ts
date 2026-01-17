import { NextResponse } from "next/server";
import companiesData from "@/data/companies.json";

const companies = companiesData as Array<{
    id: number;
    name: string;
    industry: string;
    gstNumber: string;
    pan: string;
    email: string;
    phone: string;
    address: {
        address: string;
        city: string;
        state: string;
        postalCode: string;
    };
    founded: number;
    employees: number;
    revenue: string;
    website: string;
}>;

export async function GET(
    _request: Request,
    { params }: { params: { id: string } }
) {
    const id = parseInt(params.id);
    const company = companies.find((c) => c.id === id);

    if (!company) {
        return NextResponse.json({ error: "Company not found" }, { status: 404 });
    }

    return NextResponse.json(company);
}
