import { thousandsSeparators } from './Form'
import { showTotals } from './Totals'

// Remove selected row
const removeRow = (e) => {
    const investmentsTable = document.querySelector('.investmentsTable');
    let itemsList = JSON.parse(localStorage.getItem('tableItem'));
    let row = e.target.parentElement.parentElement;
    row.remove();

    for (let i = 0; i < itemsList.length; i++) {

        if (itemsList[i].symbol === row.firstElementChild.innerText) {
            itemsList.splice(i, 1)
        }

        localStorage.setItem('tableItem', JSON.stringify(itemsList));
    }

    if (itemsList.length === 0) {
        localStorage.removeItem('tableItem')
        investmentsTable.innerHTML = `<h3>You currently don't have any investments...</h3>`;
        investmentsTable.style.position = 'absolute';
        investmentsTable.style.height = '85%';
        investmentsTable.style.alignItems = 'center';
    }

    // Modify totals after removing holding
    document.querySelector('.totals .accValue p').innerText = `$${thousandsSeparators(showTotals().value)}`;
    document.querySelector('.totals .accReturn p').innerText = `${showTotals().return.toFixed(2)}%`;
}


const InvestmentsTable = () => {
    const totalReturn = (Math.floor(Math.random() * 101)) * (Math.random() < 0.5 ? -1 : 1)
    let itemsList = JSON.parse(localStorage.getItem('tableItem'));

    if (localStorage.getItem('tableItem') === null) {
        // The style for the empty portfolio
        const tableStyles = {
            position: 'absolute',
            alignItems: 'center',
            height: '85%'
        }

        return (
            <div className="investmentsTable" style={tableStyles}>
                <h3>You currently don't have any investments...</h3>
            </div>
        )
    } else {
        // If there are items in localStorage make a table with the items
    
        return (
            <div className="investmentsTable">
                <div className="tableContainer">
                    <table>
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
                            {itemsList.map((item, index) => (
                                <tr className={`row-${item.symbol}`} key={index}>
                                    <td>{item.symbol}</td>
                                    <td>{thousandsSeparators(item.price)}</td>
                                    <td>{thousandsSeparators(item.quantity)}</td>
                                    <td>{thousandsSeparators(item.total)}</td>
                                    <td>{item.return > 0 ? item.return - totalReturn : item.return + totalReturn}%</td>
                                    <td><button type="button" title="Remove Holding" className="remove" onClick={removeRow}>X</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export { removeRow }
export default InvestmentsTable
