"use client";
import clsx from "clsx";
import {
  ArrowRight,
  Building2,
  Clock,
  Gauge,
  MapPin,
  Receipt,
  Zap,
} from "lucide-react";
import React, { useActionState, useState } from "react";
import ButtonRadio from "../ui/button/ButtonRadio";
import DropDownButton from "../ui/button/DropDownButton";
import TitleButton from "../ui/button/TitleButton";
import Input from "../ui/Input";
import { createEstimation } from "@/action/simuator";

type SimulatorValues = {
  activite?: string;
  codePostal?: string;
  puissance?: string;
  optionTarifaire?: string;
  consommation?: string;
  dureeContrat?: string;
};

const RECAP: { key: keyof SimulatorValues; label: string; unit?: string }[] = [
  { key: "activite", label: "Activité" },
  { key: "codePostal", label: "Code postal" },
  { key: "puissance", label: "Puissance" },
  { key: "optionTarifaire", label: "Option" },
  { key: "consommation", label: "Consommation", unit: "kWh/an" },
  { key: "dureeContrat", label: "Durée" },
];

const Section = ({
  step,
  title,
  icon,
  delay,
  children,
}: {
  step: number;
  title: string;
  icon: React.ReactNode;
  delay: number;
  children: React.ReactNode;
}) => (
  <section
    className="animate-rise border-t border-gray-100 p-6 first:border-t-0 sm:p-8"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="mb-6 flex items-center gap-3">
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-sm font-semibold text-green-800">
        {step}
      </span>
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      <span className="ml-auto text-green-700">{icon}</span>
    </div>
    <div className="grid gap-6 sm:grid-cols-2">{children}</div>
  </section>
);

const Field = ({
  label,
  full,
  children,
}: {
  label: string;
  full?: boolean;
  children: React.ReactNode;
}) => (
  <div className={full ? "min-w-0 sm:col-span-2" : "min-w-0"}>
    <TitleButton
      className="mb-2 text-sm font-medium text-gray-700"
      text={label}
    />
    {children}
  </div>
);

const Simulator = () => {
  const [values, setValues] = useState<SimulatorValues>({});
  const set = (key: keyof SimulatorValues) => (value: string) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  const filled = RECAP.filter(({ key }) => values[key]).length;
  const progress = Math.round((filled / RECAP.length) * 100);

  const [result, submit, pending] = useActionState(
    () => createEstimation(values),
    null,
  );

  return (
    <form
      className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 font-sans lg:grid-cols-[1fr_360px] lg:py-16"
      action={submit}
    >
      <div className="flex min-w-0 flex-col gap-8">
        <header className="animate-rise flex flex-col gap-4">
          <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Estimez le prix de{" "}
            <span className="relative whitespace-nowrap text-green-700">
              l&apos;électricité
              <span className="absolute inset-x-0 bottom-1 -z-10 h-3 bg-yellow-300/60" />
            </span>{" "}
            pour votre entreprise
          </h1>
          <p className="flex items-center gap-2 text-gray-600">
            <Clock className="h-4 w-4" />
            Deux minutes, sans engagement. Le prix se met à jour à chaque
            modification.
          </p>
        </header>

        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
          <Section
            step={1}
            title="Votre site"
            icon={<Building2 className="h-5 w-5" />}
            delay={100}
          >
            <Field label="Type d'activité">
              <DropDownButton
                list={["entreprise 1", "entreprise 2"]}
                placeholder="Choisir une activité"
                onChange={set("activite")}
              />
            </Field>
            <Field label="Code postal du site">
              <Input
                name="codePostal"
                placeholder="75001"
                inputMode="numeric"
                maxLength={5}
                icon={<MapPin className="h-4 w-4" />}
                className="rounded-lg"
                onChange={(e) => set("codePostal")(e.target.value)}
              />
            </Field>
          </Section>

          <Section
            step={2}
            title="Votre contrat"
            icon={<Gauge className="h-5 w-5" />}
            delay={200}
          >
            <Field label="Puissance souscrite">
              <DropDownButton
                list={["entreprise 1", "entreprise 2"]}
                placeholder="Choisir une puissance"
                onChange={set("puissance")}
              />
            </Field>
            <Field label="Option tarifaire" full>
              <ButtonRadio
                name="optionTarifaire"
                list={["Base", "Heures pleines / creuses"]}
                onChange={set("optionTarifaire")}
              />
            </Field>
            <Field label="Durée du contrat" full>
              <ButtonRadio
                name="dureeContrat"
                list={["2 ans", "4 ans", "6 ans"]}
                onChange={set("dureeContrat")}
              />
            </Field>
          </Section>

          <Section
            step={3}
            title="Votre consommation"
            icon={<Zap className="h-5 w-5" />}
            delay={300}
          >
            <Field label="Consommation annuelle" full>
              <Input
                name="consommation"
                type="number"
                min={0}
                placeholder="25 000"
                suffix="kWh/an"
                className="rounded-lg"
                onChange={(e) => set("consommation")(e.target.value)}
              />
            </Field>
          </Section>
        </div>
      </div>

      <aside
        className="animate-rise min-w-0 lg:sticky lg:top-6 lg:self-start"
        style={{ animationDelay: "400ms" }}
      >
        <div className="relative overflow-hidden rounded-2xl bg-green-950 p-6 text-white shadow-xl sm:p-8">
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-yellow-400/20 blur-3xl" />

          <div className="relative flex items-center gap-2 text-sm font-medium text-green-200">
            <Receipt className="h-4 w-4" />
            Votre estimation
          </div>
          <p
            className={clsx(
              "relative mt-3 text-5xl font-bold tracking-tight transition-opacity",
              pending && "opacity-50",
            )}
          >
            {result?.ok
              ? `${result.data.prixAnnuelHT.toLocaleString("fr-FR")} €`
              : "— €"}
          </p>
          <p className="relative text-sm text-green-200">
            HT / an
            {result?.ok &&
              ` · soit ${result.data.prixMensuelHT.toLocaleString("fr-FR")} € / mois`}
          </p>
          {result && !result.ok && (
            <p role="alert" className="relative mt-2 text-sm text-red-300">
              {result.message}
            </p>
          )}

          <div className="relative mt-6">
            <div className="mb-2 flex justify-between text-xs text-green-200">
              <span>Formulaire complété</span>
              <span>
                {filled}/{RECAP.length}
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-yellow-400 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <dl className="relative mt-6 space-y-3 border-t border-white/10 pt-6 text-sm">
            {RECAP.map(({ key, label, unit }) => (
              <div key={key} className="flex justify-between gap-4">
                <dt className="text-green-200">{label}</dt>
                <dd
                  className={
                    values[key] ? "text-right font-medium" : "text-white/40"
                  }
                >
                  {values[key]
                    ? `${values[key]}${unit ? ` ${unit}` : ""}`
                    : "—"}
                </dd>
              </div>
            ))}
          </dl>

          <button
            type="submit"
            disabled={filled < RECAP.length || pending}
            className="relative mt-8 flex w-full items-center justify-center gap-2 rounded-lg bg-yellow-400 px-4 py-3 font-semibold text-green-950 transition-colors hover:bg-yellow-300 disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/50"
          >
            {pending ? "Calcul en cours…" : "Recevoir mon offre"}
            {!pending && <ArrowRight className="h-4 w-4" />}
          </button>
          <p className="relative mt-3 text-center text-xs text-green-200/80">
            Estimation indicative, sans engagement.
          </p>
        </div>
      </aside>
    </form>
  );
};

export default Simulator;
