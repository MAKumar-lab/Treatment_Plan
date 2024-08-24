import React from 'react';

const TreatmentRow = ({ treatments, count, treatment, onChange }) => {
  const selectedTreatment = treatments.find(t => t.name === treatment);
  const price = selectedTreatment ? selectedTreatment.price : 0;
  const total = price * count;

  return (
    <div className="row">
      <select 
        className="treatment-name"
        value={treatment} 
        onChange={(e) => onChange('selected', e.target.value)}
      >
        <option value="">Select Treatment</option>
        {treatments.map(t => (
          <option key={t.name} value={t.name}>{t.name}</option>
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

export default TreatmentRow;








