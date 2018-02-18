import { connect } from 'react-redux';
import Canvas from './Canvas';
import {
    canvasDragStart,
    canvasDrag,
    canvasDragStop,
    shapeClick,
    shapeDragStart,
    shapeDrag,
    shapeDragStop,
    groupDragStart,
    groupDrag,
    groupDragStop,
    groupClick,
    handleDragStart,
    handleDrag,
    handleDragStop,
    scroll,
    updateBoundingBoxes
} from './../../actions/canvas';
import { setRulerGrid } from './../../actions/menu';

function formatShape(shape, shapes, scale) {
    const formattedShape = Object.assign({}, shape);
    if (formattedShape.type === 'group') {
        formattedShape.members = formattedShape.members.map((shapeId, i) => {
            return formatShape(shapes.byId[shapeId], shapes, scale);
        });
    } else {
        formattedShape.strokeWidth = formattedShape.strokeWidth * scale;
    }
    return formattedShape;
}

const mapStateToProps = ({ drawingState, menuState }) => {
    const { shapes, selected, canvasHeight, canvasWidth, panX, panY, scale } = drawingState;
    const { toolType } = menuState;
    const shapesArray = shapes.allIds.map((id) => {
        return formatShape(shapes.byId[id], shapes, scale);
    });

    const arrowsArray = shapes.allArrows.map((id) => {
        return formatShape(shapes.byId[shapes.byArrowId[id].id], shapes, scale);
    });

    const propagateEventTools = [
        'rectangleTool',
        'ellipseTool',
        'polygonTool',
        'bezierTool',
        'arcTool',
        'freehandPathTool',
        'lineTool',
        'textTool',
        'panTool',
        'zoomTool'
    ];

    return {
        shapes: shapesArray,
        arrows: arrowsArray,
        selected,
        canvasHeight: canvasHeight * scale,
        canvasWidth: canvasWidth * scale,
        viewBox: [panX, panY, canvasWidth, canvasHeight],
        propagateEvents: propagateEventTools.indexOf(toolType) > -1
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onDragStart: (draggableData) => {
            dispatch(canvasDragStart(draggableData));
        },
        onDrag: (draggableData) => {
            dispatch(canvasDrag(draggableData));
        },
        onDragStop: (draggableData) => {
            dispatch(canvasDragStop(draggableData));
        },
        onShapeDragStart: (shapeId, draggableData) => {
            dispatch(shapeDragStart(shapeId, draggableData));
        },
        onShapeDrag: (shapeId, draggableData) => {
            dispatch(shapeDrag(shapeId, draggableData));
        },
        onShapeDragStop: (shapeId, draggableData) => {
            dispatch(shapeDragStop(shapeId));
        },
        onShapeClick: (shapeId, event) => {
            dispatch(shapeClick(shapeId));
        },
        onGroupDragStart: (groupId, draggableData) => {
            dispatch(groupDragStart(groupId, draggableData));
        },
        onGroupDrag: (groupId, draggableData) => {
            dispatch(groupDrag(groupId, draggableData));
        },
        onGroupDragStop: (groupId, draggableData) => {
            dispatch(groupDragStop(groupId, draggableData));
        },
        onGroupClick: (groupId, event) => {
            dispatch(groupClick(groupId, event));
        },
        onHandleDragStart: (shapeId, handleIndex, draggableData) => {
            dispatch(handleDragStart(shapeId, handleIndex, draggableData));
        },
        onHandleDrag: (shapeId, handleIndex, draggableData) => {
            dispatch(handleDrag(shapeId, handleIndex, draggableData));
        },
        onHandleDragStop: (shapeId, handleIndex, draggableData) => {
            dispatch(handleDragStop(shapeId, handleIndex, draggableData));
        },
        onScroll: (deltaX, deltaY) => {
            dispatch(scroll(deltaX, deltaY));
        },
        onBoundingBoxUpdate: (boundingBoxes) => {
            dispatch(updateBoundingBoxes(boundingBoxes));
        },
        onSetRulerGrid: () => {
            dispatch(setRulerGrid());
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Canvas);
