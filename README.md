## Transactional Email

Send transactional emails using any of the popular email providers: sendgrid, sendinblue with a single wrapper

## Installation

```shell
pnpm install @calculusky/transactional-email
#or
npm install @calculusky/transactional-email
#or
yarn add @calculusky/transactional-email
```

## Usage

First, obtain your API key from the dashboard for any of the service provider you would want to use.

#### Examples

**CommonJS Usage**

Note: In order to gain the TypeScript typings (for intellisense / autocomplete) while using CommonJS, use require().default as seen below:

```js
const TransactionalEmail = require("@calculusky/transactional-email").default;

const email = new TransactionalEmail({
    apiKey: "YOUR API KEY",
    provider: "YOUR PROVIDER", //sendinblue or sendgrid
    from: { email: "info@example.com", name: "John Doe" }, // optional (default value for the sender). You can set or overwrite it in the send() method options
});

//sendgrid message options
const message = {
    to: "receiver@example2.com",
    from: "info@example.com", // Use the email address or domain you verified
    subject: "Sending with Sendgrid Provider",
    text: "This is just a test mail",
    html: "<strong>This is just a test mail</strong>",
};

//ES6
email.send(message).then(
    () => {},
    (error) => {
        console.error(error);

        if (error.response) {
            console.error(error.response.data);
        }
    }
);
//ES8
(async () => {
    try {
        await email.send(message);
    } catch (error) {
        console.error(error);

        if (error.response) {
            console.error(error.response.data);
        }
    }
})();
```

**TypeScript Usage**

```ts
import TransactionalEmail, {
    SendinblueOptions
    SendgridOptions,
} from "@calculusky/transactional-email";

const email = new TransactionalEmail({
    apiKey: "YOUR API KEY",
    provider: "YOUR PROVIDER", //sendinblue or sendgrid
    from: { email: "info@example.com", name: "John Doe" }, // optional (default value for the sender). You can set or overwrite it in the send() method options
});

//sendgrid message options
const message: SendgridOptions = {
    to: "receiver@example2.com",
    from: "info@example.com", // Use the email address or domain you verified
    subject: "Sending with Sendgrid Provider",
    text: "This is just a test mail",
    html: "<strong>This is just a test mail</strong>",
};

//sendinblue message options
// const message: SendinblueOptions = {
//     sender: { email: "info@example.com", name: "John Doe" },
//     to: [{ email: "receiver@example2.com", name: "John Smith" }],
//     subject: "Sending with Sendinblue Provider",
//     textContent: "This is just a test mail",
//     htmlContent: "<strong>This is just a test mail</strong>",
// };

//ES6
email.send(message).then(
    () => {},
    (error) => {
        console.error(error);

        if (error.response) {
            console.error(error.response.data);
        }
    }
);
//ES8
(async () => {
    try {
        await email.send(message);
    } catch (error) {
        console.error(error);

        if (error.response) {
            console.error(error.response.data);
        }
    }
})();
```

**Note:** Message options vary for different providers. Please checkout the option interface for each provider. For more details, you can visit their official platforms for transactional message options. Below are the links:

-   [Sendgrid](https://docs.sendgrid.com/api-reference/mail-send/mail-send#body)
-   [Sendinblue](https://developers.brevo.com/reference/sendtransacemail)
