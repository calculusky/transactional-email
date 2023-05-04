import {
    EmailOptions,
    EmailProviders,
    SendEmailOptions,
    SendgridProvider,
    SendinblueProvider,
    Uri,
} from "./interfaces";
import * as sendgridMail from "@sendgrid/mail";
import Axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import {
    EmailProviderException,
    SendgridEmailException,
    SendinblueEmailException,
} from "./errors";
import { SendgridOptions } from "./interfaces/sendgrid";
import { SendinblueOptions } from "./interfaces/sendinblue";
export * from "./interfaces/sendinblue";
export * from "./interfaces/sendgrid";
export * from "./errors";

export default class TransactionalEmail<Provider extends EmailProviders> {
    private axios: AxiosInstance = Axios.create({
        baseURL: Uri.SENDGRID_BASE_URL,
        headers: {
            Authorization: `Bearer ${this.emailOptions.apiKey}`,
            "Content-Type": "application/json",
        },
    });
    constructor(protected emailOptions: EmailOptions<Provider>) {}

    async send<T extends Provider>(options: SendEmailOptions<T>) {
        switch (this.emailOptions.provider) {
            case "sendgrid": {
                return await this.handleSendgrid(options as SendgridOptions);
            }

            case "sendinblue": {
                return await this.handleSendinblue(
                    options as SendinblueOptions
                );
            }

            default: {
                throw new EmailProviderException("No email provider selected");
            }
        }
    }

    //handle sendgrid
    private async handleSendgrid<T extends SendgridProvider>(
        options: SendEmailOptions<T>
    ) {
        try {
            sendgridMail.setApiKey(this.emailOptions.apiKey);
            sendgridMail.setSubstitutionWrappers("{{", "}}");

            const message: SendgridOptions = {
                from: options.from ?? this.emailOptions.from,
                to: options.to,
                subject: options.subject,
                text: options.text,
                html: options.html,
                templateId: options.templateId,
                dynamicTemplateData: options.dynamicTemplateData,
                asm: options.asm,
                attachments: options.attachments,
                batchId: options.batchId,
                bcc: options.bcc,
                categories: options.categories,
                category: options.category,
                cc: options.cc,
                content: options.content,
                replyTo: options.replyTo,
                customArgs: options.customArgs,
                substitutions: options.substitutions,
                substitutionWrappers: options.substitutionWrappers,
            };
            return await sendgridMail.send(message);
        } catch (error) {
            const err = new SendgridEmailException("Failed to send Email");
            err.response = error.response;
            if (err.response) {
                err.response.data = error.response.body;
            }
            throw err;
        }
    }

    //handle sendinblue
    private async handleSendinblue<T extends SendinblueProvider>(
        options: SendEmailOptions<T>
    ) {
        const message: SendinblueOptions = {
            attachment: options.attachment,
            bcc: options.bcc,
            cc: options.cc,
            htmlContent: options.htmlContent,
            params: options.params,
            replyTo: options.replyTo,
            sender: options.sender ?? this.emailOptions.from,
            subject: options.subject,
            templateId: options.templateId,
            textContent: options.textContent,
            to: options.to,
        };

        const requestOptions: AxiosRequestConfig<any> = {
            baseURL: Uri.SENDINBLUE_BASE_URL,
            headers: {
                "Content-Type": "application/json",
                "api-key": this.emailOptions.apiKey,
            },
            url: Uri.SENDINGBLUE_PATH,
            method: "POST",
            data: message,
        };
        try {
            const { data } = await this.axios(requestOptions);
            return data;
        } catch (error) {
            if (!Axios.isAxiosError(error)) {
                throw error;
            }

            const err = new SendinblueEmailException("Failed to send email");
            err.response = error.response;
            throw err;
        }
    }
}
