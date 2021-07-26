import { thousandsSeparators } from './Form'

const showTotals = () => {
    let accValue = 0;
    let accReturn = 0;

    if (localStorage.getItem('tableItem') === null) {
        accValue = 0;
        accReturn = 0;
    } else {
        let itemsList = JSON.parse(localStorage.getItem('tableItem'));

        for (let i = 0; i < itemsList.length; i++) {
            accValue += parseInt(itemsList[i].total);
            accReturn += itemsList[i].return;
        }

        accReturn = accReturn / itemsList.length;
    }

    let obj = {
        value: accValue,
        return: accReturn
    }

    return obj;
}

const Totals = () => {

    return ( 
        <div className="totals">
            <div className="accValue">
                <h3>Account Total Value</h3>
                <p>${thousandsSeparators(showTotals().value)}</p>
            </div>
            <div className="accReturn">
                <h3>Account Average Return</h3>
                <p>{showTotals().return.toFixed(2)}%</p>
            </div>
        </div>
    )
}

export { showTotals }
export default Totals