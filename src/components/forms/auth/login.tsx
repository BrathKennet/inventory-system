"use client";

import { login } from "@/services/auth/client";
import { useFormState, useFormStatus } from "react-dom";
import InputGeneral from "../../input/input-general";
import SubmitButton from "../../buttons/submit";
import { TypeButton } from "@/models/enum_models";

export default function LoginForm() {
  
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
            <InputGeneral
              label="Email"
              id="email"
              name="email"
              type="email"
              placeholder="user@mail.com"
              error={formState?.errors && formState.errors.email}
            />
            <InputGeneral
              label="Password"
              id="password"
              name="password"
              type="password"
              placeholder="***"
              error={formState?.errors && formState.errors.password}
            />
            <div className="pt-5 text-center w-fit mx-auto">
              <SubmitButton
                type={TypeButton.PRIMARY}
                text="Submit"
                textPending="Submiting ..."
              />
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
