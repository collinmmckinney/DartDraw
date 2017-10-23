import jsondiffpatch from 'jsondiffpatch';
import * as canvasActions from './../actions/canvas';
import * as menuActions from './../actions/menu';
import * as canvas from './caseFunctions/canvas';
import * as shape from './caseFunctions/shape';
import * as menu from './caseFunctions/menu';
import * as zoom from './caseFunctions/zoom';
import { deepCopy } from './utilities/object';

const initialState = {
    shapes: {
        byId: {},
        allIds: []
    },
    selected: [],
    selectionBoxes: {},
    lastSavedShapes: {},
    editInProgress: false,
    canvasTransformationMatrix: [1, 0, 0, 1, 0, 0],
    canvasHeight: 840,
    canvasWidth: 1400,
    zoomShape: null,
    past: [],
    future: []
};

function drawingState(state = initialState, action, root) {
    const stateCopy = deepCopy(state);
    let updatedState = stateCopy;

    switch (action.type) {
        case canvasActions.CANVAS_DRAG_START:
            updatedState = canvas.dragStart(stateCopy, action, root);
            break;
        case canvasActions.CANVAS_DRAG:
            updatedState = canvas.drag(stateCopy, action, root);
            break;
        case canvasActions.CANVAS_DRAG_STOP:
            updatedState = canvas.dragStop(stateCopy, action, root);
            break;
        case canvasActions.SHAPE_DRAG_START:
            updatedState = shape.dragStart(stateCopy, action, root);
            break;
        case canvasActions.SHAPE_CLICK:
            updatedState = shape.click(stateCopy, action, root);
            break;
        case canvasActions.SHAPE_DRAG:
            updatedState = shape.drag(stateCopy, action, root);
            break;
        case canvasActions.SHAPE_DRAG_STOP:
            updatedState = shape.dragStop(stateCopy, action, root);
            break;
        case canvasActions.HANDLE_DRAG_START:
            updatedState = shape.handleDragStart(stateCopy, action, root);
            break;
        case canvasActions.HANDLE_DRAG:
            updatedState = shape.handleDrag(stateCopy, action, root);
            break;
        case canvasActions.HANDLE_DRAG_STOP:
            updatedState = shape.handleDragStop(stateCopy, action, root);
            break;
        case menuActions.SELECT_COLOR:
            updatedState = shape.setColor(stateCopy, action, root);
            break;
        case menuActions.BRING_FRONT:
            updatedState = shape.bringFront(stateCopy, action, root);
            break;
        case menuActions.SEND_BACK:
            updatedState = shape.sendBack(stateCopy, action, root);
            break;
        case menuActions.GROUP_BUTTON_CLICK:
            updatedState = menu.groupButtonClick(stateCopy, action, root);
            break;
        case menuActions.UNDO_CLICK:
            updatedState = menu.undoClick(stateCopy, action, root);
            break;
        case menuActions.REDO_CLICK:
            updatedState = menu.redoClick(stateCopy, action, root);
            break;
        case menuActions.ZOOM_IN:
            updatedState = zoom.zoomIn(stateCopy, action, root);
            break;
        case menuActions.ZOOM_OUT:
            updatedState = zoom.zoomOut(stateCopy, action, root);
            break;
        default: break;
    }

    if (action.type !== menuActions.UNDO_CLICK && action.type !== menuActions.REDO_CLICK) {
        if (!updatedState.editInProgress) {
            let delta;
            if (state.editInProgress) {
                delta = jsondiffpatch.create().diff(state.lastSavedShapes, updatedState.shapes);
            } else {
                delta = jsondiffpatch.create().diff(state.shapes, updatedState.shapes);
                updatedState.lastSavedShapes = null;
            }
            if (delta !== undefined) {
                updatedState.future = [];
                updatedState.past.push(delta);
            }
        }
    }
    return updatedState;
}

export default drawingState;
