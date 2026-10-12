import type {
  PriceRequest,
  PriceResponse,
  PriceResult,
} from "../domain/price.domain";

const TIMEOUT_MS = 10_000;

type ApiError = { message?: string | string[] };

const failure = (status: number, message: string): PriceResult => ({
  ok: false,
  status,
  message,
});

// Lit le message d'erreur renvoyé par NestJS ({ message, error, statusCode })
const readErrorMessage = async (response: Response): Promise<string> => {
  try {
    const { message } = (await response.json()) as ApiError;
    if (Array.isArray(message)) return message.join(", ");
    if (message) return message;
  } catch {
    // Corps vide ou non JSON
  }
  return response.statusText || "Erreur de l'API";
};

export const priceService = async (
  body: PriceRequest,
): Promise<PriceResult> => {
  const backEnd = process.env.HOSTED_URL;
  if (!backEnd) {
    return failure(500, "HOSTED_URL n'est pas défini");
  }

  let response: Response;
  try {
    response = await fetch(`${backEnd}/price`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === "TimeoutError") {
      return failure(504, "L'API n'a pas répondu à temps");
    }
    return failure(503, "API injoignable");
  }

  if (!response.ok) {
    return failure(response.status, await readErrorMessage(response));
  }

  try {
    const data = (await response.json()) as PriceResponse;
    return { ok: true, data };
  } catch {
    return failure(502, "Réponse de l'API invalide");
  }
};
