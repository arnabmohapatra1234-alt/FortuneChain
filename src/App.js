// import React, { useState, useEffect } from "react";
// import getWeb3 from "./getWeb3";
// import Lottery from "./contracts/Lottery.json";

// import Manager from "./components/Manager";
// import BuyTickets from "./components/BuyTickets";
// import Intro from "./components/Intro";
// import "./App.css";
// import { Route, Link } from "react-router-dom";

// const App = () => {
//   const [state, setState] = useState({
//     web3: null,
//     contract: null,
//   });
//   const [address, setAddress] = useState(null);

//   useEffect(() => {
//     const init = async () => {
//       try {
//         const web3 = await getWeb3();
//         const networkId = await web3.eth.net.getId();

//         const deployedNetwork = Lottery.networks[networkId];
//         console.log("Contract Address:", deployedNetwork.address);
//         const instance = new web3.eth.Contract(
//           Lottery.abi,
//           deployedNetwork && deployedNetwork.address
//         );
//         setAddress(deployedNetwork.address);
//         setState({ web3, contract: instance });
//       } catch (error) {
//         alert("Falied to load web3 or contract.");
//         console.log(error);
//       }
//     };
//     init();
//   }, []);

//   return (
//     <>
//       <nav className="navbar navbar-expand-lg navbar">
//         <div className="container-fluid">
//           <div className="collapse navbar-collapse" id="navbarNav">
//             <ul className="navbar-nav">
//               <li className="nav-item">
//                 <Link to="/" className="nav-link navtext" aria-current="page">
//                   FortuneChain
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link
//                   to="/manager"
//                   className="nav-link navtext"
//                   aria-current="page"
//                 >
//                   Admin
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link to="/players" className="nav-link navtext">
//                   Buy Ticket
//                 </Link>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>

//       <Route exact path="/">
//         <Intro></Intro>
//       </Route>
//       <Route path="/manager">
//         <Manager state={state} />
//       </Route>
//       <Route path="/players">
//         <Buy Tickets address={address} state={state} />
//       </Route>
//     </>
//   );
// };
// export default App;
import React, { useState, useEffect } from "react";
import getWeb3 from "./getWeb3";
import Lottery from "./contracts/Lottery.json";

import Manager from "./components/Manager";
import Players from "./components/Players";
import Intro from "./components/Intro";

import {
  HashRouter as Router,
  Route,
  NavLink
} from "react-router-dom";

import "./App.css";

const App = () => {
  const [state, setState] = useState({
    web3: null,
    contract: null,
  });
  const [address, setAddress] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        const web3 = await getWeb3();
        const networkId = await web3.eth.net.getId();

console.log("Network ID =", networkId);
console.log("Lottery JSON =", Lottery);
console.log("Networks =", Lottery.networks);

const deployedNetwork = Lottery.networks[networkId];

console.log("Deployed =", deployedNetwork);

if (!deployedNetwork) {
    alert("Contract not deployed on this network");
    return;
}

const instance = new web3.eth.Contract(
    Lottery.abi,
    deployedNetwork.address
);
        setAddress(deployedNetwork.address);
        setState({ web3, contract: instance });
        const accounts = await web3.eth.getAccounts();
console.log("Accounts:", accounts);
console.log("Contract Address:", deployedNetwork.address);
      } catch (error) {
        alert("Failed to load web3 or contract");
        console.error(error);
      }
    };
    init();
  }, []);

  return (
    <Router>
      {/* ===== NAVBAR ===== */}
      <nav className="navbar">
        {/* BRAND */}
        <NavLink exact to="/" className="navbar-brand">
            Lottery Dashboard
        </NavLink>

        {/* LINKS */}
        <div>
          <NavLink
            to="/manager"
            className="navtext"
            activeClassName="active"
          >
            Manager
          </NavLink>

          <NavLink
            to="/players"
            className="navtext"
            activeClassName="active"
          >
            Buy Ticket
          </NavLink>
        </div>
      </nav>

      {/* ===== ROUTES ===== */}
      <Route exact path="/">
        <Intro />
      </Route>

      <Route path="/manager">
        <Manager state={state} />
      </Route>

     <Route path="/players">
    <Players
        state={state}
        address={address}
    />
</Route>
    </Router>
  );
};

export default App;
