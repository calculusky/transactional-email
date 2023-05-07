import { SendgridOptions } from "./sendgrid";
import { SendinblueOptions } from "./sendinblue";

export type SendgridProvider = "sendgrid";
export type SendinblueProvider = "sendinblue";
export type EmailProviders = SendgridProvider | SendinblueProvider;

export interface EmailOptions<
    Provider extends SendgridProvider | SendinblueProvider = SendgridProvider
> {
    provider: Provider;
    apiKey: string;
    from?: { name?: string; email: string };
}

export enum Uri {
    SENDGRID_BASE_URL = "https://api.sendgrid.com/v3",
    SENDINBLUE_BASE_URL = "https://api.sendinblue.com/v3",
    SENDINGBLUE_PATH = "/smtp/email",
}

export type SendEmailOptions<T> = T extends SendgridProvider
    ? SendgridOptions
    : SendinblueOptions;

export interface ErrorResponse {
    [key: string]: any;
}

export type Optional<T, Key extends keyof T> = Omit<T, Key> & Partial<T>;
