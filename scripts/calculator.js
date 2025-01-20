// Perform deposit calculations
function calculateDepositWithDays(initialAmount, startDate, conditions) {
    const { term, isTermInMonths, annualRate, capitalization } = conditions;
    const totalMonths = isTermInMonths ? term : Math.ceil(term / 30);
    let currentAmount = initialAmount;
    let totalAccruedInterest = 0;
    const results = [];
    let currentDate = new Date(startDate);
  
    for (let month = 1; month <= totalMonths; month++) {
      const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
      const daysInYear = currentDate.getFullYear() % 4 === 0 ? 366 : 365;
      const accruedInterest = currentAmount * (annualRate / 100) * (daysInMonth / daysInYear);
  
      if (capitalization) {
        currentAmount += accruedInterest;
      } else {
        totalAccruedInterest += accruedInterest;
      }
  
      results.push({
        month,
        accruedInterest: parseFloat(accruedInterest.toFixed(2)),
        totalAmount: parseFloat(currentAmount.toFixed(2)),
      });
  
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
  
    if (!capitalization) currentAmount = initialAmount + totalAccruedInterest;
  
    const realYield = ((currentAmount - initialAmount) / initialAmount) * 100;
    const totalPeriodInYears = totalMonths / 12;
    const annualYield = (Math.pow(currentAmount / initialAmount, 1 / totalPeriodInYears) - 1) * 100;
    const earned = currentAmount - initialAmount;
  
    return {
      results,
      realYield: parseFloat(realYield.toFixed(2)),
      annualYield: parseFloat(annualYield.toFixed(2)),
      earned: parseFloat(earned.toFixed(2)),
    };
  }
  