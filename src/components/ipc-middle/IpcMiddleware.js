import React, { Component } from 'react';
import PropTypes from 'prop-types';

class IpcMiddleware extends Component {
    static propTypes = {
        // onFileSave: PropTypes.func
        // onFileOpen: PropTypes.func
        onCanvasColorChange: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.handleFileSave = this.handleFileSave.bind(this);
        this.handleFileOpen = this.handleFileOpen.bind(this);
        this.handleCanvasColorChange = this.handleCanvasColorChange.bind(this);
    }

    componentDidMount() {
        const fs = window.require('fs');
        const { ipcRenderer } = window.require('electron');

        // ipcRenderer.on('file-save', (event, arg) => {
        //     this.handleFileSave(event);
        // });

        // ipcRenderer.on('file-open', (event, data) => {
        //     this.handleFileOpen(data);
        // });

        ipcRenderer.on('canvasColorChange', (event, color) => {
            this.handleCanvasColorChange(color);
        });
    }

    handleFileSave(event) {
        // this.props.onFileSave(event);
        return;
    }

    handleFileOpen(data) {
        // this.props.onFileOpen();
        return;
    }

    handleCanvasColorChange(color) {
        this.props.onCanvasColorChange(color);
    }

    render() {
        return <div>Hello World</div>;
    }
}

export default IpcMiddleware;