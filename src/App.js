import React, { useState, useEffect } from 'react';
import TreatmentRow from './components/TreatmentRow';
import AddOnRow from './components/AddOnRow';
import BonusRow from './components/BonusRow';
import Summary from './components/Summary';
import './App.css';

const treatments = [
  { name: 'Botox', price: 250 },
  { name: 'Laser Hair Removal', price: 150 },
  { name: 'Facial', price: 100 },
];

const addOns = [
  { name: 'Extra Session', price: 50 },
  { name: 'Vitamin C Serum', price: 30 },
  { name: 'Hydrating Mask', price: 40 },
];

const bonuses = [
  { name: 'Free Skincare Kit', price: 30 },
  { name: 'B12 Injection', price: 20 },
  { name: 'Anti-Aging Cream', price: 40 },
];

const initialOptionState = {
  treatmentRows: Array(5).fill({ selected: '', count: 0 }),
  addOnRows: Array(3).fill({ selected: '', count: 0 }),
  bonusRows: Array(3).fill({ selected: '', count: 0 }),
  summary: {
    totalValue: 0,
    investment: 0,
    savingsDollars: 0,
    savingsPercent: 0,
    bonusValue: 0,
  }
};

function App() {
  const [activeTab, setActiveTab] = useState('A');
  const [optionA, setOptionA] = useState(initialOptionState);
  const [optionB, setOptionB] = useState(initialOptionState);
  const [optionC, setOptionC] = useState(initialOptionState);

  const getCurrentOption = () => {
    switch(activeTab) {
      case 'A': return [optionA, setOptionA];
      case 'B': return [optionB, setOptionB];
      case 'C': return [optionC, setOptionC];
      default: return [optionA, setOptionA];
    }
  };

  const [currentOption, setCurrentOption] = getCurrentOption();

  useEffect(() => {
    const [newCurrentOption, newSetCurrentOption] = getCurrentOption();
    setCurrentOption(newCurrentOption);
  }, [activeTab]);

  useEffect(() => {
    calculateSummary();
  }, [currentOption.treatmentRows, currentOption.addOnRows, currentOption.bonusRows]);

  const calculateSummary = () => {
    const treatmentTotal = currentOption.treatmentRows.reduce((sum, row) => {
      const treatment = treatments.find(t => t.name === row.selected);
      return sum + (treatment ? treatment.price * row.count : 0);
    }, 0);

    const addOnTotal = currentOption.addOnRows.reduce((sum, row) => {
      const addOn = addOns.find(a => a.name === row.selected);
      return sum + (addOn ? addOn.price * row.count : 0);
    }, 0);

    const bonusTotal = currentOption.bonusRows.reduce((sum, row) => {
      const bonus = bonuses.find(b => b.name === row.selected);
      return sum + (bonus ? bonus.price * row.count : 0);
    }, 0);

    const totalValue = treatmentTotal + addOnTotal;
    const investment = totalValue - currentOption.summary.savingsDollars;

    setCurrentOption(prev => ({
      ...prev,
      summary: {
        ...prev.summary,
        totalValue,
        investment,
        bonusValue: bonusTotal,
      }
    }));
  };

  const handleRowChange = (index, type, field, value) => {
    setCurrentOption(prev => {
      const newOption = { ...prev };
      const rowsKey = type === 'treatment' ? 'treatmentRows' : type === 'addOn' ? 'addOnRows' : 'bonusRows';
      newOption[rowsKey] = [...prev[rowsKey]];
      newOption[rowsKey][index] = { ...newOption[rowsKey][index], [field]: value };
      return newOption;
    });
  };

  const handleSavingsChange = (field, value) => {
    setCurrentOption(prev => {
      const newSummary = { ...prev.summary };
      if (field === 'savingsDollars') {
        newSummary.savingsDollars = parseFloat(value) || 0;
        newSummary.savingsPercent = (newSummary.savingsDollars / newSummary.totalValue) * 100 || 0;
      } else {
        newSummary.savingsPercent = parseFloat(value) || 0;
        newSummary.savingsDollars = (newSummary.savingsPercent / 100) * newSummary.totalValue || 0;
      }
      newSummary.investment = newSummary.totalValue - newSummary.savingsDollars;
      return { ...prev, summary: newSummary };
    });
  };

  const resetForm = () => {
    setOptionA(initialOptionState);
    setOptionB(initialOptionState);
    setOptionC(initialOptionState);
  };

  const printSummary = () => {
    const printContent = `
      <h2>Your Personal Treatment Option: ${activeTab}</h2>
      <p>Total Value: $${currentOption.summary.totalValue.toFixed(2)}</p>
      <p>Your Investment: $${currentOption.summary.investment.toFixed(2)}</p>
      <p>Savings: $${currentOption.summary.savingsDollars.toFixed(2)} (${currentOption.summary.savingsPercent.toFixed(2)}%)</p>
      <p>Bonus Value: $${currentOption.summary.bonusValue.toFixed(2)}</p>
      <p><strong>Total Value with Bonuses: $${(currentOption.summary.totalValue + currentOption.summary.bonusValue).toFixed(2)}</strong></p>
    `;
    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="app">
      <h1>Your Personal Treatment Option</h1>
      
      <div className="header">
        <div className="tabs">
          <button onClick={() => setActiveTab('A')} className={activeTab === 'A' ? 'active' : ''}>Option A</button>
          <button onClick={() => setActiveTab('B')} className={activeTab === 'B' ? 'active' : ''}>Option B</button>
          <button onClick={() => setActiveTab('C')} className={activeTab === 'C' ? 'active' : ''}>Option C</button>
        </div>
        <div className="buttons">
          <button onClick={resetForm}>Reset</button>
          <button onClick={printSummary}>Print</button>
        </div>
      </div>

      <div className="content">
        <div className="main-column">
          <div className="section-card treatments-card">
            <h2>Treatments</h2>
            <div className="row-headers">
              <div className="header-treatment-name">Treatment</div>
              <div className="header-price">Price/TX</div>
              <div className="header-count">Count</div>
              <div className="header-total">Total</div>
            </div>
            {currentOption.treatmentRows.map((row, index) => (
              <TreatmentRow
                key={index}
                treatments={treatments}
                count={row.count}
                treatment={row.selected}
                onChange={(field, value) => handleRowChange(index, 'treatment', field, value)}
              />
            ))}
          </div>

          <div className="section-card add-ons-card">
            <h2>Add-Ons</h2>
            <div className="row-headers">
              <div className="header-treatment-name">Add-On</div>
              <div className="header-price">Price/TX</div>
              <div className="header-count">Count</div>
              <div className="header-total">Total</div>
            </div>
            {currentOption.addOnRows.map((row, index) => (
              <AddOnRow
                key={index}
                addOns={addOns}
                count={row.count}
                addOn={row.selected}
                onChange={(field, value) => handleRowChange(index, 'addOn', field, value)}
              />
            ))}
          </div>

          <div className="section-card bonuses-card">
            <h2>Bonuses</h2>
            <div className="row-headers">
              <div className="header-treatment-name">Bonus</div>
              <div className="header-price">Price/TX</div>
              <div className="header-count">Count</div>
              <div className="header-total">Total</div>
            </div>
            {currentOption.bonusRows.map((row, index) => (
              <BonusRow
                key={index}
                bonuses={bonuses}
                count={row.count}
                bonus={row.selected}
                onChange={(field, value) => handleRowChange(index, 'bonus', field, value)}
              />
            ))}
          </div>
        </div>

        <div className="summary-section">
          <Summary
            totalValue={currentOption.summary.totalValue}
            investment={currentOption.summary.investment}
            savingsDollars={currentOption.summary.savingsDollars}
            savingsPercent={currentOption.summary.savingsPercent}
            bonusValue={currentOption.summary.bonusValue}
            onSavingsChange={handleSavingsChange}
          />
        </div>
      </div>
    </div>
  );
}

export default App;




































