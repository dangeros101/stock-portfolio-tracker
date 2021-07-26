import Button from './Button'
import { useState, useEffect } from 'react'

const Header = () => {
    const [stocks, setStocks] = useState([]);

    useEffect(() => {
        fetch('stocks.json', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            setStocks(data.stocks)
        })
    }, [])

    const handleClick = (e) => {
        e.preventDefault();
        
        const addHoldingForm = document.querySelector('.addHolding');
        const portfolioPage = document.querySelector('.portfolio');
        const container = document.querySelector('.container');

        addHoldingForm.classList.add('active');
        // Show form after setting "display" to "block"
        setTimeout(() => {
            addHoldingForm.classList.add('visually-active');
            container.classList.add('margin-change');
        }, 20);

        portfolioPage.style.transform = 'translateX(-100rem)';
        portfolioPage.style.opacity = 0;

        autocomplete(document.querySelector('#searchInput'), arr);
    }

    const arr = ['Apple Inc.', 'AAPL', 'Microsoft Corporation', 'MSFT', 'Amazon.com', 'AMZN', 'Alphabet Inc.', 'GOOGL', 'Facebook Inc.', 'FB', 'Tesla Inc.', 'TSLA', 'JP Morgan Chase & Co.', 'JPM', 'Visa Inc.', 'V', 'Johnson & Johnson', 'JNJ', 'Walmart Inc.', 'WMT', 'Mastercard Inc.', 'MA', 'NVIDIA Corporation', 'NVDA', 'UnitedHealth Group Inc.', 'UNH', 'Bank of America Corporation', 'BAC', 'Home Depot Inc.', 'HD', 'Walt Disney Company', 'DIS', 'Procter & Gamble Company', 'PG', 'PayPal Holdings Inc.', 'PYPL', 'Intel Corporation', 'INTC', 'Netflix Inc.', 'NFLX'];

    // Autocomplete function for the search input
    const autocomplete = (inp, arr) => {
        let currentFocus;

        inp.addEventListener('input', (e) => {
            let first, second, val = inp.value;
            closeAllLists();

            if (!val) {return false};
            currentFocus = -1;

            // Create the div element that will contain the items
            first = document.createElement('div');
            first.setAttribute('class', 'autocomplete-items');
            first.setAttribute('id', inp.id + 'autocomplete-list');

            inp.parentNode.appendChild(first);

            // Show autocomplete options
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].substr(0, val.length).toUpperCase() === val.toUpperCase()) {
                    // Create a div for each matching item
                    second = document.createElement('div');
                    second.innerHTML = `<strong>${arr[i].substr(0, val.length)}<strong>`;
                    second.innerHTML += arr[i].substr(val.length);
                    second.innerHTML += `<input type='hidden'>`;
                    second.setAttribute('key', arr[i]);

                    // Execute a function when someone clicks the item
                    second.addEventListener('click', (e) => {
                        const info = document.querySelector('.addHolding form .showInfo');
                        const price = document.querySelector('.price input');

                        inp.value = e.target.getAttribute('key');
                        for (let j = 0; j < stocks.length; j++) {
                            if (e.target.getAttribute('key') === stocks[j].name || e.target.getAttribute('key') === stocks[j].symbol) {
                                info.style.display = 'flex';
                                info.innerHTML = (`
                                    ${stocks[j].name}
                                    <strong>${stocks[j].symbol}</strong>
                                `);

                                price.value = stocks[j].price;
                            }
                        }
 
                        closeAllLists();
                    });
                    first.appendChild(second);
                }
            }
        });

        // Execute a function when a specific key is pressed 
        inp.addEventListener('keydown', (e) => {
            let x = document.getElementById(inp.id + 'autocomplete-list');
            if (x) {x = x.getElementsByTagName('div')};

            // If the ARROW DOWN key is pressed
            if (e.key === 'ArrowDown') {
                currentFocus++;

                addActive(x);
            } else if (e.key === 'ArrowUp') {
                // If the ARROW UP key is pressed
                currentFocus--;

                addActive(x);
            } else if (e.key === 'Enter') {
                // If the ENTER key is pressed
                e.preventDefault();

                if (currentFocus > -1) {
                    if (x) {x[currentFocus].click()};
                }
            }
        });

        // Execute a function that shows an item as active
        const addActive = (x) => {
            if (!x) {return false};

            removeActive(x);
            if (currentFocus >= x.length) {currentFocus = 0};
            if (currentFocus < 0) {currentFocus = (x.length - 1)};

            x[currentFocus].classList.add('autocomplete-active');
        }

        // Execute a function that shows that an item isn't active anymore
        const removeActive = (x) => {
            for (let i = 0; i < x.length; i++) {
                x[i].classList.remove('autocomplete-active');
            }
        }

        // Execute a function that closes the autocomplete lists
        const closeAllLists = (element) => {
            let x = document.getElementsByClassName('autocomplete-items');

            for (let i = 0; i < x.length; i++) {
                if (element !== x[i] && element !== inp) {
                    x[i].parentNode.removeChild(x[i]);
                }
            }
        } 

        // Execute a function that closes the lists when you click outside it
        document.addEventListener('click', (e) => {
            closeAllLists(e.target);
        })
    }

    return (
        <div className="portfolioHeader">
            <h3>Your Investments</h3>
            <Button text="ADD HOLDING" color="#424294" background="#fff" onClick={handleClick} />
        </div>
    )
}

export default Header
