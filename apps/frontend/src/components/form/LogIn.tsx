"use client";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useLogin } from "@/app/(auth)/login/actions";
import LoadingButton from "@/components/ui/LoadingButton";
import { useTranslations } from "next-intl";

interface Errors {
  email?: string;
  password?: string;
}

export default function LogInForm() {
  const t = useTranslations("login");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({});
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const login = useLogin();

  useEffect(() => {
    const errors: Errors = {};

    if (!email) {
      errors.email = t("noEmail");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = t("invalidEmail");
    }

    if (!password) {
      errors.password = t("noPassword");
    } else if (password.length < 6) {
      errors.password = t("invalidPassword");
    }

    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  }, [email, password]);

  const handleSubmit = async () => {
    if (isFormValid) {
      try {
        setIsLoading(true);
        await login({ email, password });
        toast.success(t("success"));
      } catch (error: any) {
        toast.error(error.message || t("fail"));
      } finally {
        setIsLoading(false);
      }
    } else {
      if (errors.email) toast.info(errors.email);
      if (errors.password) toast.info(errors.password);
    }
  };

  return (
    <form
      className="space-y-6"
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
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            {t("password")}
          </label>
          {/* <div className="text-sm">
            <Link href="/reset-password" className="font-semibold text-primary hover:text-primary">
              Ξέχασες τον κωδικό σου?
            </Link>
          </div> */}
        </div>
        <div>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
