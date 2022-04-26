import Autocomplete from "./Autocomplete";
import {Get} from "./http";

import './App.css';

function App() {

  const loadData = async(value, callback) => {
    let result = await Get("http://localhost:3002/search/" + value);
    callback(result)
  }

  return (
    <div className="App" style={{marginTop : "15px"}}>
      <Autocomplete loadOptions={loadData} />
    </div>
  );
}

export default App;
