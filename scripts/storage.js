// Save form data to local storage
function saveToLocalStorage() {
    const formData = {
      initialAmount: document.getElementById("initialAmount").value,
      startDate: document.getElementById("startDate").value,
      term: document.getElementById("term").value,
      annualRate: document.getElementById("annualRate").value,
      capitalization: document.getElementById("capitalization").checked,
    };
    localStorage.setItem("depositFormData", JSON.stringify(formData));
  }
  
  // Load form data from local storage or set default values
  function loadFromLocalStorage() {
    const defaultData = {
      initialAmount: "100000",  // Default initial deposit amount
      startDate: new Date().toISOString().split("T")[0], // Default to today's date
      term: "12",             // Default deposit term in months
      annualRate: "5.0",      // Default annual rate in percentage
      capitalization: true,   // Default capitalization state
    };
  
    const savedData = localStorage.getItem("depositFormData");
    const formData = savedData ? JSON.parse(savedData) : defaultData;
  
    document.getElementById("initialAmount").value = formData.initialAmount;
    document.getElementById("startDate").value = formData.startDate;
    document.getElementById("term").value = formData.term;
    document.getElementById("annualRate").value = formData.annualRate;
    document.getElementById("capitalization").checked = formData.capitalization;
  }
  