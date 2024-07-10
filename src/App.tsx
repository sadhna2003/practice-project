import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ExampleForm } from './component/ExampleForm';
import {ExampleForm2} from './component/ExampleForm2';
import BasicTable from './contents/BasicTable';
import SortingTable from './contents/SortingTable';
import GlobalFilteringTable from './contents/GlobalFilteringTable';
import PaginationTable from './contents/PaginationTable';
function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      {/* <h1 className=''>Hello React</h1> */}
      {/* <ExampleForm/> */}
      {/* <ExampleForm2/> */}
      {/* <BasicTable/> */}
      {/* <SortingTable/> */}
      {/* <GlobalFilteringTable/> */}
      <PaginationTable/>
    </div>
  );
}

export default App;
