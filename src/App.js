import Portfolio from './components/Portfolio'
import AddHolding from './components/AddHolding'
import Footer from './components/Footer'
import Totals from './components/Totals'

function App() {
  return (
    <>
      <header>
        <h1>Stock Portfolio Tracker</h1>
      </header>
      <Totals />
      <div className="container">
        <Portfolio />
        <AddHolding />
      </div>
      <Footer />
    </>
  );
}

export default App;
