import React, { Fragment, useEffect, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { HiCheck, HiChevronUpDown } from "react-icons/hi2";
import axios from "axios";

export default function Verify({ placeholder }) {
  const [query, setQuery] = useState("");

  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  const [selected, setSelected] = useState(placeholder[0]);

  const [input, setInput] = useState("");

  const errMessage = "Acct Name and Bank Not Match";

  const handleChange = (target) => {
    setInput({
      ...input,
      [target.name]: target.value,
    });
  };

  const filteredBanks =
    query === ""
      ? data
      : data.filter((bank) =>
          bank.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  useEffect(() => {
    axios
      .get("https://api.paystack.co/bank", {
        method: "GET",
        mode: "no-cors",
        cache: "default",
      })
      .then((response) => {
        if (response.data?.status) {
          setData(response.data?.data);
        }
      })
      .catch((error) => {
        console.error("Error retreiving data:", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const [acctDetails, setAcctDetails] = useState("");

  const HandleBankDetails = async () => {
    axios
      .get(
        `https://api.paystack.co/bank/resolve?account_number=${input.account_number}&bank_code=${input.bank_code}`,
        {
          method: "GET",
          mode: "no-cors",
          cache: "default",
          headers: {
            Authorization:
              "Bearer sk_test_10a36dd7df429917e44cee5bfa77da90978c7e24",
          },
        }
      )
      .then((response) => {
        if (response.data?.status) {
          setAcctDetails(response.data?.data?.account_name);
        }
      })
      .catch((error) => {
        console.error("Error retreiving data:", error);
        setAcctDetails(errMessage);
      });
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>An error occurred. Try again</p>;
  }

  return (
    <div className="mt-10 sm:mt-0">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              Verify Bank Details
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              Verification of bank account
            </p>
          </div>
        </div>
        <div className="mt-5 md:col-span-2 md:mt-0">
          <div className="shadow sm:rounded-md">
            <div className="bg-white px-4 py-5 sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-8 sm:col-span-4">
                  <label
                    htmlFor="account_number"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Account Number
                  </label>
                  <input
                    type="number"
                    name="account_number"
                    id="account_number"
                    onChange={({ target }) => handleChange(target)}
                    autoComplete="account_number"
                    className="mt-2 p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-100 sm:text-sm sm:leading-6"
                  />
                </div>
                <div className="col-span-8 sm:col-span-4 ">
                  <label
                    htmlFor="account_number"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Choose Bank
                  </label>
                  <Combobox value={selected} onChange={setSelected}>
                    <div className="relative mt-1">
                      <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                        <Combobox.Input
                          className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                          displayValue={(data) => data.name}
                          onChange={(event) => setQuery(event.target.value)}
                        />
                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                          <HiChevronUpDown
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </Combobox.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQuery("")}
                      >
                        <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          {filteredBanks.length === 0 && query !== "" ? (
                            <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                              Nothing found.
                            </div>
                          ) : (
                            filteredBanks.map((bank) => (
                              <Combobox.Option
                                key={bank.id}
                                className={({ active }) =>
                                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                    active
                                      ? "bg-teal-600 text-white"
                                      : "text-gray-900"
                                  }`
                                }
                                value={bank}
                              >
                                {({ selected, active }) => (
                                  <>
                                    <span
                                      onClick={() =>
                                        setInput({
                                          ...input,
                                          bank_code: bank.code,
                                        })
                                      }
                                      className={`block truncate ${
                                        selected ? "font-medium" : "font-normal"
                                      }`}
                                    >
                                      {bank.name}
                                    </span>
                                    {selected ? (
                                      <span
                                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                          active
                                            ? "text-white"
                                            : "text-teal-600"
                                        }`}
                                      >
                                        <HiCheck
                                          className="h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Combobox.Option>
                            ))
                          )}
                        </Combobox.Options>
                      </Transition>
                    </div>
                  </Combobox>
                </div>
                <div className="col-span-10 sm:col-span-4 ">
                  <label
                    htmlFor="account_number"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Account Name
                  </label>
                  <input
                    type="text"
                    disabled
                    name="account_name"
                    id="account_name"
                    value={acctDetails}
                    className={`${
                      acctDetails == errMessage
                        ? "bg-red-400"
                        : acctDetails == ""
                        ? "bg-gray-400"
                        : "bg-green-400"
                    } mt-2 p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-100 sm:text-sm sm:leading-6`}
                  />
                </div>
              </div>
            </div>

            <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
              <button
                onClick={() => {
                  console.log("YES"), HandleBankDetails();
                }}
                className="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Verify
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
