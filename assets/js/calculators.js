function fmtPKR(n) {
  return 'PKR ' + Number(n).toLocaleString('en-PK', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
}

function fmtPct(n) {
  return Number(n).toFixed(2) + '%';
}

// ---- EMI Calculator ----

function calcEMI(principal, annualRate, months) {
  if (annualRate === 0) {
    const emi = principal / months;
    return {
      emi: emi,
      totalPayment: principal,
      totalInterest: 0,
      interestPct: 0
    };
  }
  const r = annualRate / 12 / 100;
  const emi = principal * r * Math.pow(1 + r, months) / (Math.pow(1 + r, months) - 1);
  const totalPayment = emi * months;
  const totalInterest = totalPayment - principal;
  const interestPct = (totalInterest / principal) * 100;
  return { emi, totalPayment, totalInterest, interestPct };
}

function handleEMI() {
  const principal = parseFloat(document.getElementById('loanAmount').value);
  const rate = parseFloat(document.getElementById('interestRate').value);
  const years = parseFloat(document.getElementById('loanTenure').value);

  if (isNaN(principal) || isNaN(rate) || isNaN(years) || principal <= 0 || years <= 0 || rate < 0) {
    return;
  }

  const months = Math.round(years * 12);
  const result = calcEMI(principal, rate, months);

  document.getElementById('result-emi').textContent = fmtPKR(result.emi);
  document.getElementById('result-total').textContent = fmtPKR(result.totalPayment);
  document.getElementById('result-interest').textContent = fmtPKR(result.totalInterest);
  document.getElementById('result-interest-pct').textContent = fmtPct(result.interestPct);
  document.getElementById('results').classList.add('visible');
}

// ---- Compound Interest Calculator ----

function calcCompoundInterest(principal, rate, years, frequency) {
  const r = rate / 100;
  const n = frequency;
  const amount = principal * Math.pow(1 + r / n, n * years);
  const interest = amount - principal;
  const interestPct = (interest / principal) * 100;
  return { amount, interest, interestPct };
}

function handleCompoundInterest() {
  const principal = parseFloat(document.getElementById('principal').value);
  const rate = parseFloat(document.getElementById('rate').value);
  const years = parseFloat(document.getElementById('years').value);
  const frequency = parseInt(document.getElementById('frequency').value);

  if (isNaN(principal) || isNaN(rate) || isNaN(years) || principal <= 0 || years <= 0 || rate < 0) {
    return;
  }

  const result = calcCompoundInterest(principal, rate, years, frequency);

  document.getElementById('result-amount').textContent = fmtPKR(result.amount);
  document.getElementById('result-interest-earned').textContent = fmtPKR(result.interest);
  document.getElementById('result-interest-pct').textContent = fmtPct(result.interestPct);
  document.getElementById('results').classList.add('visible');
}

// ---- Salary Tax Calculator (Pakistan FY 2025-2026) ----

function calcPakistanSalaryTax(monthlySalary) {
  const annualSalary = monthlySalary * 12;
  let tax = 0;

  // Pakistan income tax slabs for salaried individuals FY 2025-2026
  // Based on the commonly used slabs (verify with FBR for exact current rates)
  if (annualSalary <= 600000) {
    tax = 0;
  } else if (annualSalary <= 1200000) {
    tax = (annualSalary - 600000) * 0.05;
  } else if (annualSalary <= 2400000) {
    tax = 30000 + (annualSalary - 1200000) * 0.15;
  } else if (annualSalary <= 3600000) {
    tax = 210000 + (annualSalary - 2400000) * 0.25;
  } else if (annualSalary <= 6000000) {
    tax = 510000 + (annualSalary - 3600000) * 0.30;
  } else if (annualSalary <= 12000000) {
    tax = 1230000 + (annualSalary - 6000000) * 0.35;
  } else {
    tax = 3330000 + (annualSalary - 12000000) * 0.35;
  }

  const monthlyTax = tax / 12;
  const annualAfterTax = annualSalary - tax;
  const monthlyAfterTax = annualAfterTax / 12;
  const effectiveRate = (tax / annualSalary) * 100;

  return {
    annualSalary,
    annualTax: tax,
    monthlyTax,
    annualAfterTax,
    monthlyAfterTax,
    effectiveRate
  };
}

function handleSalaryTax() {
  const monthlySalary = parseFloat(document.getElementById('monthlySalary').value);

  if (isNaN(monthlySalary) || monthlySalary <= 0) {
    return;
  }

  const result = calcPakistanSalaryTax(monthlySalary);

  document.getElementById('result-annual-salary').textContent = fmtPKR(result.annualSalary);
  document.getElementById('result-annual-tax').textContent = fmtPKR(result.annualTax);
  document.getElementById('result-monthly-tax').textContent = fmtPKR(result.monthlyTax);
  document.getElementById('result-annual-net').textContent = fmtPKR(result.annualAfterTax);
  document.getElementById('result-monthly-net').textContent = fmtPKR(result.monthlyAfterTax);
  document.getElementById('result-effective-rate').textContent = fmtPct(result.effectiveRate);
  document.getElementById('results').classList.add('visible');
}

// ---- Home Loan Calculator ----

function handleHomeLoan() {
  const propertyPrice = parseFloat(document.getElementById('propertyPrice').value);
  const downPaymentPct = parseFloat(document.getElementById('downPayment').value);
  const rate = parseFloat(document.getElementById('interestRate').value);
  const years = parseFloat(document.getElementById('loanTenure').value);

  if (isNaN(propertyPrice) || isNaN(downPaymentPct) || isNaN(rate) || isNaN(years)) {
    return;
  }

  const downPayment = propertyPrice * downPaymentPct / 100;
  const loanAmount = propertyPrice - downPayment;
  const months = Math.round(years * 12);
  const emiResult = calcEMI(loanAmount, rate, months);

  document.getElementById('result-loan-amount').textContent = fmtPKR(loanAmount);
  document.getElementById('result-down-payment').textContent = fmtPKR(downPayment);
  document.getElementById('result-emi').textContent = fmtPKR(emiResult.emi);
  document.getElementById('result-total-payment').textContent = fmtPKR(emiResult.totalPayment);
  document.getElementById('result-total-interest').textContent = fmtPKR(emiResult.totalInterest);
  document.getElementById('results').classList.add('visible');
}

// Quick fill handlers

function fillEMI(amount, rate, tenure) {
  document.getElementById('loanAmount').value = amount;
  document.getElementById('interestRate').value = rate;
  document.getElementById('loanTenure').value = tenure;
  handleEMI();
}

function fillCompound(principal, rate, years, freq) {
  document.getElementById('principal').value = principal;
  document.getElementById('rate').value = rate;
  document.getElementById('years').value = years;
  document.getElementById('frequency').value = freq;
  handleCompoundInterest();
}

function fillSalary(salary) {
  document.getElementById('monthlySalary').value = salary;
  handleSalaryTax();
}

function fillHomeLoan(price, down, rate, tenure) {
  document.getElementById('propertyPrice').value = price;
  document.getElementById('downPayment').value = down;
  document.getElementById('interestRate').value = rate;
  document.getElementById('loanTenure').value = tenure;
  handleHomeLoan();
}

// FAQ toggle

document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    item.classList.toggle('open');
  });
});
