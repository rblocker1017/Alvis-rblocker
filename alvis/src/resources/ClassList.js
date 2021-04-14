import ScheduleIcon from "@material-ui/icons/Schedule";
import SaveIcon from "@material-ui/icons/Save";
import AssessmentIcon from "@material-ui/icons/Assessment";
import NatureIcon from "@material-ui/icons/Nature";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import FileCopyIcon from "@material-ui/icons/FileCopy";
/*
This is where all of the classes are made for the sidebar
They are objects that comprise of two elements
    name - the name of the class
    data - an array of item objects for each of the algorithms
*/
const CSC130 = {
  data: [
    {
      name: "Binary Tree Traversal",
      url: "/BinaryTreeTraversal",
      logo: NatureIcon,
    },
    { name: "Graphing", url: "/GraphingAlgorithm", logo: TrendingUpIcon },
    { name: "Sorting", url: "/sorting", logo: AssessmentIcon },
  ],
  name: "CSC 130",
};
const CSC139 = {
  data: [
    { name: "CPU Scheduling ", url: "/CpuScheduling", logo: ScheduleIcon },
    { name: "Page Replacement", url: "/PageReplacement", logo: FileCopyIcon },
    { name: "Disk Scheduling", url: "/FCFSDisk", logo: SaveIcon },
  ],
  name: "CSC 139",
};
let workingClasses = [];
workingClasses.push(CSC130);
workingClasses.push(CSC139);
export default workingClasses;
