import { priceDomain } from "@/bff/domain/price.domain";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const body = await request.json();

  if (!body)
    return NextResponse.json({
      status: 400,
      message: "les inputs manquent pour faire l'action",
    });
  const response = await priceDomain(body);

  if (!response.ok) {
    return NextResponse.json({
      status: response.status,
      message: response.message,
    });
  }
  return NextResponse.json(response);
}
