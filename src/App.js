import React from 'react';

//import Scss
import './assets/scss/themes.scss';
import './assets/scss/CSS/Oraganizationform.css'
import CustomAlert from './Components/Common/CustomAlert';

//imoprt Route
import Route from './Routes';

function App() {
  return (
    <React.Fragment>
      <Route />
      <CustomAlert />
    </React.Fragment>
  );
}

export default App;
