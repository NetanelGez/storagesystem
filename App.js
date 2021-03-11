import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import React, { useState } from "react";
import Home from "./componenets/Home";
import Signup from "./componenets/Signup";
import Login from "./componenets/Login";
import Welcome from "./componenets/Welcome";
import Manager from "./componenets/Manager";
function App() {
  const [employies, setEmployies] = useState([]);
  const [choosenEmployie, setChoosenEmployie] = useState({});
  const [products, setProducts] = useState([
    {
      id: 11122,
      name: "greenBox",
      needforklift: false,
      inPlace: false,
    },
    {
      id: 22554,
      name: "greenBox",
      needforklift: false,
      inPlace: false,
    },
    {
      id: 66698,
      name: "blueBox",
      needforklift: true,
      inPlace: false,
    },
    {
      id: 78544,
      name: "redBox",
      needforklift: false,
      inPlace: false,
    },
    {
      id: 69875,
      name: "redBox",
      needforklift: false,
      inPlace: false,
    },
  ]);

  const addEmployies = (employieCode, employieName, employieForklift) => {
    if (employieCode.length > 5 || employieCode.length < 5) {
      return;
    }
    if (
      /\d/g.test(employieName) ||
      employieName.length < 4 ||
      !/\s/.test(employieName)
    ) {
      return;
    }

    let newArr = [];
    newArr.push(...employies, {
      employieCode: employieCode,
      employieName: employieName,
      employieForklift,
      count: 0,
    });
    setEmployies(newArr);
  };
  // set an object that contains the emplyoies code and index .
  // in the futute i will use this object on the welcome page to compare the employies.
  const emplyoiesLogin = (noCode, index) => {
    setChoosenEmployie({ noCode, index });
  };

  function changePro(id, i) {
    debugger;
    if (products[i].needforklift === true) {
      if (employies[choosenEmployie.index].employieForklift === "no") {
        alert("You need to have forklift license");
        return;
      }
    }
    setProducts(
      products.map((product) =>
        product.id == id ? { ...product, inPlace: !product.inPlace } : product
      )
    );
    setEmployies(
      employies.map((employie, index) =>
        index == choosenEmployie.index
          ? { ...employie, count: employie.count + 1 }
          : employie
      )
    );
  }

  return (
    <div className="login">
      <Router>
        <Link to="/">
          <h1>Logistics Management</h1>
        </Link>
        <Switch>
          <Route
            exact
            path="/"
            component={() => {
              return <Home />;
            }}
          />
          <Route
            exact
            path="/signup"
            component={() => {
              return (
                <Signup
                  addEmployies={addEmployies}
                  choosenEmployie={choosenEmployie}
                />
              );
            }}
          />
          <Route
            exact
            path="/login"
            component={() => {
              return (
                <Login emplyoiesLogin={emplyoiesLogin} employies={employies} />
              );
            }}
          />
          <Route
            exact
            path="/Welcome"
            component={() => {
              return (
                <Welcome
                  employies={employies}
                  choosenEmployie={choosenEmployie}
                  products={products}
                  changePro={changePro}
                />
              );
            }}
          />
          <Route
            exact
            path="/Manager"
            component={() => {
              return (
                <Manager
                  employies={employies}
                  choosenEmployie={choosenEmployie}
                />
              );
            }}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
