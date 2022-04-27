import {useState, useEffect, useCallback, useRef} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

function Autocomplete({loadOptions, onChange, label = "Search", propertyName = "name"}) {

  const container = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState(null);
  const [itemSelected, setItemSelected] = useState(null);

  const handleOutsideClick = useCallback((e) => {
    if (!container.current.contains(e.target)) {
      setResult(null);
      setInputValue(itemSelected ? itemSelected[propertyName] : "");
    }
  }, [itemSelected, propertyName])

  useEffect(() => {
    window.addEventListener('click', handleOutsideClick);
    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, [handleOutsideClick])

  const handleChange = (event) => {
    let input = event.target.value.trimStart();
    setInputValue(input)

    // if input is empty
    if(input.length === 0) {
      setResult(null);
      setItemSelected(null);
      return false;
    }

    // if loadOptions is provided
    if(loadOptions)
      loadOptions(input, (result) => {

        // check if propertyName really exists in loadOption result callback
        if(result.length > 0 && result[0][propertyName] === undefined) {
          console.error("The property '" + propertyName + "' doesn't exist in your data options")
          return false;
        }

        setResult(result);
      });
  }

  const onItemClick = (item) => {
    setInputValue(item[propertyName]);
    setItemSelected(item);
    setResult(null);

    if(onChange)
      onChange(item);
  }

  const onItemRemove = () => {
    setInputValue("");
    setItemSelected(null);

    if(onChange)
      onChange(null);
  }

  return (
    <Container ref={container}>
      <TextField 
        fullWidth 
        id="outlined-basic" 
        value={inputValue}
        label={label}
        variant="outlined" 
        onChange={handleChange}
        autoComplete="off"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: (
              <InputAdornment position="end">
                {itemSelected && <Remover onClick={onItemRemove}></Remover>}
              </InputAdornment>
          )
        }}
      />
      <ResultContainer>
        {result && result.map((item) => {
          return <ResultItem key={item[propertyName]} onClick={() => onItemClick(item)}>{item[propertyName]}</ResultItem>
        })}
        {result && result.length === 0 &&
          <ResultItem>No options</ResultItem>
        }
      </ResultContainer>
    </Container>
  );
}

// Proptype
Autocomplete.propTypes = {
  loadOptions: PropTypes.func,
  propertyName: PropTypes.string,
  label: PropTypes.string
}

// Styled components
const Container = styled.div`
  width: 260px;
  margin: 15px;
`;

const ResultContainer = styled.div`
  max-height: 254px;
  width: 260px;
  margin-top: 0px;
  overflow-y: auto;
  overflow-x: hidden;
  position: absolute;
  background-color: white;
  z-index: 2;
  border-radius: 4px;
  box-shadow: 0px 2px 1px -1px rgb(0, 0, 0, 0.2), 0px 1px 1px 0px rgb(0, 0, 0, 0.14), 0px 1px 3px 0px rgb(0, 0, 0, 0.12);
`;

const ResultItem = styled.span`
  width: 237px;
  padding: 6px 18px 6px 3px;
  display: list-item;
  list-style: none;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;

const Remover = styled(CloseIcon)`
  cursor: pointer;
  font-size: 20px !important;

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
    border-radius : 50%;
  }
`;

export default Autocomplete;