import { UserIcon } from "lucide-react";
import Button from "../ui/button/Button";
import Logo from "../ui/Logo";

const Header = () => {
  return (
    <div className="flex items-center justify-end  gap-4 p-4 lg:p-6  text-black ">
      <Logo variant="full" size={32} className="text-black" />
      <div className="flex  items-center justify-between gap-4 ml-auto">
        <Button
          text="Nos Offres"
          backgroundColor="border border-green-900 "
          textColor="text-green-950 font-medium"
          className="hidden lg:inline-flex cursor"
        />
        <Button
          text="Simulateur"
          backgroundColor="border border-green-900 "
          textColor="text-green-950 font-medium"
          forgroundColor="hover:bg-green-950 hover:text-white"
        />
        <Button
          text="Aide"
          backgroundColor="border border-green-900 "
          textColor="text-green-950 font-medium"
          forgroundColor="hover:bg-green-950 hover:text-white"
        />
        <Button
          text="Espace client"
          textColor="text-green-950 font-medium"
          backgroundColor="from-yellow-400 to-amber-300"
          forgroundColor="hover"
          icon={<UserIcon className="h-4 w-4 text-green-950" />}
        />
      </div>
    </div>
  );
};

export default Header;
