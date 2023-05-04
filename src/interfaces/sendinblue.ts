//Sendinblue interface
interface SendSmtpEmailSender {
    name?: string;
    email?: string;
    id?: number;
}

interface SendSmtpEmailBcc {
    email: string;
    name?: string;
}

interface EmailData {
    email: string;
    name?: string;
}

interface SendSmtpEmailAttachment {
    url?: string;
    content?: string;
    name?: string;
}

export interface SendinblueOptions {
    sender?: SendSmtpEmailSender;
    to?: EmailData[];
    bcc?: Array<SendSmtpEmailBcc>;
    cc?: EmailData[];
    htmlContent?: string;
    textContent?: string;
    subject?: string;
    replyTo?: EmailData;
    attachment?: SendSmtpEmailAttachment[];
    headers?: object;
    templateId?: number;
    params?: object;
}
