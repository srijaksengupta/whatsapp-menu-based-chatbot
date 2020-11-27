import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/navbar.component"
import MenuItemList from "./components/menuItems-list.component";
import EditMenuItem from "./components/edit-menuItem.component";
import CreateMenuItem from "./components/create-menuItem.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br/>
        <Route path="/" exact component={MenuItemList} />
        <Route path="/edit/:id" component={EditMenuItem} />
        <Route path="/create" component={CreateMenuItem} />
      </div>
    </Router>
  );
}

export default App;
