import Autocomplete from "./components/Autocomplete";
import { Get } from "./helpers/http";
import { appConfig } from "./config";

function App() {

  const loadData = async(input, callback) => {
    let result = await Get(appConfig.apiUrl + "/countries/byName/" + input);
    callback(result)
  }

  return (
    <>
      <Autocomplete loadOptions={loadData} label="Search a country" />
      <Autocomplete 
        loadOptions={loadData} 
        label="Search country with onChange" 
        onChange={(item) => {
          alert(item ? "You selected country '" + item.name + "'" : "You removed the selected country")
        }} 
      />
      <Autocomplete label="Search without options" />
      <Autocomplete loadOptions={loadData} label="Search with wrong prop name" propertyName="test" />
    </>
  );
}

export default App;
