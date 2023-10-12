import { DateTime } from "luxon";
import { default as defaultLocale } from "./locales/en";

type Locale = Record<string, string>;
export let LOCALE: Locale = defaultLocale;

export async function loadLocale(locale?: string | Locale) {
  if (!locale) {
    locale = DateTime.local().locale ?? undefined;
  }

  if (typeof locale === "string") {
    const localeId = makeLocaleId(locale);
    try {
      const loaded: { default: Locale } = await import(
        /* webpackChunkName: "lang-[request]" */ `./locales/${localeId}`
      );
      LOCALE = loaded.default;
    } catch (error) {
      console.error(`Unable to find locale ${localeId}`, error);
    }
  } else if (locale) {
    LOCALE = locale;
  } else {
    throw new Error("Unable to load locale");
  }
}

function makeLocaleId(locale: string) {
  return locale.substring(0, 2);
}
