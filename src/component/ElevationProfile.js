import React, {useEffect, useRef, useState} from 'react';
import {
    area,
    axisBottom,
    axisRight,
    axisLeft,
    bisector,
    line,
    pointer,
    scaleLinear,
    select,
} from 'd3';
import {formatDuration} from "../utils/timeUtils";

export const ElevationProfile = ({ data, selectedData, widthIn, heightIn }) => {
    const svgRef = useRef();
    const margin = { top: 20, right: 60, bottom: 20, left: 60 };

    const [width, setWidth] = useState(widthIn - margin.left - margin.right);
    const [height, setHeight] = useState(heightIn - margin.top - margin.bottom);

    useEffect(() => {
        setWidth(widthIn - margin.left - margin.right)
        setHeight(heightIn - margin.top - margin.bottom)
        const minDistance = Math.min(...data.map((o) => o.distance));
        const maxDistance = Math.max(...data.map((o) => o.distance));
        const minElevation = Math.min(...data.map((o) => o.elevation));
        const maxElevation = Math.max(...data.map((o) => o.elevation));
        const minPace = Math.min(...data.map((o) => o.pace));
        const maxPace = Math.max(...data.map((o) => o.pace));

        const svg = select(svgRef.current);

        svg.select('.chart').remove();

        // add chart area
        const chart = svg
            .append('g')
            .attr('class', 'chart')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        // scales
        const xScale = scaleLinear().domain([minDistance, maxDistance]).range([0, width]);

        const maxElevationSelected = minElevation + Math.max(maxElevation - minElevation, 100)
        const yScale = scaleLinear().domain([minElevation, maxElevationSelected]).range([height, 0]);

        const yScalePace = scaleLinear().domain([maxPace, minPace]).range([height, 0]);

        // axes
        const xAxis = axisBottom(xScale).ticks(Math.ceil(maxDistance / 1000)).tickFormat(d => (d / 1000).toFixed(0) + ' km');

        chart
            .append('g')
            .attr('transform', `translate(0,${height})`)
            .attr('class', 'x-axis')
            .call(xAxis);

        const yAxis = axisLeft(yScale).ticks(Math.ceil(maxElevationSelected / 100)).tickFormat(d => d.toFixed(0) + ' m')
        const yAxisPace = axisRight(yScalePace).ticks(4).tickFormat(d => formatDuration(d*60) + '/km');

        chart.append('g')
            .attr('class', 'y-axis')
            .call(yAxis)

        chart.append('g')
            .attr('class', 'y-axis-pace')
            .attr('transform', `translate(${width}, 0)`) // adjust the position of the pace axis
            .call(yAxisPace);

        xAxis.tickSize(height).tickFormat('').tickPadding(10);
        yAxis.tickSize(-width).tickFormat('').tickPadding(10)

        // add grid lines
        chart.append('g')
            .attr('class', 'x-axis-grid')
            .call(xAxis)
            .selectAll('line')
            .attr('opacity', 0.1);

        chart.append('g')
            .attr('class', 'y-axis')
            .call(yAxis)
            .selectAll('line')
            .attr('opacity', 0.1);

        // line generator
        const myLine = line().x((d) => xScale(d.distance)).y((d) => yScale(d.elevation));

        const myLinePace = line()
            .x((d) => xScale(d.distance))
            .y((d) => yScalePace(d.pace));

        // area generator
        const myArea = area()
            .x((d) => xScale(d.distance))
            .y0(yScale(minElevation))
            .y1((d) => yScale(d.elevation));

        // drawing the line and the area
        chart
            .selectAll('.line')
            .data([data])
            .join('path')
            .attr('class', 'line')
            .attr('d', myLine)
            .attr('fill', 'none')
            .attr('stroke', '#00bfa6');

        chart
            .selectAll('.area')
            .data([data])
            .join('path')
            .attr('class', 'area')
            .attr('d', myArea)
            .attr('fill', '#00bfa6')
            .attr('opacity', 0.5);

        chart
            .selectAll('.line-pace')
            .data([data])
            .join('path')
            .attr('class', 'line-pace')
            .attr('d', myLinePace)
            .attr('fill', 'none')
            .attr('stroke', '#ff5722');

        // vertical line
        const lineGroup = chart.append('g').attr('class', 'cursor-line');
        const lineObj = lineGroup.append('line').attr('stroke', 'black').attr('x1', 0).attr('x2', 0).attr('y1', 0).attr('y2', height);

        const textObj = lineGroup.append('text')
            .attr('x', 0)
            .attr('y', -10)
            .attr('text-anchor', 'middle');

        svg.on('mousemove', function (event, d) {
            const [x, y] = pointer(event);
            const index = bisector(d => d.distance).center(data, xScale.invert(x- margin.left)); // get index of closest data point to current mouse position on x-axis
            const hoverData = data[index];

            // update vertical line position and text
            //console.log(hoverData);
            if(index === 0) {
                lineObj.attr('x1', 0).attr('x2', 0);
                textObj.attr('x', 0).text(hoverData.elevation.toFixed(2));
            }else if(index === data.length - 1) {
                lineObj.attr('x1', width).attr('x2', width);
                textObj.attr('x', width).text(hoverData.elevation.toFixed(2));
            }else{
                lineObj.attr('x1', x - margin.left).attr('x2', x - margin.left);
                textObj.attr('x', x - margin.left).text(hoverData.elevation.toFixed(2));

                selectedData(hoverData); // log closest data point
            }
        })
    }, [data, widthIn, heightIn])

    return <svg ref={svgRef} width={widthIn} height={heightIn}>
        <g className="x-axis"/>
        <g className="y-axis"/>
    </svg>;
};
