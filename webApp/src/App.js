import Autocomplete from "./Autocomplete";
import {Get} from "./http";

import './App.css';

function App() {

  const loadData = (value, callback) => {
    Get("http://localhost:3002/search/" + value).then((result) => {
      callback(result);
    })
  }

  return (
    <div className="App" style={{marginTop : "15px"}}>
      <Autocomplete loadOptions={loadData} />
    </div>
  );
}

export default App;
