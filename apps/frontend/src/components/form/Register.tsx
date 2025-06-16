"use client";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useSignup } from "@/app/(auth)/login/actions";
import LoadingButton from "@/components/ui/LoadingButton";
import { useTranslations } from "next-intl";

interface Errors {
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export default function RegisterForm() {
  const t = useTranslations("register");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({});
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const signup = useSignup();

  useEffect(() => {
    let validationErrors: Errors = {};

    if (!email) {
      validationErrors.email = t("noEmail");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = t("invalidEmail");
    }

    if (!password) {
      validationErrors.password = t("noPassword");
    } else if (password.length < 6) {
      validationErrors.password = t("invalidPassword");
    }

    if (!confirmPassword) {
      validationErrors.confirmPassword = t("noConfirmPassword");
    } else if (confirmPassword !== password) {
      validationErrors.confirmPassword = t("invalidConfirmPassword");
    }

    setErrors(validationErrors);
    setIsFormValid(Object.keys(validationErrors).length === 0);
  }, [email, password, confirmPassword]);

  const handleSubmit = async () => {
    if (isFormValid) {
      try {
        setIsLoading(true);
        await signup({ email, password });
        toast.success(t("success"));
      } catch (error: any) {
        toast.error(error.message || t("fail"));
      } finally {
        setIsLoading(false);
      }
    } else {
      if (errors.email) toast.info(errors.email);
      if (errors.password) toast.info(errors.password);
      if (errors.confirmPassword) toast.info(errors.confirmPassword);
    }
  };

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {t("email")}
        </label>
        <div>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {t("password")}
        </label>
        <div>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {t("confirmPassword")}
        </label>
        <div>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <LoadingButton
          loading={isLoading}
          className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          {t("button")}
        </LoadingButton>
      </div>
    </form>
  );
}
