import React from 'react';

const AddOnRow = ({ addOns, count, addOn, onChange }) => {
  const selectedAddOn = addOns.find(a => a.name === addOn);
  const price = selectedAddOn ? selectedAddOn.price : 0;
  const total = price * count;

  return (
    <div className="row">
      <select 
        className="treatment-name"
        value={addOn} 
        onChange={(e) => onChange('selected', e.target.value)}
      >
        <option value="">Select Add-On</option>
        {addOns.map(a => (
          <option key={a.name} value={a.name}>{a.name}</option>
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

export default AddOnRow;





