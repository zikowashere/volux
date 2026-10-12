import { priceService } from "../service/price.service";

export type PriceRequest = {
  activite?: string;
  codePostal?: string;
  puissance?: string;
  optionTarifaire?: string;
  consommation?: number | string;
  dureeContrat?: string;
};

export type PriceResponse = {
  prixAnnuelHT: number;
  prixMensuelHT: number;
  devise: "EUR";
  detail: {
    consommationKwh: number;
    prixKwh: number;
    abonnementAnnuel: number;
    remisePourcentage: number;
  };
};

export type PriceResult =
  | { ok: true; data: PriceResponse }
  | { ok: false; status: number; message: string };

export const priceDomain = async (body: PriceRequest) => {
  return priceService(body);
};
