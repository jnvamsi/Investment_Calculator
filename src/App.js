import { useState } from "react";
import Header from "./components/Header/Header";
import UserInput from "./components/UserInput/UserInput";
import ResultsTable from "./components/ResultsTable/ResultsTable";
function App() {
  const [userInput1, setUserInput] = useState(null);

  const calculateHandler = (userInput) => {
    setUserInput(userInput);
  };

  const resetHandler = () => {
    setUserInput(null);
  };

  const yearlyData = [];
  if (userInput1) {
    let currentSavings = +userInput1["current-savings"]; // feel free to change the shape of this input object!
    const yearlyContribution = +userInput1["yearly-contribution"]; // as mentioned: feel free to change the shape...
    const expectedReturn = +userInput1["expected-return"] / 100;
    const duration = +userInput1["duration"];

    for (let i = 0; i < duration; i++) {
      const yearlyInterest = currentSavings * expectedReturn;
      currentSavings += yearlyInterest + yearlyContribution;
      yearlyData.push({
        year: i + 1,
        yearlyInterest: yearlyInterest,
        savingsEndOfYear: currentSavings,
        yearlyContribution: yearlyContribution,
      });
    }
  }

  return (
    <div>
      <Header />
      <UserInput onCalculate={calculateHandler} onReset={resetHandler} />
      {!userInput1 && <p>No investment calculated yet.</p>}
      {userInput1 && (
        <ResultsTable
          data={yearlyData}
          initialInvestment={userInput1["current-savings"]}
        />
      )}
    </div>
  );
}

export default App;
