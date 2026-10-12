import Simulator from "../components/forms/Simulator";
import Stepper from "../components/ui/Stepper";

export default function Home() {
  return (
    <div className="flex flex-col flex-1  font-sans">
      <Stepper
        currentStep={1}
        steps={[
          { step: 1, text: "simulation" },
          { step: 2, text: "Votre Entreprise" },
          { step: 3, text: "Récap" },
          { step: 4, text: "Signature" },
        ]}
      />
      <Simulator />
    </div>
  );
}
