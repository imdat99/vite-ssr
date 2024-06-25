import { Theme } from "./Types";

export const defaultTheme: Theme = "light" as const;
export const storageThemeKey = "Xemdi-movie-theme";
export const storageTimeKey = "Xemdi-movie-time";
export const imageCdn = "https://apii.online/image/ophim";
export const APP_DOMAIN_CDN_IMAGE = "https://img.ophim.live";
export const searchRegex = /[\?&]keyword=([^&]+)/;
export enum ImageTypes {
    poster = "poster",
    thumb = "thumb",
}