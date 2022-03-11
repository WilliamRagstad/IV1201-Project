# IV1201 Project
 A CSR Recruitment Application and REST API built on Deno


## Development

### Setup

First you need to have Deno installed. Run the command below to install the latest version of the `aleph` CLI.
```shell
deno install -A -f -n aleph https://deno.land/x/aleph/cli.ts
```
You also need the Heroku CLI for the database.<br />
Download installer [here](https://devcenter.heroku.com/articles/heroku-cli) or get it via NPM:
```shell
npm install -g heroku
```

### Start the Environment

```shell
# Start server
deno run --allow-net recruitment-api\index.ts

# Start webapp
aleph dev recruitment-app

# Start both together
./run.bat
```

### View the work
The website can be viewed at: https://iv1201-recruitment.herokuapp.com/

### Further Development

Read more about the development process in the [`DEVELOPMENT.md`](DEVELOPMENT.md) file.

### Testing

It's important to test code, read more about how to write unit tests in the [`TEST.md`](TEST.md) file.

# Course Comments
## Data Migration Policy
In case a user lacks a password or a username, the server will send a mail to your specified email-address and allow you to set a password for your account. For any further lacking details, it will be changed in the profile section.
*Note that these functions are not implemented, and only written down for grading purposes.*

## Transactions
All transaction starts and ends in the Service Layer and will rollback in case of any errors. Every call to the database will be handled in a transaction, even if no data gets changed.