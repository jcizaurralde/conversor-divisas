import './App.css';
import Dinero from 'dinero.js';
import RatesPromise from './data/rates';
import { useEffect, useState } from 'react';

Dinero.globalExchangeRatesApi = {
  currency: 'EUR',
  endpoint: RatesPromise,
};

let CurrencySelector = ({ rates, onChange }) => (
  <select onChange={onChange}>
    {rates.map((rate, index) => (
      <option key={index} >{rate}</option>
    ))}
  </select>
);

function App() {

  let [rates, setRates] = useState([]);
  let [originCurrency, setOriginCurrency] = useState([]);
  let [targetCurrency, setTargetCurrency] = useState([]);
  let [finalAmount, setFinalAmount] = useState([]);
  let [originalAmount, setOriginalAmount] = useState([]);
  
  useEffect(()=>{
    let ratesData;
    RatesPromise.then((value)=>{
      ratesData = value;
      let ratesArray = Object.keys(ratesData.rates);
      console.log(ratesArray);
      setRates(ratesArray);
    });
  },[]);

  let convert = async () => {
    let amount = Dinero({
      amount: parseInt(originalAmount) * 100,
      currency: originCurrency,
    });
    let result = await amount.convert(targetCurrency);
    setFinalAmount(result.toFormat());
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Conversor de monedas</h1>
        <div className='flex-container'>
          <div>
            <p>Origen: {originCurrency}</p>
            <CurrencySelector onChange={(ev)=> setOriginCurrency (ev.target.value)} rates={rates}/>
          </div>
          <div>
            <p>Destino: {targetCurrency}</p>
            <CurrencySelector onChange={(ev)=> setTargetCurrency (ev.target.value)} rates={rates}/>
          </div>
        </div>
        <input onChange={(ev)=> setOriginalAmount(ev.target.value)} 
        type='number' className='form-control' placeholder='Monto en centavos'></input>
        <p>El resultado es: {finalAmount}</p>
        <button onClick={convert} className='app-button'>Convertir</button>
      </div>
    </div>
  );
}

export default App;
