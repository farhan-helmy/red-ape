const express = require("express");
//const axios = require("axios");
var _ = require("lodash");

const app = express();

app.use(express.json());

app.post("/calculate-tax", (req, res) => {
  console.log(req.body);
  let salary = req.body.annual_salary;
  let super_rate = req.body.super_rate;
  let payment_start = req.body.payment_start;
  let gross_income = "";
  let income_tax = "";
  let net_income = "";
  let super_amount = "";
  let full_name = req.body.first_name + " " + req.body.last_name;

  gross_income = gross_cal(salary);
  income_tax = check_tax(salary);
  super_amount = super_cal(super_rate, gross_income);
  net_income = gross_income - income_tax;
  res.send(
    {
      name: full_name,
      income_tax: income_tax,
      pay_period: req.body.pay_period,
      gross_income: gross_income,
      net_income: net_income,
      super_amount: super_amount,
    },
    200
  );
});

const super_cal = (sup, gi) => {
  if (_.inRange(sup, -1, 13)) {
    var perc = sup / 100;
    var ans = gi * perc;
    return ans;
  } else {
    return "invalid super range";
  }
};

const gross_cal = (sal) => {
  var answer = sal / 12;

  return answer;
};

const net_cal = (gross_inc, inc_tax) => {
  var answer = gross_inc - inc_tax;

  return answer;
};

const check_tax = (salary) => {
  if (_.inRange(salary, 0, 18201)) {
    return 0;
  } else if (_.inRange(salary, 18200, 37001)) {
    var res_cal = salary - 18200;
    var res_final = res_cal * 0.19;
    return res_final;
  } else if (_.inRange(salary, 37000, 87001)) {
    var res_cal = salary - 37000;
    var res_final = res_cal * 0.325;
    var final_final = res_final + 3572;
    return final_final;
  } else if (_.inRange(salary, 87000, 180001)) {
    var res_cal = salary - 87000;
    var res_final = res_cal * 0.375;
    var final_final = res_final + 19822;
    return final_final;
  } else if (salary >= 180001) {
    var res_cal = salary - 180000;
    var res_final = res_cal * 0.45;
    var final_final = res_final + 54232;
    return final_final;
  } else {
    return "invalid value";
  }
};

const sup_rate = (gi, sup_rate) => {
  var answer = gi * sup_rate;

  return answer;
};

let server = app.listen(5000, function () {
  let port = server.address().port;
  console.log("App Server running at - http://localhost:%s", port);
});
