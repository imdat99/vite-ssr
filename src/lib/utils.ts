import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { APP_DOMAIN_CDN_IMAGE } from "./constants"

export const isClient = typeof window !== "undefined"
export const isEp = (value: string = '') => !isNaN(Number(value)) || value.toLowerCase() === 'full'
export const epNumber = (value: string = '') => value.toLocaleLowerCase() === 'full' ? 0 : Number(value)
export const getEp = (value: string = '') => String(value.match(/\b(\d+)\b/g)?.at(-1) || 0)

/**
 * Combines multiple class names into a single string.
 * @param inputs - The class names to combine.
 * @returns The combined class names as a string.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const class2Object = <T>(classConvert: T) => {
    const keys = Object.getOwnPropertyNames(
        Object.getPrototypeOf(classConvert)
    ) as Array<keyof T>
    const object = keys.reduce((classAsObj: Record<string, any>, key) => {
        classAsObj[key as string] = (classConvert[key] as any).bind(
            classConvert
        )
        return classAsObj
    }, {})
    return object as T
}
export const repairUrl = (url: string) => url.replace(/\/\//g, '/').replace('http:/', 'http://').replace('https:/', 'https://')
export const buildImageUrl = (path: string) => {
    const isInclude = path.includes('uploads/movies')
    const tempUrl = isInclude ? [APP_DOMAIN_CDN_IMAGE, path].join('/') : [APP_DOMAIN_CDN_IMAGE, 'uploads/movies', path].join('/')
    return repairUrl(tempUrl)
}
// Function to set a cookie
export function setCookie(name: string, value: string, days: number = 365) {
    if(isClient) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }   
}

// Function to get a cookie value by name
export function getCookie(name: string): string {
    if(!isClient) return "" // if not client return empty string
    const cookieName = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(";");
    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i];
        while (cookie.charAt(0) === " ") {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(cookieName) === 0) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }
    return "";
}

// Example usage
// setCookie("username", "John", 30); // Set a cookie named "username" with value "John" expiring in 30 days
// const username = getCookie("username"); // Get the value of the "username" cookie
// console.log(username); // Output: John
