function calculatePrice() {
    // Basic income information
    const grossIncome = parseFloat(document.getElementById("income").value);
    const netIncome = grossIncome * 0.7; // Approximate net income (70% of gross)
    const children = parseInt(document.getElementById("children").value);
    const soleEarner = parseInt(document.getElementById("soleEarner").value);
    
    // Additional factors
    const locationFactor = parseFloat(document.getElementById("location").value);
    const specialCircumstances = parseInt(document.getElementById("specialCircumstances").value);

    // Calculate disposable income
    let disposableIncome = netIncome;

    // Apply modifiers
    let modifiers = 0;
    
    // Children modifier (reduced impact)
    if (children > 0) {
        modifiers -= (children * 50);
    }

    // Sole earner modifier (reduced impact)
    if (soleEarner === 1) {
        modifiers -= 100; 
    }

    // Location factor (0.8 to 1.2)
    disposableIncome *= locationFactor;

    // Special circumstances modifier (reduced impact)
    if (specialCircumstances === 1) {
        modifiers -= 150;
    }

    // Calculate base price (increased from 30% to 35% of disposable income)
    let basePrice = (disposableIncome * 0.35) + modifiers;

    // Ensure minimum price (increased from 300 to 400)
    basePrice = Math.max(basePrice, 400);

    // Income classes with adjusted ranges
    let incomeClass = '';
    let classDescription = '';

    if (basePrice < 600) {
        incomeClass = 'E';
        classDescription = 'Grundversorgung';
    } else if (basePrice >= 600 && basePrice < 800) {
        incomeClass = 'D';
        classDescription = 'Standard';
    } else if (basePrice >= 800 && basePrice < 1000) {
        incomeClass = 'C';
        classDescription = 'Komfort';
    } else if (basePrice >= 1000 && basePrice < 1300) {
        incomeClass = 'B';
        classDescription = 'Premium';
    } else if (basePrice >= 1300) {
        incomeClass = 'A';
        classDescription = 'Luxus';
    }

    // Display results
    const resultElement = document.getElementById("result");
    resultElement.innerHTML = `
        <div class="result-container">
            <h3>Einkommensklasse: ${incomeClass} (${classDescription})</h3>
            <p>Empfohlene Miete: €${Math.round(basePrice)}</p>
            <p>Verfügbares Einkommen: €${Math.round(disposableIncome)}</p>
        </div>
    `;
}
