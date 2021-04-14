import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Achievements from "./pages/Achievements";
import BinaryTreeTraversal from "./pages/BinaryTreeTraversal";
import BubbleSort from "./pages/bubbleSort";
import CPUScheduling from "./pages/CPUScheduling";
import DiskScheduling from "./pages/DiskScheduling";
import GraphingAlgorithm from "./pages/GraphingAlgorithm";
import Login from "./pages/Login";
import PageReplacement from "./pages/PageReplacement";
import Register from "./pages/Register";
import RoundRobin from "./pages/roundRobin";
import Sorting from "./pages/Sorting";
import Tree from "./pages/treeViewer";
import Welcome from "./pages/Welcome";

function App() {
  return (
    <div className='App'>
      <BrowserRouter basename={"/"}>
        <Route path='/' exact component={Welcome} />
        <Route path='/CpuScheduling' exact component={CPUScheduling} />
        <Route path='/tree' exact component={Tree} />
        <Route path='/bubblesort' exact component={BubbleSort} />
        <Route path='/PageReplacement' exact component={PageReplacement} />
        <Route path='/GraphingAlgorithm' exact component={GraphingAlgorithm} />
        <Route path='/RoundRobin' exact component={RoundRobin} />
        <Route path='/FCFSDisk' exact component={DiskScheduling} />
        <Route path='/Login' exact component={Login} />
        <Route path='/Sorting' exact component={Sorting} />
        <Route
          path='/BinaryTreeTraversal'
          exact
          component={BinaryTreeTraversal}
        />
        <Route path='/Achievements' exact component={Achievements} />
        <Route path='/Register' exact component={Register} />
      </BrowserRouter>
    </div>
  );
}

export default App;
