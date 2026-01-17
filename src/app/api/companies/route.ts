import { NextRequest, NextResponse } from "next/server";
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

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = Math.min(parseInt(searchParams.get("limit") || "10"), 50);
    const industry = searchParams.get("industry");

    let filtered = [...companies];

    // Filter by industry if provided
    if (industry) {
        filtered = filtered.filter((c) => c.industry.toLowerCase() === industry.toLowerCase());
    }

    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedCompanies = filtered.slice(start, end);

    return NextResponse.json({
        companies: paginatedCompanies,
        total: filtered.length,
        page,
        limit,
        totalPages: Math.ceil(filtered.length / limit),
    });
}
