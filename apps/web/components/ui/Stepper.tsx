import React from "react";

type StepperProps = {
  steps: { step: number; text: string }[];
  currentStep: number;
};
const Stepper = ({ steps, currentStep }: StepperProps) => {
  return (
    <div className="hidden lg:flex lg:items-center lg:p-2">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              index < currentStep
                ? "bg-green-500 text-white"
                : index === currentStep
                  ? "bg-green-900 text-white"
                  : "bg-gray-300 text-gray-500"
            }`}
          >
            {index + 1}
          </div>

          <>
            <p className="text-black text-lg ">{step.text}</p>
            {index < steps.length - 1 && (
              <div className="flex-1 h-1 bg-gray-300 mx-2"></div>
            )}
          </>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Stepper;
