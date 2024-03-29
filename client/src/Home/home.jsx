import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLocation, faPhone } from '@fortawesome/free-solid-svg-icons';

import './home.css';

const Home = ({ setSelectedItems, totalRate, setTotalRate, crackers, setCrackers, customerName, setCustomerName, customerNumber, setCustomerNumber, customerAddress, setCustomerAddress, setDiscountTotalRate }) => {
  const navigate = useNavigate();
  // Function to handle quantity change
  const handleQuantityChange = (categoryIndex, itemIndex, quantity) => {
    const updatedCrackers = crackers.map((category, cIndex) => {
      if (cIndex === categoryIndex) {
        const updatedItems = category.items.map((item, iIndex) => {
          if (iIndex === itemIndex) {
            return { ...item, quantity };
          }
          return item;
        });
        return { ...category, items: updatedItems };
      }
      return category;
    });
    setCrackers(updatedCrackers);
    calculateTotalRate(updatedCrackers);
  }; 

  // Function to calculate total rate
  const calculateTotalRate = (crackersList) => {
    let total = 0;
    crackersList.forEach(category => {
      category.items.forEach(item => {
        const quantity = parseInt(item.quantity) || 0;
        const rate = parseFloat(item.rate) || 0;
        total += quantity * rate;
      });
    });

    // Apply 50% discount
    const discount = total * 0.5;
    const discountedTotal = total - discount;

    setTotalRate(total);
    setDiscountTotalRate(discountedTotal);

  };


  const handleCheckboxChange = (categoryIndex, itemIndex) => {
    const updatedCrackers = crackers.map((category, cIndex) => {
      if (cIndex === categoryIndex) {
        const updatedItems = category.items.map((item, iIndex) => {
          if (iIndex === itemIndex) {
            // Toggle the checked status
            const updatedItem = { ...item, checked: !item.checked };
            // If the item is unchecked, set its quantity to 0
            if (!updatedItem.checked) {
              updatedItem.quantity = 0;
            }
            return updatedItem;
          }
          return item;
        });
        return { ...category, items: updatedItems };
      }
      return category;
    });

    setCrackers(updatedCrackers);

    // Recalculate total rate after updating checkboxes
    calculateTotalRate(updatedCrackers);
  };

  const handleSubmit = () => {
    // Check if customer name, number, and address are valid
    const isNameValid = customerName.trim().length > 0;
    const isNumberValid = /^[0-9]{10}$/.test(customerNumber);
    const isAddressValid = customerAddress.trim().length > 0;

    // Check if any item is selected without choosing the quantity
    const invalidItems = [];
    const isQuantityValid = crackers.every(category => {
      return category.items.every(item => {
        if (item.checked && (!item.quantity || item.quantity <= 0)) {
          invalidItems.push(item.name);
          return false;
        }
        return true;
      });
    });

    // Construct the error message for quantity validation
    let quantityErrorMessage = '';
    if (invalidItems.length > 0) {
      quantityErrorMessage = `Please select quantity for the following items: ${invalidItems.join(', ')}.`;
    }

    // Check if at least one cracker is selected
    const isAtLeastOneCrackerSelected = crackers.some(category =>
      category.items.some(item => item.checked)
    );

    // Construct the error message for cracker selection validation
    let crackerErrorMessage = '';
    if (!isAtLeastOneCrackerSelected) {
      crackerErrorMessage = 'Please select at least one cracker.';
    }

    // Check if all validations pass
    if (isNameValid && isNumberValid && isAddressValid && isQuantityValid && isAtLeastOneCrackerSelected) {
      // Here you can implement your submission logic
      alert('Kindly Confirm Your Order');
      const selectedCrackers = crackers.flatMap(category =>
        category.items.filter(item => item.checked).map(item => ({ ...item, category: category.category }))
      );
      console.log(selectedCrackers);
      setSelectedItems(selectedCrackers);
      navigate('/confirmList');
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    } else {
      // If validation fails, show an alert with specific error messages
      let errorMessage = '';
      if (!isNameValid) {
        errorMessage += 'Please enter the name.\n';
      }
      if (!isNumberValid) {
        errorMessage += 'Please enter a valid 10-digit number for the contact number.\n';
      }
      if (!isAddressValid) {
        errorMessage += 'Please enter the address.\n';
      }
      errorMessage += quantityErrorMessage;
      errorMessage += crackerErrorMessage;
      alert(errorMessage);
    }
  };

  return (
    <div className='full-container'>

      <div className='full-container-header'>
        <h1 className='font-style-heading'>Jai Ganesh Agencies</h1>

        <div className='contact-info'>
        <div style={{ display: 'flex', color: 'white', alignItems: 'center' }}><FontAwesomeIcon icon={faLocation} className='fontawesomeiconphone' />Sivakasi</div>
          
          <div style={{ display: 'flex', color: 'white',alignItems: 'center' }}>
            <FontAwesomeIcon icon={faPhone} className='fontawesomeiconphone' />
            9524640004
          </div>
          
          <div style={{ display: 'flex', color: 'white', alignItems: 'center' }}><FontAwesomeIcon icon={faEnvelope} className='fontawesomeiconphone' />
          jaiganeshagencies.sivakasi@gmail.com</div>
        </div>
      </div>

      <div className='content-container'>
        <div className='sub-heading'>
          <h4 className='font-style-sub-heading'>Explore Our Product Catalogue and Place Your Order Today!</h4>
          {/* <div className='font-style-sub-heading-discount'></div> */}
        </div>
        <div className='sub-container'>
          <div className='gif-containers'>
            <div className='crackers-gif1'>
            </div>
            <div className='input-container'>
              <div className='customer-container-title'>Customer Information</div>
              <div className='input-container-informations'>
                <span className='input-fonts'>Customer Name:</span>
                <input
                  autoFocus
                  className='customer-inputbox-name'
                  type="text"
                  placeholder="Enter Your Name...."
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
              </div>
              <div className='input-container-informations'>
                <span className='input-fonts'>Customer Number:</span>
                <input
                  className='customer-inputbox'
                  type="number"
                  placeholder="Enter Your Contact Number...."
                  value={customerNumber}
                  onChange={(e) => setCustomerNumber(e.target.value)}
                />
              </div>
              <div className='input-container-informations-address'>
                <span className='input-fonts'>Customer Address:</span>
                <input
                  className='customer-inputbox-address'
                  type="text"
                  placeholder=" Enter Yout Address...."
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className='list-container'>
            <table className='table' align='center' style={{ width: '85%' }}>
              <thead>
                <tr className='tablecell'>
                  <th className='tablecell'>Select Items</th>
                  <th className='tablecell'>Cracker Name</th>
                  <th className='tablecell'>Quantity</th>
                  <th className='tablecell'>Rate</th>
                </tr>
              </thead>
              <tbody>
                {crackers.map((category, categoryIndex) => (
                  <React.Fragment key={categoryIndex}>
                    <tr className='tableRow'>
                      <td colSpan="4" style={{ fontWeight: 'bold', backgroundColor: '#f1eeee' }}>{category.category}</td>
                    </tr>
                    {category.items.map((item, itemIndex) => (
                      <tr key={`${categoryIndex}-${itemIndex}`} className='tableRow'>
                        <td className='tablecell' style={{ textAlign: 'center' }}>
                          <div className='checkbox-input-container'>
                            <input
                              type="checkbox"
                              checked={item.checked || false}
                              onChange={() => handleCheckboxChange(categoryIndex, itemIndex)}
                            />
                          </div>
                        </td>
                        <td className='tablecell' style={{ textAlign: 'left', letterSpacing: '-1.1px' }}>
                          {item.name}
                          <div style={{marginTop:'15px'}}>{item?.tamilName}</div>
                        </td>
                        <td className='tablecell' style={{ textAlign: 'center' }}>
                          <select
                            className='dropdown-input-container'
                            disabled={!item.checked}
                            value={item.quantity || ''}
                            onChange={e => handleQuantityChange(categoryIndex, itemIndex, parseInt(e.target.value))}
                          >
                            <option value="">Select Quantity</option>
                            {[...Array(101).keys()].map(num => (
                              num === 0 ? null : <option key={num} value={num}>{num}</option>
                            ))}
                          </select>
                        </td>
                        <td className='tablecell' style={{ textAlign: 'center' }}>
                          ₹{item.quantity ? item.quantity * parseFloat(item.rate) : parseFloat(item.rate)}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
                <tr>
                  <td colSpan="3" style={{ fontWeight: 'bold', backgroundColor: '#f1eeee' }}>Total Amount</td>
                  <td className='tablecell' style={{ fontWeight: 'bold', backgroundColor: '#f1eeee' }}>₹{totalRate}</td>
                </tr>
              </tbody>
            </table>

            <div className='button-container'>
              <button className="Place-order" onClick={handleSubmit}>Place Order</button>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}

export default Home;