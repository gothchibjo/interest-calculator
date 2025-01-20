document.getElementById("depositForm").addEventListener("submit", (event) => {
    event.preventDefault();
  
    const initialAmount = parseFloat(document.getElementById("initialAmount").value);
    const startDate = new Date(document.getElementById("startDate").value);
    const term = parseInt(document.getElementById("term").value, 10);
    const annualRate = parseFloat(document.getElementById("annualRate").value);
    const capitalization = document.getElementById("capitalization").checked;
  
    const depositConditions = {
      term,
      isTermInMonths: true,
      annualRate,
      capitalization,
    };
  
    const { results, realYield, annualYield, earned } = calculateDepositWithDays(initialAmount, startDate, depositConditions);
  
    const resultsTable = document.getElementById("resultsTable");
    resultsTable.innerHTML = "";
  
    results.forEach(({ month, accruedInterest, totalAmount }) => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${month}</td><td>${accruedInterest.toFixed(2)}</td><td>${totalAmount.toFixed(2)}</td>`;
      resultsTable.appendChild(row);
    });
  
    document.getElementById("summary").textContent =
      `Real yield: ${realYield.toFixed(2)}% (${annualYield.toFixed(2)}% annual), Earned: ${earned.toFixed(2)}`;
    document.getElementById("resultsContainer").style.display = "block";
  
    saveToLocalStorage();
  });
  
  window.addEventListener("DOMContentLoaded", loadFromLocalStorage);
  