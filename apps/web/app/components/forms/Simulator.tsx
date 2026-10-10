"use client";
import ButtonRadio from "../ui/button/ButtonRadio";
import DropDownButton from "../ui/button/DropDownButton";
import TitleButton from "../ui/button/TitleButton";

const Simulator = () => {
  return (
    <form className="flex flex-col bg-zinc-50 font-sans p-4 m-4">
      <h1 className="text-black text-4xl">
        Estimer le prix de l electricité pour votre entreprise
      </h1>
      <p className="text-black text-md">
        deux minutes sans engagement le prix se mets à jour à toute modification
      </p>
      <div className="flex items-center justify-between p-2 ">
        <div className="flex flex-col flex-1">
          <TitleButton className="text-black" text="Type d'activité" />
          <DropDownButton list={["entreprise 1", "entreprise 2"]} />
        </div>
        <div>
          <TitleButton className="text-black" text="Code postale du site" />
          <DropDownButton list={["entreprise 1", "entreprise 2"]} />
        </div>
      </div>
      <div className="flex flex-col justify-between p-2 ">
        <TitleButton className="text-black" text="Puissance souscrite" />
        <DropDownButton list={["entreprise 1", "entreprise 2"]} />
      </div>
      <div>
        <TitleButton className="text-black" text="Option tarifière" />
        <ButtonRadio
          list={["Base ", "Heure Pleines/creuse"]}
          name="options tarifière"
        />
      </div>
      <div>
        <TitleButton className="text-black" text="Duréé du contrat" />
        <ButtonRadio
          list={["2 ans ", "4 ans", "6 ans"]}
          name="durée du contrat"
        />
      </div>
    </form>
  );
};

export default Simulator;
