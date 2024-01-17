"use client";

import { useState } from "react";
import { TelegramClient } from "telegram";

const Authenticate = () => {
  // ==========================================================================
  // STATE / HOOKS
  // ==========================================================================
  const [{ phoneNumber, password, phoneCode }, setAuthInfo] = useState({
    phoneNumber: "",
    password: "",
    phoneCode: "",
  });

  // ==========================================================================
  // FUNCTIONS / HANDLERS
  // ==========================================================================
  /*
  async function sendCodeHandler() {
    const client = new TelegramClient(SESSION, API_ID, API_HASH, {
      connectionRetries: 5,
    }); // Immediately create a client using your application data

    await client.connect(); // Connecting to the server
    await client.sendCode(
      {
        apiId: Number(process.env.NEXT_PUBLIC_API_ID!),
        apiHash: process.env.NEXT_PUBLIC_API_HASH!,
      },
      phoneNumber
    );
  }

  function inputChangeHandler({ target: { name, value } }) {
    setAuthInfo((authInfo) => ({ ...authInfo, [name]: value }));

  }
  */

  // ==========================================================================
  // RENDER
  // ==========================================================================
  return (
    <>
      <input
        className="bg-neutral-700 h-10 px-5 pr-10 w-full max-w-[300px] rounded-md text-contrast-high
         placeholder-contrast-low focus:outline-none focus:border focus:border-primary-500"
        placeholder="Phone Number"
      />
    </>
  );
};

export default Authenticate;
