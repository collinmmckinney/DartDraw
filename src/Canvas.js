import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Canvas.css';
import Shape from './Shape';

class Canvas extends Component {
    static propTypes = {
        drawingArray: PropTypes.array,
        onCanvasClick: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.renderDrawing = this.renderDrawing.bind(this);
        this.handleCanvasClick = this.handleCanvasClick.bind(this);
    }

    handleCanvasClick(e) {
        const { offsetX, offsetY } = e.nativeEvent;
        this.props.onCanvasClick({
            height: 50,
            width: 50,
            x: offsetX,
            y: offsetY
        });
    }

    renderDrawing() {
        const { drawingArray } = this.props;
        return drawingArray.map(function(shape) {
            return (
                <Shape
                    width={shape.width}
                    height={shape.height}
                    x={shape.x}
                    y={shape.y}
                    id={shape.id}
                    key={shape.id}
                />
            );
        });
    }

    render() {
        return (
            <svg className="Canvas" height="900" width="1200" onClick={this.handleCanvasClick}>
                {this.renderDrawing()}
            </svg>
        );
    }
}

export default Canvas;
