"use server";
import type { PriceRequest, PriceResult } from "@/bff/domain/price.domain";
import { priceService } from "@/bff/service/price.service";

export async function createEstimation(
  body: PriceRequest,
): Promise<PriceResult> {
  const consommation = Number(body?.consommation);
  if (!Number.isFinite(consommation) || consommation <= 0) {
    return {
      ok: false,
      status: 400,
      message: "Renseignez une consommation annuelle valide",
    };
  }

  return priceService({ ...body, consommation });
}
