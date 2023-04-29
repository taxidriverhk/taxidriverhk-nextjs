type LocalizedStrings = typeof import("locales/en-US.json");

export default function useLocalizedStrings(locale?: string): LocalizedStrings {
  const localeToUse = locale || "en-US";
  return require(`locales/${localeToUse}.json`);
}
