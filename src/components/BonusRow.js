import React from 'react';

const BonusRow = ({ bonuses, count, bonus, onChange }) => {
  const selectedBonus = bonuses.find(b => b.name === bonus);
  const price = selectedBonus ? selectedBonus.price : 0;
  const total = price * count;

  return (
    <div className="row">
      <select 
        className="treatment-name"
        value={bonus} 
        onChange={(e) => onChange('selected', e.target.value)}
      >
        <option value="">Select Bonus</option>
        {bonuses.map(b => (
          <option key={b.name} value={b.name}>{b.name}</option>
        ))}
      </select>
      <input 
        className="price"
        type="number" 
        value={price} 
        readOnly 
      />
      <input
        className="count"
        type="number"
        value={count}
        onChange={(e) => onChange('count', parseInt(e.target.value) || 0)}
        min="0"
      />
      <input 
        className="total"
        type="number" 
        value={total} 
        readOnly 
      />
    </div>
  );
};

export default BonusRow;



