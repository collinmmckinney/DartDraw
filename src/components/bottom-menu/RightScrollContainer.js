import { connect } from 'react-redux';
import RightScroll from './RightScroll';
import { scroll } from './../../actions/canvas';

const mapStateToProps = ({ drawingState }) => {
    const { panX, panY, canvasHeight, ruler, scale } = drawingState;
    const maxPanY = canvasHeight - (window.innerHeight - ruler.width - 45) / scale;
    return {
        panX,
        panY,
        maxPanY,
        canvasHeight
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onScroll: (deltaX, deltaY) => {
            dispatch(scroll(deltaX, deltaY));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RightScroll);
