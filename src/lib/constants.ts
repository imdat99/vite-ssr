import { Theme } from "./Types";

export const defaultTheme: Theme = "light" as const;
export const storageThemeKey = "dat09-movie-theme";
export const storageTimeKey = "dat09-movie-time";

export const APP_DOMAIN_CDN_IMAGE = "https://img.ophim14.cc";
export const searchRegex = /[\?&]keyword=([^&]+)/;