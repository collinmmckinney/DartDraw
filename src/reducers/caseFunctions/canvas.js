import { addRectangle, addLine, removeShape, resizeShape, moveLineAnchor, removeNegatives } from '../utilities/shapes';
import { selectShape, updateSelectionBoxes } from '../utilities/selection';
import { pan } from '../caseFunctions/zoom';

export function dragStart(stateCopy, action, root) {
    stateCopy.editInProgress = true;
    stateCopy.lastSavedShapes = root.drawingState.shapes;
    const scale = stateCopy.canvasWidth / stateCopy.viewBox[2];
    switch (root.menuState.toolType) {
        case "rectangleTool":
            stateCopy.shapes = addRectangle(stateCopy.shapes, action, root.menuState.color, stateCopy.viewBox, scale);
            let shapeIds = stateCopy.shapes.allIds;
            let addedShapeId = shapeIds[shapeIds.length - 1];
            stateCopy.selected = selectShape(stateCopy.selected, addedShapeId);
            break;
        case "lineTool":
            stateCopy.shapes = addLine(stateCopy.shapes, action, root.menuState.color, stateCopy.viewBox, scale);
            shapeIds = stateCopy.shapes.allIds;
            addedShapeId = shapeIds[shapeIds.length - 1];
            stateCopy.selected = selectShape(stateCopy.selected, addedShapeId);
            break;
        case "selectTool":
            stateCopy.selected = selectShape([], null);
            break;
        default: break;
    }
    return stateCopy;
}

export function drag(stateCopy, action, root) {
    const { draggableData } = action.payload;
    const scale = stateCopy.canvasWidth / stateCopy.viewBox[2];
    switch (root.menuState.toolType) {
        case "rectangleTool":
            stateCopy.shapes = resizeShape(stateCopy.shapes, stateCopy.selected, draggableData, 1, scale);
            break;
        case "lineTool":
            stateCopy.shapes = moveLineAnchor(stateCopy.shapes, stateCopy.selected, draggableData, scale);
            break;
        case "panTool":
            stateCopy.viewBox = pan(stateCopy, stateCopy.viewBox, draggableData, scale);
            break;
        default: break;
    }
    return stateCopy;
}

export function dragStop(stateCopy, action, root) {
    switch (root.menuState.toolType) {
        case "rectangleTool":
            let shapeIds = stateCopy.shapes.allIds;
            let addedShapeId = shapeIds[shapeIds.length - 1];
            if (Math.abs(stateCopy.shapes.byId[addedShapeId].width) < 1 ||
                Math.abs(stateCopy.shapes.byId[addedShapeId].height) < 1) {
                stateCopy.shapes = removeShape(stateCopy.shapes, addedShapeId);
                stateCopy.selected = selectShape([], null);
            }
            stateCopy.shapes = removeNegatives(stateCopy.shapes, stateCopy.selected);

            break;
        case "lineTool":
            shapeIds = stateCopy.shapes.allIds;
            addedShapeId = shapeIds[shapeIds.length - 1];
            let line = stateCopy.shapes.byId[addedShapeId];
            if (line.x1 === line.x2 && line.y1 === line.y2) {
                stateCopy.shapes = removeShape(stateCopy.shapes, addedShapeId);
                stateCopy.selected = selectShape([], null);
            }
            break;
        default:
            break;
    }
    stateCopy.editInProgress = false;
    return stateCopy;
}

export function handleBoundingBoxUpdate(stateCopy, action, root) {
    const { boundingBoxes } = action.payload;
    stateCopy.boundingBoxes = boundingBoxes;
    stateCopy.selectionBoxes = updateSelectionBoxes(stateCopy.selected, stateCopy.shapes, stateCopy.selectionBoxes, stateCopy.boundingBoxes);
    return stateCopy;
}
