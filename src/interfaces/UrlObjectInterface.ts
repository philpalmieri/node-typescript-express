export interface UrlObject {
    protocol: string;
    slashes: boolean;
    auth: string;
    host: string;
    hostname: string;
    port: number;
    pathname: string;
    query: Object;
    origin: string;
    href: string;
}