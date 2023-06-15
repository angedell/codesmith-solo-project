import React from 'react';
import TDsend from './components/TDsend/TDsend.jsx';
import TDlist from './components/TDlist/TDlist.jsx';

import Header from './components/Header/Header.jsx';


function App() {
 

  return (
    <div id="container">
      <Header />
      <TDsend />
      <TDlist />
    </div>

  );
}

// export {socket};
export default App;
