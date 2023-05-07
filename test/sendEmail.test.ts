import TransactionalEmail, { SendgridOptions, SendinblueOptions } from "../src";
import { ClientResponse } from "@sendgrid/mail";

describe("Send Transactional Email", () => {
    const sender = { email: "info@infowebsite.com" };

    const sendgridInstance = new TransactionalEmail({
        apiKey: "sg.apikeyvalue",
        provider: "sendgrid",
        from: sender,
    });

    const sendinblueInstance = new TransactionalEmail({
        apiKey: "xkeysib-ac929f99626452aaevhgfjjtyftftfuac46a3a59b379aae-Tbhvgfyljhug",
        provider: "sendinblue",
        from: sender,
    });

    describe("Send email with sendinblue", () => {
        afterEach(jest.clearAllMocks);
        const emailOptions: SendinblueOptions = {
            to: [{ email: "johndoe@example.com" }],
            subject: "Hello Nedum",
            textContent: "How are you?",
        };

        it("should pass if all parameters are correct", async () => {
            const dataRes = {
                data: {
                    messageId:
                        "<202305062099.65576553952@smtp-relay.mailin.fr>hggjgvgfffgfggcgfcg",
                },
            };

            const sendMailMock = jest
                .spyOn<any, any>(sendinblueInstance, "axios")
                .mockReturnValue(Promise.resolve(dataRes) as any);
            await sendinblueInstance.send(emailOptions);
            expect(sendMailMock).toHaveBeenCalledTimes(1);
        });

        it("send mail should fail if api key is invalid", async () => {
            const emailInstance = new TransactionalEmail({
                provider: "sendinblue",
                apiKey: "",
            });
            const sendMailMock = jest
                .spyOn<any, any>(emailInstance, "axios")
                .mockRejectedValueOnce("invalid api key");
            await emailInstance.send(emailOptions).catch((err) => err);
            expect(sendMailMock).toHaveBeenCalledTimes(1);
        });
    });

    describe("Send email with sendgrid", () => {
        afterEach(jest.clearAllMocks);

        const emailOptions: SendgridOptions = {
            to: [{ email: "johndoe@example.com" }],
            subject: "Hello Nedum",
            text: "How are you?",
        };

        const respData: ClientResponse = {
            body: {},
            headers: {},
            statusCode: 200,
        };

        it("should pass if all parameters are correct", async () => {
            const sendMailMock = jest
                .spyOn(sendgridInstance, "send")
                .mockReturnValue(Promise.resolve([respData, {}]));
            await sendgridInstance.send(emailOptions);
            expect(sendMailMock).toHaveBeenCalledTimes(1);
            expect(sendMailMock).toHaveBeenCalledWith(emailOptions);
        });
    });
});
