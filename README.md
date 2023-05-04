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

Note: In order to gain the TypeScript typings (for intellisense / autocomplete) while using CommonJS, use require().default as seen below:

```js
const TransactionalEmail = require("./").default;
```

### Examples

**CommonJS Usage**

> In order to gain the TypeScript typings (for intellisense / autocomplete) while using CommonJS imports with require() use the following approach:
>
> ```js
> const TransactionalEmail = require("./").default;
>
> const sendgridMail = new TransactionalEmail({
>     apiKey: "YOUR API KEY",
>     provider: "YOUR PROVIDER", //sendinblue or sendgrid
>     from: { email: "info@example.com", name: "Info" }, // optional (default value for the sender). You can set or overwrite it in the send() method options
> });
>
> //sendgrid message options
> const message = {
>     to: "test@example.com",
>     from: "test@example.com", // Use the email address or domain you verified
>     subject: "Sending with Sendgrid Provider",
>     text: "This is just a test mail",
>     html: "<strong>This is just a test mail</strong>",
> };
>
> //ES6
> email.send(message).then(
>     () => {},
>     (error) => {
>         console.error(error);
>
>         if (error.response) {
>             console.error(error.response.data);
>         }
>     }
> );
> //ES8
> (async () => {
>     try {
>         await email.send(message);
>     } catch (error) {
>         console.error(error);
>
>         if (error.response) {
>             console.error(error.response.data);
>         }
>     }
> })();
> ```

**TypeScript Usage**

```ts
import TransactionalEmail, {
    Sendgrid,
    Sendinblue,
} from "@calculusky/transactional-email";

const email = new TransactionalEmail({
    apiKey: "YOUR API KEY",
    provider: "YOUR PROVIDER", //sendinblue or sendgrid
    from: { email: "info@example.com", name: "Info" }, // optional (default value for the sender). You can set or overwrite it in the send() method options
});

//sendgrid message options
const message: Sendgrid.SendgridOptions = {
    to: "john@example.com",
    from: "info@example.com", // Use the email address or domain you verified
    subject: "Sending with Sendgrid Provider",
    text: "This is just a test mail",
    html: "<strong>This is just a test mail</strong>",
};

//sendinblue message options
// const message: Sendinblue.SendinblueOptions = {
//     sender: { email: "info@example.com", name: "John Doe" },
//     to: [{ email: "john@example.com", name: "John Smith" }],
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

**Note:** Message options vary for different providers. Please checkout the option interface for each provider. For more details, visit their official platforms for transactional message options.
