"use client";

import { login } from "@/services/auth/form";
import { useFormState, useFormStatus } from "react-dom";

export default function LoginForm() {
  /* const initialState = { message: null, errors: undefined }; */
  const [formState, formAction] = useFormState(login, undefined);

  return (
    <div className="relative mx-auto sm:w-[400px] w-[80%]">
      <div className="absolute inset-0 bg-gradient-to-r from-g_initial to-g_final shadow-lg transform skew-y-0 -rotate-6 rounded-3xl"></div>
      <div className="relative px-7 py-10 bg-secondary shadow-lg rounded-3xl p-20 ">
        <div className="max-w-md mx-auto">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-primary pb-10">Login</h1>
          </div>
          <form
            action={formAction}
            className=" text-base leading-6 space-y-4 sm:text-lg sm:leading-7"
          >
            <div className="relative">
              <label htmlFor="email" className="left-0 text-primary text-sm">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-300 focus:outline-none focus:borer-rose-600 bg-transparent text-base "
              />
              <p className="text-red-400">
                {formState?.errors && formState.errors.email}
              </p>
            </div>
            <div className="relative">
              <label htmlFor="password" className="left-0 text-primary text-sm">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className="placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-300 focus:outline-none focus:borer-rose-600 bg-transparent text-base"
              />
              <p className="text-red-400">
                {formState?.errors && formState.errors.password}
              </p>
            </div>
            <div className="pt-5 text-center">
              <Submit />
            </div>
            <p className="text-red-400">
              {formState?.message && formState.message}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

function Submit() {
  const status = useFormStatus();
  return (
    <button
      disabled={status.pending}
      className="bg-primary text-background rounded-md px-2 py-1"
    >
      {status.pending ? "Submiting ..." : "Submit"}
    </button>
  );
}
