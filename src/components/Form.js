import React from 'react'
import { FaTimes, FaEquals } from 'react-icons/fa'
import Button from './Button'
import { removeRow } from './InvestmentsTable'
import { showTotals } from './Totals'


const Form = () => {
    const handleClick = () => {
        const addHoldingForm = document.querySelector('.addHolding');
        const portfolioPage = document.querySelector('.portfolio');
        const container = document.querySelector('.container');
        const searchInput = document.getElementById('searchInput');
        const price = document.querySelector('.price input');
        const quantity = document.querySelector('.quantity input');
        const total = document.querySelector('.total input');
        const info = document.querySelector('.addHolding form .showInfo');

        addHoldingForm.classList.remove('visually-active');
        // Remove form after setting "display" back to "none"
        setTimeout(() => {
            addHoldingForm.classList.remove('active');
            container.classList.remove('margin-change');

            info.style.display = 'none';

            searchInput.value = '';
            price.value = '';
            quantity.value = '';
            total.value = '';
        }, 1020);

        portfolioPage.style.transform = 'translateX(0rem)';
        portfolioPage.style.opacity = 1;
    }

    // Show total
    const showTotal = (e) => {
        const total = document.querySelector('.total input');
        const price = document.querySelector('.price input');
        const quantity = document.querySelector('.quantity input');

        if (e.target === quantity) {
            total.value = thousandsSeparators(e.target.value * price.value);
        } else if (e.target === price) {
            total.value = thousandsSeparators(e.target.value * quantity.value);
        }
    }

    // Show total with commmas
    const thousandsSeparators = (num) => {
        let numParts = num.toString().split(".");
        numParts[0] = numParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return numParts.join(".");
    }

    // Save investment 
    const saveInvestment = () => {
        const investmentsTable = document.querySelector('.investmentsTable');
        const searchInput = document.getElementById('searchInput').value;
        const price = document.querySelector('.price input').value;
        const quantity = document.querySelector('.quantity input').value;
        const total = document.querySelector('.total input').value;
        // The total return is randomized every time there are changes inside the portfolio
        const totalReturn = (Math.floor(Math.random() * 101)) * (Math.random() < 0.5 ? -1 : 1);

        const arr = ['Apple Inc.', 'AAPL', 'Microsoft Corporation', 'MSFT', 'Amazon.com', 'AMZN', 'Alphabet Inc.', 'GOOGL', 'Facebook Inc.', 'FB', 'Tesla Inc.', 'TSLA', 'JP Morgan Chase & Co.', 'JPM', 'Visa Inc.', 'V', 'Johnson & Johnson', 'JNJ', 'Walmart Inc.', 'WMT', 'Mastercard Inc.', 'MA', 'NVIDIA Corporation', 'NVDA', 'UnitedHealth Group Inc.', 'UNH', 'Bank of America Corporation', 'BAC', 'Home Depot Inc.', 'HD', 'Walt Disney Company', 'DIS', 'Procter & Gamble Company', 'PG', 'PayPal Holdings Inc.', 'PYPL', 'Intel Corporation', 'INTC', 'Netflix Inc.', 'NFLX'];

        // Eliminate commas from separated numbers
        let eliminateCommas = (num) => {
            let numArr = num.split(',');
            return numArr.join('');
        }

        if (searchInput === '' || quantity === '') {
            alert('Please fill out all fields!');
        } else if (arr.find(element => element === searchInput) === undefined) { 
            alert('Please enter a valid company name or symbol!');
        } else {
            const symbol = document.querySelector('.addHolding form .showInfo strong').textContent;

            if (localStorage.getItem('tableItem') === null) {
                const table = document.createElement('table');
                let arr = [];

                investmentsTable.innerHTML = '';
                investmentsTable.style = {
                    alignItems: 'top',
                    height: 'auto'
                }

                investmentsTable.append(table);
                table.innerHTML = `
                    <thead>
                        <tr>
                            <th>Symbol</th>
                            <th>Price($)</th>
                            <th>Quantity</th>
                            <th>Total Value($)</th>
                            <th>Total Return</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="row-${symbol}">
                            <td>${symbol}</td>
                            <td>${thousandsSeparators(price)}</td>
                            <td>${thousandsSeparators(quantity)}</td>
                            <td>${thousandsSeparators(total)}</td>
                            <td>${totalReturn}%</td>
                            <td><button type="button" title="Remove Holding" class="remove">X</button></td>
                        </tr>
                    </tbody>
                `;

                let itemValues = {
                    symbol: symbol,
                    price: price,
                    quantity: quantity,
                    total: eliminateCommas(total), // Saved in localStorage without comma so it can be added to previous value
                    return: totalReturn
                };

                arr.push(itemValues);
                localStorage.setItem('tableItem', JSON.stringify(arr));
            } else if (JSON.parse(localStorage.getItem('tableItem')).find(element => element.symbol === symbol) !== undefined) {
                // If the searched holding is already in the portfolio, add all the new data to the already existing holding's row
                // instead of creating a new row 

                let holdingRow = document.querySelector(`.row-${symbol}`).children;
                let itemsList = JSON.parse(localStorage.getItem('tableItem'));
                let savedItem = itemsList.find(element => element.symbol === symbol);

                // The newly entered data is added to the existing one and shown with separators in the portfolio,
                // and saved without separators in the localStorage  

                holdingRow[1].innerText = thousandsSeparators(price);
                savedItem.price = price;

                holdingRow[2].innerText = thousandsSeparators(parseInt(eliminateCommas(holdingRow[2].innerText)) + parseInt(eliminateCommas(quantity)));
                savedItem.quantity = parseInt(savedItem.quantity) + parseInt(eliminateCommas(quantity));
                
                holdingRow[3].innerText = thousandsSeparators(parseInt(eliminateCommas(holdingRow[3].innerText)) + parseInt(eliminateCommas(total)));
                savedItem.total = parseInt(savedItem.total) + parseInt(eliminateCommas(total));

                holdingRow[4].innerText = `${totalReturn}%`;
                savedItem.return = totalReturn;

                localStorage.setItem('tableItem', JSON.stringify(itemsList));
            } else {
                const tableBody = document.querySelector('.investmentsTable table tbody');

                tableBody.innerHTML += `
                    <tr class="row-${symbol}">
                        <td>${symbol}</td>
                        <td>${thousandsSeparators(price)}</td>
                        <td>${thousandsSeparators(quantity)}</td>
                        <td>${thousandsSeparators(total)}</td>
                        <td>${totalReturn}%</td>
                        <td><button type="button" title="Remove Holding" class="remove">X</button></td>
                    </tr>
                `;

                let itemValues = {
                    symbol: symbol,
                    price: price,
                    quantity: quantity,
                    total: eliminateCommas(total), // Saved in localStorage without comma so it can be added to previous value
                    return: totalReturn
                };

                let savedItem = JSON.parse(localStorage.getItem('tableItem'));
                savedItem.push(itemValues);
                localStorage.setItem('tableItem', JSON.stringify(savedItem));
            }

            handleClick();

            // Add the removeRow function to ALL removeBtn buttons
            for (let removeBtn of document.querySelectorAll('.remove')) {
                removeBtn.addEventListener('click', removeRow)
            }
        }

        // Modify totals after saving holding
        document.querySelector('.totals .accValue p').innerText = `$${thousandsSeparators(showTotals().value)}`;
        document.querySelector('.totals .accReturn p').innerText = `${showTotals().return.toFixed(2)}%`;
    }

    return (
        <form autoComplete="off">
            <label>Company name or symbol</label> 
            <br /><br />
            <div className="autocomplete">
                <input id="searchInput" type="search" placeholder="Enter name or symbol..." />
            </div>

            <div className='showInfo'></div>
            <br /><br />
            <div className="calculateTotal">
                <div className="quantity">
                    <label>Quantity</label>
                    <br /><br />
                    <input onChange={showTotal} type="number" min="0" placeholder="Number of shares..." />
                </div>
                <FaTimes />
                <div className="price">
                    <label>Price ($)</label>
                    <br /><br />
                    <input onChange={showTotal} type="number" min="0" step="0.01" placeholder="Share price..." />
                </div>
                <FaEquals />
                <div className="total">
                    <label>Total ($)</label>
                    <br /><br />
                    <input type="text" placeholder="Total cost..." readOnly/>
                </div>
            </div>
            <br /><br /><br />
            <div className="buttons">
                <Button text="SAVE HOLDING" color="#fff" background="#424294" onClick={saveInvestment} />
                <Button text="CANCEL" color="#fff" background="#424294" onClick={handleClick} />
            </div>
        </form>
    )
}

export const thousandsSeparators = (num) => {
    let numParts = num.toString().split(".");
    numParts[0] = numParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return numParts.join(".");
} 

export default Form
