import React, { useState, useEffect } from "react";
import Tree from "react-d3-tree";
import Layout from "../componenets/layout/header";

export default function TreeViewer() {
  //  treeData --> treedata.name --> treedata.name.children

  const [treeData, settreeData] = useState([
    {
      name: "1",
      children: [
        {
          name: "43",

          attributes: {
            Visit: "2",
          },
          children: [
            {
              name: "57",
              attributes: {
                Visit: "1",
              },
            },

            {
              name: "79",
            },
          ],
        },
        {
          name: "57",
          size: 4000,
          attributes: {
            swapped: "with 43",
          },
        },
      ],
    },
  ]);
  useEffect(() => {
    console.log("called");
  }, [treeData]);

  return (
    <Layout>
      <h2> Tree </h2>
      <div id='treeWrapper' style={{ width: "50em", height: "20em" }}>
        <Tree data={treeData} orientation='vertical' useCollapseData='false' />
      </div>
    </Layout>
  );
}
