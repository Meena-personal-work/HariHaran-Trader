import React, { useState, useRef,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PDFDownloadLink, Document, Page, Text, View ,Font} from '@react-pdf/renderer';
import NotoSansTamilRegular from './NotoSansTamil-Regular.ttf';
import NotoSansTamilBold from './NotoSansTamil-Bold.ttf';

import './confirmList.css';
import '../Home/home.css';

// Register the font files with PDFKit
Font.register({
  family: 'Noto Sans Tamil',
  fonts: [
    { src: NotoSansTamilRegular, fontWeight: 'normal' },
    { src: NotoSansTamilBold, fontWeight: 'bold' },
  ]
});

const ConfirmListPage = ({ setSelectedItems, selectedItems, totalRate, setTotalRate, crackers, setCrackers, customerName, setCustomerName, customerNumber, setCustomerNumber, customerAddress, setCustomerAddress, setDownloaded, downloaded,setDiscountTotalRate,discountTotalRate }) => {
  const [selectedItemsPdf, setSelectedItemsPdf] = useState([]);
  const [isDownloaded, setIsDownloaded] = useState(false);

  const scrollRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    const handleBackButton = (event) => {
      event.preventDefault();
      const result = window.confirm("Are you sure you want to start from the first page?");
      if (result) {
        navigate('/')
      }
      // Otherwise, do nothing (cancel navigation)
    };

    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener('popstate', handleBackButton);

    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, [navigate]);

  const handleEdit = () => {
    navigate('/')
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  const handleConfirmOrder = () => {
    alert('Order submitted successfully!');
    const selectedCrackers = crackers.flatMap(category =>
      category.items.filter(item => item.checked).map(item => ({ ...item, category: category.category }))
    );
    console.log(selectedCrackers);
    setSelectedItemsPdf(selectedCrackers);
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Group selected items by category
  const groupedItems = {};
  selectedItems.forEach(currentItem => {
    if (!groupedItems[currentItem.category]) {
      groupedItems[currentItem.category] = [];
    }
    groupedItems[currentItem.category].push(currentItem);
  });

  // Function to clear the form
  const handleClearForm = () => {
    // Clear the form values and reset state
    setCustomerName('');
    setCustomerNumber('');
    setCustomerAddress('');
    setDiscountTotalRate(0);
    setCrackers([]);
    setSelectedItems([]);
    setTotalRate(0);
  };

  const handleDownloadComplete = () => {
    setIsDownloaded(true);
    handleClearForm();
    setDownloaded(!downloaded)
    setTimeout(() => {
      alert('Download complete. Click OK to navigate');
      navigate('/');
    }, 3000);
  };

  function generateOrderNumber() {
    const currentDate = new Date();
    const time = currentDate.getTime();
    return time;
  }

  return (
    <div>
      <div className='full-container-header'>
        <h1 className='font-style-heading'>Jai Ganesh Agencies</h1>
        <button className='edit-button' onClick={handleEdit}>Edit</button>
      </div>
      <div className='full-input-container'>
        <div className='crackersGif-confirmList'></div>
        <div className='input-container-confirmList'>
          <div className='customer-container-title'>Customer Information</div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <span className='input-fonts'>Customer Name:</span>
            <div
              className='customer-inputbox-name-confirmList'
            >{customerName}</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <span className='input-fonts'>Customer Number:</span>
            <div
              className='customer-inputbox-confirmList'
            >{customerNumber}</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>

            <span className='input-fonts'>Customer Address:</span>
            <div
              className='customer-inputbox-address-confirmList'
            >{customerAddress}</div>
          </div>
        </div>
      </div>

      <div className='list-container-confirmList'>
        <table className='table' align='center' style={{ width: '85%' }}>
          <thead>
            <tr className='tablecell'>
              <th className='tablecell'>Cracker Name</th>
              <th className='tablecell'>Quantity</th>
              <th className='tablecell'>Rate</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(groupedItems).map((category, categoryIndex) => (
              <React.Fragment key={categoryIndex}>
                <tr className='tableRow'>
                  <td colSpan="5" style={{ fontWeight: 'bold', backgroundColor: '#f1eeee' }}>{category}</td>
                </tr>
                {groupedItems[category].map((item, itemIndex) => (
                  <tr key={`${categoryIndex}-${itemIndex}`} className='tableRow'>
                    <td className='tablecell' style={{ textAlign: 'left' }}>{item.name}<div style={{marginTop:'15px'}}>{item.tamilName}</div></td>
                    <td className='tablecell' style={{ textAlign: 'center' }}>{item.quantity}</td>
                    <td className='tablecell' style={{ textAlign: 'center' }}>₹{item.quantity * parseFloat(item.rate)}</td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
            <tr>
              <td colSpan="2" style={{ fontWeight: 'bold', backgroundColor: '#f1eeee' }}>Total Amount</td>
              <td className='tablecell' style={{ fontWeight: 'bold', backgroundColor: '#f1eeee' }}>₹{totalRate}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='button-container-confirmList'>
        <button className="Confirm-order" onClick={handleConfirmOrder}>Confirm Order</button>
      </div>

       {/* PDF Generation */}
      {selectedItemsPdf.length > 0 && (
        <PDFDownloadLink
          document={
            <Document>
              <Page style={{ borderWidth: 1, borderStyle: 'solid', padding: 20 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 5, textAlign: 'center' }}>List Of Order Placed</Text>
                <Text style={{ fontWeight: 'bold', marginBottom: 10, textAlign: 'center' }}>Order Number: {generateOrderNumber}</Text>
                <View style={{ flexDirection: 'row', marginTop: 3 }}>
                  <Text style={{ flex: 1, textAlign: 'center', fontWeight: 'bold', borderWidth: 1, borderColor: 'black', padding: 3, fontSize: 14 }}>Cracker Name</Text>
                  <Text style={{ flex: 1, textAlign: 'center', fontWeight: 'bold', borderWidth: 1, borderColor: 'black', padding: 3, fontSize: 14 }}>Tamil Cracker Name</Text>
                  <Text style={{ flex: 1, textAlign: 'center', fontWeight: 'bold', borderWidth: 1, borderColor: 'black', padding: 3, fontSize: 14 }}>Quantity</Text>
                  <Text style={{ flex: 1, textAlign: 'center', fontWeight: 'bold', borderWidth: 1, borderColor: 'black', padding: 3, fontSize: 14 }}>Rate (INR)</Text>
                </View>
                {Object.keys(groupedItems).map((category, categoryIndex) => (
                  <View key={categoryIndex}>
                    <Text style={{ fontWeight: 'bold', backgroundColor: '#f1eeee', padding: 3, fontSize: 14, textAlign: 'center' }}>{category}</Text>
                    {groupedItems[category].map((item, itemIndex) => (
                      <View key={`${categoryIndex}-${itemIndex}`} style={{ flexDirection: 'row' }}>
                        <Text style={{ flex: 1, textAlign: 'left', borderWidth: 1, borderColor: 'black', padding: 3, fontSize: 12 }}>{item.name}</Text>
                        <Text style={{ flex: 1, textAlign: 'left', borderWidth: 1, borderColor: 'black', padding: 3, fontSize: 12, fontFamily: 'Noto Sans Tamil' }}>{item.tamilName}</Text>
                        <Text style={{ flex: 1, textAlign: 'center', borderWidth: 1, borderColor: 'black', padding: 3, fontSize: 12 }}>{item.quantity}</Text>
                        <Text style={{ flex: 1, textAlign: 'center', borderWidth: 1, borderColor: 'black', padding: 3, fontSize: 12 }}>{(item.quantity * item.rate).toFixed(2)}</Text>
                      </View>
                    ))}
                  </View>
                ))}
                <Text style={{ fontWeight: '700', display: 'flex', alignItems: 'center', backgroundColor: '#f1eeee', fontSize: '15px', minHeight: '22px', marginTop: '40px' }}>Customer Information</Text>
                <Text style={{ fontSize: 14, marginTop: 10, fontWeight: 'bold', wordBreak: 'break-word', width: '75%' }}>Customer Name : {customerName}</Text>
                <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 6 }}>Customer Number : {customerNumber}</Text>
                <Text style={{ fontSize: 14, fontWeight: 'bold', wordBreak: 'break-word', width: '75%', marginTop: 6 }}>Customer Address : {customerAddress}</Text>
                <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 17 }}>Total Amount: {totalRate.toFixed(2)}</Text>
              </Page>
            </Document>
          }
          fileName={'Ordered-List'}
          onClick={handleDownloadComplete}
        >
          {({ blob, url, loading, error }) =>
            loading ? <div className='download-container'>Loading document...</div> : <div className='download-container'>{isDownloaded ? "Downloaded" : "Download PDF By Clicking This and Send It To Us After Confirmation"}</div>
          }
        </PDFDownloadLink>
      )}
      <div style={{ height: '100px' }} ref={scrollRef}></div>
    </div>
  );
}

export default ConfirmListPage;