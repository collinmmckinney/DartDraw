import { connect } from 'react-redux';
import {
    editShape,
    alignmentClick,
    groupButtonClick,
    ungroupButtonClick,
    moveBackward,
    moveForward,
    sendToBack,
    flipHorizontal,
    flipVertical,
    bringToFront,
    toggleGridSnapping,
    zoomIn,
    zoomOut,
    customZoom,
    toggleShowGrid,
    toggleShowRulers,
    toggleShowSubDivisions,
    setUnitType,
    setRulerExponent
} from '../../actions/menu';
import ContextualMenu from './ContextualMenu';

const mapStateToProps = ({ drawingState }) => {
    const { shapes, selected } = drawingState;
    return {
        selectedShape: shapes.byId[selected[0]],
        scale: drawingState.scale,
        ruler: drawingState.ruler,
        exponentList: [0, 1, 2, 3, 4, 5, 6]
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        editShape: (shape) => {
            dispatch(editShape(shape));
        },
        onAllignmentClick: (id) => {
            dispatch(alignmentClick(id));
        },
        onGroupClick: () => {
            dispatch(groupButtonClick());
        },
        onUngroupClick: () => {
            dispatch(ungroupButtonClick());
        },
        onMoveBackward: () => {
            dispatch(moveBackward());
        },
        onMoveForward: () => {
            dispatch(moveForward());
        },
        onSendToBack: () => {
            dispatch(sendToBack());
        },
        onBringToFront: () => {
            dispatch(bringToFront());
        },
        onFlipHorizontal: () => {
            dispatch(flipHorizontal());
        },
        onFlipVertical: () => {
            dispatch(flipVertical());
        },
        onToggleGridSnapping: () => {
            dispatch(toggleGridSnapping());
        },
        onZoomIn: () => {
            dispatch(zoomIn());
        },
        onZoomOut: () => {
            dispatch(zoomOut());
        },
        onCustomZoom: (customScale) => {
            dispatch(customZoom(customScale));
        },
        onShowGrid: () => {
            dispatch(toggleShowGrid());
        },
        onShowRulers: () => {
            dispatch(toggleShowRulers());
        },
        onShowSubDivisions: () => {
            dispatch(toggleShowSubDivisions());
        },
        onSetUnitType: (unitType) => {
            dispatch(setUnitType(unitType));
        },
        onSetRulerExponent: (exponent) => {
            dispatch(setRulerExponent(exponent));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContextualMenu);
