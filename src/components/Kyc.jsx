import React, { useState } from "react";
import axios from "axios";

export default function Kyc() {
  const [acctDetails, setAcctDetails] = useState("");

  const errMessage = "Acct Name and Bank Not Match";

  const [data, setData] = useState(null);

  const handleChange = (target) => {
    setData({
      ...data,
      [target.name]: target.value,
    });
  };

  console.log(data, acctDetails);

  const HandleKYCForm = async () => {
    axios
      .post(`https://api.paystack.co/customer`, data, {
        method: "POST",
        mode: "no-cors",
        cache: "default",
        headers: {
          Authorization:
            "Bearer sk_test_10a36dd7df429917e44cee5bfa77da90978c7e24",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data?.status) {
          setAcctDetails(response.data?.message);
        }
      })
      .catch((error) => {
        console.error("Error retreiving data:", error);
        setAcctDetails(errMessage);
      });
  };

  return (
    <div className="mt-10 sm:mt-0">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              Kyc
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              Integrate Customers to payment services
            </p>
          </div>
        </div>
        <div className="mt-5 md:col-span-2 md:mt-0">
          <div className="overflow-hidden shadow sm:rounded-md">
            <div className="bg-white px-4 py-5 sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    First name
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    id="first_name"
                    onChange={({ target }) => handleChange(target)}
                    autoComplete="given-name"
                    className="mt-2 p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Last name
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    id="last_name"
                    onChange={({ target }) => handleChange(target)}
                    autoComplete="family-name"
                    className="mt-2 p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>

                <div className="col-span-6 sm:col-span-4">
                  <label
                    htmlFor="email-address"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    onChange={({ target }) => handleChange(target)}
                    autoComplete="email"
                    className="mt-2 p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div className="col-span-10 sm:col-span-4 ">
                  <input
                    type="text"
                    disabled
                    value={acctDetails}
                    className="mt-2 p-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-100 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
              <button
                onClick={() => HandleKYCForm()}
                className="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
