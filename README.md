## Back-end Technical Test

## Setup

Clone the repo and install the dependencies.

```bash
git clone https://github.com/farhan-helmy/redape.git
cd redape
```

```bash
npm install
```

To start the express server, run the following

```bash
node index.js
```
## To get result

Send POST request to [http://localhost:5000/calculate-tax](http://localhost:5000/calculate-tax)

Example request

```json
{
    "first_name": "farhan",
    "last_name": "helmy",
    "pay_period": "01 March - 31 March",
    "annual_salary": 180000,
    "super_rate": 12
}
```

Example result

```json
{
    "name": "farhan helmy",
    "income_tax": 54697,
    "pay_period": "01 March - 31 March",
    "gross_income": 15000,
    "net_income": -39697,
    "super_amount": 1800
}
```
