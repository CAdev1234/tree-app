import { tree, select, hierarchy, linkHorizontal } from 'd3';
import React, {useRef, useEffect} from 'react';

interface TreeChartProps {
  data: object;
}

const TreeChart:React.FC<TreeChartProps> = ({data}) => {
  const svgRef = useRef(null);
  const width = 600
  const height = 600
  const treeLayout = tree().size([height, width])
  
  useEffect(() => {
    const svg = select(svgRef.current);
    svg.selectAll("*").remove();
    svg.attr("width", width).attr("height", height);
    const root = hierarchy(data);
    const paths = treeLayout(root).links();
    // const pathGenerator = linkHorizontal().x((d) => d.y).y((d) => d.x);
    // draw path
    svg
      .selectAll("path")
      .data(paths)
      .enter()
      .append("path")
      .attr("stroke", "#000")
      .attr("stroke-width", 1)
      // .attr("d", pathGenerator);

    // draw node
    svg
      .selectAll("text")
      .data(root.descendants())
      .enter()
      .append("text")
      .attr("color", "black")
      // .attr("x", (d) => d.y)
      // .attr("y", (d) => d.x)
      // .text(({data}) => data.name)
  }, [])
  return (
    <svg ref={svgRef} />
  )
}

export default TreeChart;