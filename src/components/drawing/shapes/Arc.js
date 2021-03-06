import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Path } from '.';

class Arc extends Component {
    static propTypes = {
        id: PropTypes.string,
        onDragStart: PropTypes.func,
        onDrag: PropTypes.func,
        onDragStop: PropTypes.func,
        onClick: PropTypes.func,
        points: PropTypes.arrayOf(PropTypes.number),
        rx: PropTypes.number,
        ry: PropTypes.number,
        largeArc: PropTypes.number,
        flipArc: PropTypes.bool,
        stroke: PropTypes.string,
        strokeWidth: PropTypes.number,
        fill: PropTypes.string,
        transform: PropTypes.arrayOf(PropTypes.shape({
            command: PropTypes.string,
            parameters: PropTypes.arrayOf(PropTypes.number)
        })),
        propagateEvents: PropTypes.bool
    }

    defaultProps = {
        propagateEvents: false
    }

    constructor(props) {
        super(props);

        this.handleDragStart = this.handleDragStart.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
        this.handleDragStop = this.handleDragStop.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleDragStart(id, draggableData) {
        const { onDragStart } = this.props;
        onDragStart && onDragStart(id, draggableData);
    }

    handleDrag(id, draggableData) {
        const { onDrag } = this.props;
        onDrag && onDrag(id, draggableData);
    }

    handleDragStop(id, draggableData) {
        const { onDragStop } = this.props;
        onDragStop && onDragStop(id, draggableData);
    }

    handleClick(id, event) {
        const { onClick } = this.props;
        onClick && onClick(id, event);
    }

    render() {
        const { id, points, rx, ry, stroke, largeArc, flipArc, strokeWidth, transform, propagateEvents } = this.props;
        const svgProps = {
            d: [{command: 'M', parameters: [points[0], points[1]]}, {command: 'A', parameters: [rx, ry, 0, largeArc, 1, points[2], points[3]]}],
            stroke,
            strokeWidth,
            transform
        };

        if (flipArc) {
            svgProps.d = [{command: 'M', parameters: [points[0], points[1]]}, {command: 'A', parameters: [rx, ry, 0, -largeArc + 1, 0, points[2], points[3]]}];
        }

        return (
            <Path
                id={id}
                onDragStart={this.handleDragStart}
                onDrag={this.handleDrag}
                onDragStop={this.handleDragStop}
                onClick={this.handleClick}
                {...svgProps}
                propagateEvents={propagateEvents}
            />
        );
    }
}

export default Arc;
