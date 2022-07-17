import React from 'react'

export default function CurrencyRow({
  currency,
  selectedCurrency,
  onSelect,
  amount,
  onChangeAmount,
}) {
  return (
    <div>
      <input
        type="number"
        placeholder="0.00"
        className="input"
        value={amount}
        onChange={onChangeAmount}
      />
      <select value={selectedCurrency} onChange={onSelect}>
        {/* <option value="ZAR">ZAR</option> 
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
        <option value="HKD">HKD</option> 
        <option value="KES">KES</option> */}

        {currency.map((currency, index) => {
          return (
            <option key={index} value={currency}>
              {currency}
            </option>
          );
        })}
      </select>
    </div>
  );
}
