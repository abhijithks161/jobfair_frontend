import React, { Component } from "react";
import "./App.css";




import SideNav from './components/SideNav';

class App extends Component {
  render(props) {
    return (
      // <Router>
        <div className="container">
        
          <SideNav />
         
        </div>
        
      // </Router>
    );
  }
}

export default App;
