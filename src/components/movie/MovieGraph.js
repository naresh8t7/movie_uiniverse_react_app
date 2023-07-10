import React from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3'

let FORCE;
FORCE = (function (nsp) {

    const width = 1080,
        height = 250,
        // eslint-disable-next-line
        color = d3.scaleOrdinal(d3.schemeCategory10),

        initForce = (nodes, links) => {
            nsp.force = d3.forceSimulation(nodes)
                .force("charge", d3.forceManyBody().strength(-200))
                .force("link", d3.forceLink(links).distance(70))
                .force("center", d3.forceCenter().x(nsp.width / 2).y(nsp.height / 2))
                .force("collide", d3.forceCollide([5]).iterations([5]));
        },

        enterNode = (selection) => {
            // eslint-disable-next-line
            const circle = selection.select('circle')
                .attr("r", 25)
                .style("fill", 'tomato')
                .style("stroke", "bisque")
                .style("stroke-width", "3px")

            selection.select('text')
                .style("fill", "honeydew")
                .style("font-weight", "600")
                .style("text-transform", "uppercase")
                .style("text-anchor", "middle")
                .style("alignment-baseline", "middle")
                .style("font-size", "10px")
                .style("font-family", "cursive")
        },

        updateNode = (selection) => {
            selection
                .attr("transform", (d) => "translate(" + d.x + "," + d.y + ")")
                .attr("cx", function (d) {
                    return d.x = Math.max(30, Math.min(width - 30, d.x));
                })
                .attr("cy", function (d) {
                    return d.y = Math.max(30, Math.min(height - 30, d.y));
                })
        },

        enterLink = (selection) => {
            selection
                .attr("stroke-width", 3)
                .attr("stroke", "bisque")
        },

        updateLink = (selection) => {
            selection
                .attr("x1", (d) => d.source.x)
                .attr("y1", (d) => d.source.y)
                .attr("x2", (d) => d.target.x)
                .attr("y2", (d) => d.target.y);
        },

        updateGraph = (selection) => {
            selection.selectAll('.node')
                .call(updateNode)
            selection.selectAll('.link')
                .call(updateLink);
        },

        dragStarted = (d) => {
            if (!d3.event.active) nsp.force.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y
        },

        dragging = (d) => {
            d.fx = d3.event.x;
            d.fy = d3.event.y
        },

        dragEnded = (d) => {
            if (!d3.event.active) nsp.force.alphaTarget(0);
            d.fx = null;
            d.fy = null
        },

        drag = () => d3.selectAll('g.node')
            .call(d3.drag()
                .on("start", dragStarted)
                .on("drag", dragging)
                .on("end", dragEnded)
            ),

        tick = (that) => {
            that.d3Graph = d3.select(ReactDOM.findDOMNode(that));
            nsp.force.on('tick', () => {
                that.d3Graph.call(updateGraph)
            });
        };

    nsp.width = width;
    nsp.height = height;
    nsp.enterNode = enterNode;
    nsp.updateNode = updateNode;
    nsp.enterLink = enterLink;
    nsp.updateLink = updateLink;
    nsp.updateGraph = updateGraph;
    nsp.initForce = initForce;
    nsp.dragStarted = dragStarted;
    nsp.dragging = dragging;
    nsp.dragEnded = dragEnded;
    nsp.drag = drag;
    nsp.tick = tick;

    return nsp
// eslint-disable-next-line
})(FORCE || {});

class MovieGraph extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            addLinkArray: [],
            name: "",
            nodes: this.props.movies,
            links:
                []
        }
    }

    componentDidMount() {
        const data = this.state;
        FORCE.initForce(data.nodes, data.links)
        FORCE.tick(this)
        FORCE.drag()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.nodes !== this.state.nodes || prevState.links !== this.state.links) {
            const data = this.state;
            FORCE.initForce(data.nodes, data.links)
            FORCE.tick(this)
            FORCE.drag()
        }
    }

    render() {
            const links = this.state.links.map((link) => {
                return (
                    <Link
                        key={link.id}
                        data={link}
                    />);
            });
            const nodes = this.state.nodes.map((node) => {
                return (
                    <Node
                        data={node}
                        name={node.title}
                        key={node.id}
                    />);
            });
            return (
            <div className="graph__container">
                <svg className="graph" width={FORCE.width} height={FORCE.height}>
                    <g>
                        {links}
                    </g>
                    <g>
                        {nodes}
                    </g>
                </svg>
            </div>
        );
    }
}

class Node extends React.Component {

    componentDidMount() {
        this.d3Node = d3.select(ReactDOM.findDOMNode(this))
            .datum(this.props.data)
            .call(FORCE.enterNode)
    }

    componentDidUpdate() {
        this.d3Node.datum(this.props.data)
            .call(FORCE.updateNode)
    }

    render() {
        return (
            <g className='node'>
                <circle onClick={this.props.addLink}/>
                <text>{this.props.data.title}</text>
            </g>
        );
    }
}

class Link extends React.Component {

    componentDidMount() {
        this.d3Link = d3.select(ReactDOM.findDOMNode(this))
            .datum(this.props.data)
            .call(FORCE.enterLink);
    }

    componentDidUpdate() {
        this.d3Link.datum(this.props.data)
            .call(FORCE.updateLink);
    }

    render() {
        return (
            <line className='link' />
        );
    }
}

export default MovieGraph;
