import React, { useState } from "react";
import Kyc from "./components/Kyc";
import Misc from "./components/Misc";
import Verify from "./components/Verify";

const navigation = [
  { name: "Miscellaneous", no: 0 },
  { name: "Verification", no: 1 },
  { name: "Customers", no: 2 },
];

const placeholder = [
  {
    name: "Select a bank",
  },
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [tabSwitch, setTabSwitch] = useState(0);

  return (
    <div className="container h-screen">
      <div className="flex items-center justify-between p-6 lg:px-8">
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <button
              onClick={() => setTabSwitch(item.no)}
              key={item.name}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>

      {tabSwitch == 0 && <Misc placeholder={placeholder} />}

      {tabSwitch == 1 && <Verify placeholder={placeholder} />}

      {tabSwitch == 2 && <Kyc />}
    </div>
  );
}
