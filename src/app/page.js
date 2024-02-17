"use client";
import { useState } from "react";

export default function Home() {
  const [password, setPassword] = useState("");
  const [rules, setRules] = useState([]);

  function handleInput() {
    var passwordInput = document.getElementById("password");
    var password = passwordInput.value;
    var hasNumber = /\d/;
    var hasUppercase = /[A-Z]/;
    var hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
    var hasSponsorName = /(pepsi|coke|nike)/i;
    var hasRomanChar = /[IVXLCDM]/;
    var hasMonth =
    /(january|february|march|april|may|june|july|august|september|october|november|december)/i;
    
    var captchaString = "Vi4#@";
    var newRules = [];

    // Rule 1: Password must contain at least 5 characters
    if (password.length < 5) {
      displayRuleNotMet("Password must contain at least 5 characters.");
    }
    // Rule 2: Password must contain a number
    else if (!hasNumber.test(password)) {
      displayRuleNotMet("Password must include a number.");
      displayRuleMet("Password contain at least 5 characters.");
    }
    // Rule 3: Password must contain an uppercase letter
    else if (!hasUppercase.test(password)) {
      displayRuleNotMet("Password must contain an uppercase letter.");
      displayRuleMet("Password includes a number.");
    }
    // Rule 4: Password must contain a special character
    else if (!hasSpecialChar.test(password)) {
      displayRuleNotMet("Password must contain a special character.");
      displayRuleMet("Password contains an uppercase letter.");
    }
    // Rule 5: Password must contain letters that add up to 25
    else if (
      password
        .replace(/[^0-9]/g, "")
        .split("")
        .reduce((acc, curr) => acc + parseInt(curr), 0) !== 25
    ) {
      displayRuleNotMet("Password must contain numbers that add up to 25.");
      displayRuleMet("Password contains a special character.");
    }

    // Rule 6: Password must contain a month of the year
    else if (!hasMonth.test(password)) {
      displayRuleNotMet("Password must contain a month of the year.");
      displayRuleMet("Password contains letters that add up to 25.");
    }
    // Rule 7: Password must contain a Roman character
    else if (!hasRomanChar.test(password)) {
      displayRuleNotMet("Password must contain a Roman character.");
      displayRuleMet("Password contains a month of the year.");
    }
    // Rule 8: Password must contain the name of our sponsor pepsi, coke, or nike
    else if (!hasSponsorName.test(password)) {
      displayRuleNotMet(
        "Password must contain the name of our sponsor pepsi, coke, or nike."
      );
      displayRuleMet("Password contains a Roman character.");
    }
    // Rule 9: Password must contain Roman numbers that should multiply to 35
    else if (password !== captchaString) {
      displayRuleNotMet("Password must match the CAPTCHA string. Vi4#@");
      // Optionally, you can display that CAPTCHA is met if applicable
      // displayRuleMet("Password matches the CAPTCHA string.");
  }

    else{
      displayRuleNotMet("AllrulesMet")
      var ruleNotMet = document.querySelector(".rule-not-met");
    ruleNotMet.style.display = "block"; // Show the rule not met message
    ruleNotMet.innerHTML = '<h3 class="rnmh">✔ Rules:</h3> ' + message;
    }
  }

  function displayRuleNotMet(message) {
    var ruleNotMet = document.querySelector(".rule-not-met");
    ruleNotMet.style.display = "block"; // Show the rule not met message
    ruleNotMet.innerHTML = '<h3 class="rnmh">✖ Rule not met:</h3> ' + message;
  }

  function displayRuleMet(message) {
    // Check if the message already exists in rules
    if (!rules.some((rule) => rule.message === message)) {
      setRules([...rules, { message: message }]);
    }
  }  // Define hasCaptcha regex pattern

  return (
    <>
      <div className="header">NEAL.FUN</div>
      <div className="content">
        <div className="title">* The Password Game</div>
        <p className="label-input">Please choose a password</p>
        <div className="input-section">
          <input
            type="text"
            className="pass-input"
            id="password"
            onChange={handleInput}
          />
        </div>
        <div className="rules transition-all duration-300 ease-in-out transform hover:-translate-y-2">
          <div className="rule rule-not-met">
            <h3 className="rnmh">✖ Rule 2:</h3>
            <span id="content1" />
          </div>
          {rules.map((rule, index) => (
            <div key={index} className="rule rule-met transition-all duration-300 ease-in-out transform hover:-translate-y-2">
              <h3 className="rmh">✔ Rule met:</h3>
              {rule.message}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
