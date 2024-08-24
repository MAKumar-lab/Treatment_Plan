import React from 'react';

const Summary = ({ totalValue, investment, savingsDollars, savingsPercent, bonusValue, onSavingsChange }) => {
  return (
    <div className="summary">
      <div>Total Value: ${totalValue.toFixed(2)}</div>
      <div>Your Investment: ${investment.toFixed(2)}</div>
      <div>
        Savings $: 
        <input
          type="number"
          className="savings-input"
          value={savingsDollars.toFixed(2)}
          onChange={(e) => onSavingsChange('savingsDollars', e.target.value)}
          step="0.01"
          min="0"
          max={totalValue}
        />
      </div>
      <div>
        Savings %: 
        <input
          type="number"
          className="savings-input"
          value={savingsPercent.toFixed(2)}
          onChange={(e) => onSavingsChange('savingsPercent', e.target.value)}
          step="0.01"
          min="0"
          max="100"
        />%
      </div>
      <div>Bonus Value: ${bonusValue.toFixed(2)}</div>
      <div className="total-with-bonuses">Total Value with Bonuses: ${(totalValue + bonusValue).toFixed(2)}</div>
    </div>
  );
};

export default Summary;



  

