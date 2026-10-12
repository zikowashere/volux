import { BadRequestException, Injectable } from '@nestjs/common';

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
  devise: 'EUR';
  detail: {
    consommationKwh: number;
    prixKwh: number;
    abonnementAnnuel: number;
    remisePourcentage: number;
  };
};

const PRIX_KWH: Record<string, number> = {
  Base: 0.2,
  'Heures pleines / creuses': 0.185,
};
const ABONNEMENT_ANNUEL = 180;
const REMISE_DUREE: Record<string, number> = {
  '2 ans': 0,
  '4 ans': 3,
  '6 ans': 5,
};
const LATENCE_MS = 8000;

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const round = (n: number) => Math.round(n * 100) / 100;

@Injectable()
export class PriceService {
  async estimate(body: PriceRequest): Promise<PriceResponse> {
    const consommationKwh = Number(body.consommation);
    if (!Number.isFinite(consommationKwh) || consommationKwh <= 0) {
      throw new BadRequestException(
        'consommation doit être un nombre de kWh positif',
      );
    }

    await wait(LATENCE_MS);

    const prixKwh = PRIX_KWH[body.optionTarifaire ?? ''] ?? PRIX_KWH.Base;
    const remisePourcentage = REMISE_DUREE[body.dureeContrat ?? ''] ?? 0;
    const brut = consommationKwh * prixKwh + ABONNEMENT_ANNUEL;
    const prixAnnuelHT = round(brut * (1 - remisePourcentage / 100));

    return {
      prixAnnuelHT,
      prixMensuelHT: round(prixAnnuelHT / 12),
      devise: 'EUR',
      detail: {
        consommationKwh,
        prixKwh,
        abonnementAnnuel: ABONNEMENT_ANNUEL,
        remisePourcentage,
      },
    };
  }
}
