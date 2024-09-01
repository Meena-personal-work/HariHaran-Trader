import React,{useState,useEffect} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home/home';
import ConfirmListPage from './ConfirmList/confirmList';
import { CrackersList,giftBox } from './data-list';

function App() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalRate, setTotalRate] = useState(0);
  const [crackers, setCrackers] = useState(CrackersList);
  const [giftBoxCrackers, setGiftBoxCrackers] = useState(giftBox);
  const [customerName, setCustomerName] = useState('');
  const [customerNumber, setCustomerNumber] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerState, setCustomerState] = useState('');
  const [downloaded, setDownloaded] = useState(false);

  useEffect(()=>{
    setCrackers(CrackersList);
    setGiftBoxCrackers(giftBox)
  },[downloaded])

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={
            <Home 
          setSelectedItems={setSelectedItems} 
          totalRate={totalRate} 
          setTotalRate={setTotalRate}
          crackers={crackers}
          setCrackers={setCrackers}
          customerName={customerName}
          setCustomerName={setCustomerName}
          customerNumber={customerNumber}
          setCustomerNumber={setCustomerNumber}
          customerAddress={customerAddress}
          setCustomerAddress={setCustomerAddress}
          customerState={customerState}
          setCustomerState={setCustomerState}
          giftBoxCrackers={giftBoxCrackers}
          setGiftBoxCrackers={setGiftBoxCrackers}
           />} />
          <Route path="/confirmList" element={<ConfirmListPage 
          setSelectedItems={setSelectedItems} 
          selectedItems={selectedItems}
           totalRate={totalRate}
           setTotalRate={setTotalRate}
           crackers={crackers}
          setCrackers={setCrackers}
          customerName={customerName}
          setCustomerName={setCustomerName}
          customerNumber={customerNumber}
          setCustomerNumber={setCustomerNumber}
          customerAddress={customerAddress}
          setCustomerAddress={setCustomerAddress}
          customerState={customerState}
          setCustomerState={setCustomerState}
          setDownloaded={setDownloaded}
          downloaded={downloaded}
          giftBoxCrackers={giftBoxCrackers}
          setGiftBoxCrackers={setGiftBoxCrackers}
           />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
