import React from 'react';
import './App.css';
import { BrowserRouter, Route} from "react-router-dom";
import  BubbleSort  from "./pages/bubbleSort";
import  CPUScheduling  from "./pages/CPUScheduling";
import RoundRobin from "./pages/roundRobin"
import Tree from "./pages/treeViewer";
import PageReplacement from "./pages/PageReplacement";
import DiskScheduling from "./pages/DiskScheduling";
import GraphingAlgorithm from "./pages/GraphingAlgorithm";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Sorting from "./pages/Sorting"
import BinaryTreeTraversal from "./pages/BinaryTreeTraversal";
import Achievements from "./pages/Achievements";
import Register from "./pages/Register";
import ValidatedLoginForm from "./ValidatedLoginForm";

function App() {
  return (
    <div className="App">
    <BrowserRouter>
        <Route path="/bubblesort" exact  component={BubbleSort} />
        <Route path="/" exact component={Welcome} />
        <Route path="/CpuScheduling" exact component={CPUScheduling}/>
        <Route path="/tree" exact component={Tree}/>
        <Route path="/PageReplacement" exact component={PageReplacement}/>
        <Route path="/GraphingAlgorithm" exact component={GraphingAlgorithm} />
        <Route path="/RoundRobin" exact component={RoundRobin}/>
        <Route path="/FCFSDisk" exact component={DiskScheduling} />
        <Route path="/Login" exact component={Login}/>
        <Route path="/Sorting" exact component={Sorting}/>
        <Route path="/BinaryTreeTraversal" exact component={BinaryTreeTraversal} />
        <Route path="/Achievements" exact component={Achievements} />
        <Route path="/Register" exact component={Register} />
    </BrowserRouter>



    <h1>Validated Login Form</h1>
      <ValidatedLoginForm />
    </div>
  );
}

export default App;
