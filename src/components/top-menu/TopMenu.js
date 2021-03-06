import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './top-menu.css';
import ReactTooltip from 'react-tooltip';

class TopMenu extends Component {
    static propTypes = {
        onUndoClick: PropTypes.func,
        onRedoClick: PropTypes.func,
        fillColor: PropTypes.object,
        strokeColor: PropTypes.object,
        onButtonSelect: PropTypes.func,
        onAllignmentClick: PropTypes.func,
        onGroupClick: PropTypes.func,
        onUngroupClick: PropTypes.func,
        onMoveBackward: PropTypes.func,
        onMoveForward: PropTypes.func,
        onSendToBack: PropTypes.func,
        onBringToFront: PropTypes.func,
        onFlipHorizontal: PropTypes.func,
        onFlipVertical: PropTypes.func,
        onToggleGridSnapping: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.handleUndoClick = this.handleUndoClick.bind(this);
        this.handleRedoClick = this.handleRedoClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleButtonSelect = this.handleButtonSelect.bind(this);
        this.handleAlignmentClick = this.handleAlignmentClick.bind(this);
        this.handleGroupClick = this.handleGroupClick.bind(this);
        this.handleUngroupClick = this.handleUngroupClick.bind(this);
        this.handleMoveBackward = this.handleMoveBackward.bind(this);
        this.handleMoveForward = this.handleMoveForward.bind(this);
        this.handleSendToBack = this.handleSendToBack.bind(this);
        this.handleBringToFront = this.handleBringToFront.bind(this);
        this.handleFlipHorizontal = this.handleFlipHorizontal.bind(this);
        this.handleFlipVertical = this.handleFlipVertical.bind(this);
        this.handleToggleGridSnapping = this.handleToggleGridSnapping.bind(this);
    }

    handleUndoClick() {
        this.props.onUndoClick();
    }

    handleRedoClick() {
        this.props.onRedoClick();
    }

    handleToggleGridSnapping(event) {
        this.props.onToggleGridSnapping();
    }

    handleGroupClick() {
        this.props.onGroupClick();
    }

    handleUngroupClick() {
        this.props.onUngroupClick();
    }

    handleMoveForward() {
        this.props.onMoveForward();
    }

    handleMoveBackward() {
        this.props.onMoveBackward();
    }

    handleBringToFront() {
        this.props.onBringToFront();
    }

    handleSendToBack() {
        this.props.onSendToBack();
    }

    handleFlipHorizontal() {
        this.props.onFlipHorizontal();
    }

    handleFlipVertical() {
        this.props.onFlipVertical();
    }

    handlePaletteSelect(event) {
        // this.props.onPaletteSelect(paletteName);
        // where paletteName is a string (verified on backend)
    }

    handleChange(event) {
        this.tempScale = event.target.value / 100.0;
    }

    handleAlignmentClick(event) {
        let id = event.target.id;
        if (!id) {
            id = event.target.firstChild.id;
        }
        this.props.onAllignmentClick(id);
    }

    handleButtonSelect(color, button) {
        this.props.onButtonSelect({color, button});
    }

    render() {
        const { fillColor, strokeColor } = this.props;
        const fillStyle = {
            backgroundColor: `rgba(${fillColor.r}, ${fillColor.g}, ${fillColor.b}, ${fillColor.a} )` // this.props.fillColor
        };
        const strokeStyle = {
            backgroundColor: `rgba(${strokeColor.r}, ${strokeColor.g}, ${strokeColor.b}, ${strokeColor.a} )` // this.props.strokeColor
        };
        return (
            <div id="top-bar">
                <ReactTooltip className="tooltip-style" effect="solid" />
                <button onClick={this.handleUndoClick} data-tip="Undo">
                    <img src="./assets/undo.svg" alt="undo" id="button-icon" />
                </button>
                <button onClick={this.handleRedoClick} data-tip="Redo">
                    <img src="./assets/redo.svg" alt="redo" id="button-icon" />
                </button>

                <form id="fill-toggle" >
                    <input type="radio" name="toggle" value="fill" id="fill" defaultChecked />
                    <label htmlFor="fill" style={fillStyle} onClick={() => { this.handleButtonSelect(fillColor, "fill"); }} />
                    <p>Fill</p>
                    <span />
                    <input type="radio" name="toggle" value="stroke" id="stroke" />
                    <label htmlFor="stroke" style={strokeStyle} onClick={() => { this.handleButtonSelect(strokeColor, "stroke"); }} />
                    <p>Stroke</p>
                </form>
                <button onClick={this.handleGroupClick} data-tip="Group">
                    <img src="./assets/group.svg" alt="group" id="button-icon" />
                </button>
                <button onClick={this.handleUngroupClick} data-tip="Ungroup">
                    <img src="./assets/ungroup.svg" alt="ungroup" id="button-icon" />
                </button>
                <button onClick={this.handleMoveForward} data-tip="Bring Forward">
                    <img src="./assets/upone.svg" alt="upone" id="button-icon" />
                </button>
                <button onClick={this.handleMoveBackward} data-tip="Send Backward">
                    <img src="./assets/backone.svg" alt="downone" id="button-icon" />
                </button>
                <button onClick={this.handleSendToBack} data-tip="Send to Back">
                    <img src="./assets/SendToBack.svg" alt="backall" id="button-icon" />
                </button>
                <button onClick={this.handleBringToFront} data-tip="Bring to Front">
                    <img src="./assets/BringToFront.svg" alt="frontall" id="button-icon" />
                </button>
                <button onClick={this.handleFlipHorizontal} data-tip="Flip Horizontal">
                    <img src="./assets/flip-horz.svg" alt="frontall" id="button-icon" />
                </button>
                <button onClick={this.handleFlipVertical} data-tip="Flip Vertical">
                    <img src="./assets/flip-vert.svg" alt="frontall" id="button-icon" />
                </button>
                <button onClick={this.handleToggleGridSnapping} id="button-icon" data-tip="Grid Snap">
                    <img src="./assets/gridsnap.svg" alt="grid snap" id="button-icon" />
                </button>
                <button onClick={this.handleAlignmentClick} data-tip="Center Align">
                    <img src="./assets/center-alignment.svg" alt="center-alignment" id="alignment-vertical" />
                </button>
                <button onClick={this.handleAlignmentClick} data-tip="Vertical Align">
                    <img src="./assets/vertical-alignment.svg" alt="vertical-alignment" id="alignment-horizontal" />
                </button>
                <button onClick={this.handleAlignmentClick} data-tip="Left Align">
                    <img src="./assets/left-alignment.svg" alt="left-alignment" id="alignment-left" />
                </button>
                <button onClick={this.handleAlignmentClick} data-tip="Right Align">
                    <img src="./assets/right-alignment.svg" alt="right-alignment" id="alignment-right" />
                </button>
                <button onClick={this.handleAlignmentClick} data-tip="Bottom Align">
                    <img src="./assets/vertical-alignment-1.svg" alt="vertical-alignment-1" id="alignment-bottom" />
                </button>
                <button onClick={this.handleAlignmentClick} data-tip="Top Align">
                    <img src="./assets/vertical-alignment-2.svg" alt="vertical-alignment-2" id="alignment-top" />
                </button>
            </div>
        );
    }
}

export default TopMenu;
