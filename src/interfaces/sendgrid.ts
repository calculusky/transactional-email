import { MailDataRequired } from "@sendgrid/mail";
import { Optional } from ".";

export type SendgridOptions = Optional<MailDataRequired, "from">;
