import { ErrorResponse } from "./interfaces";

export class EmailProviderException extends Error {
    name = "EmailProviderException";
}

export class SendinblueEmailException extends Error {
    name = "SendinblueEmailException";
    response: ErrorResponse;
}

export class SendgridEmailException extends Error {
    name = "SendgridEmailException";
    response: ErrorResponse;
}
