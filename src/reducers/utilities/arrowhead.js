import uuidv1 from 'uuid';
import { formatPoints } from '../../utilities/shapes';

export function setArrowheadType(arrowheadType) {
    var arrowhead = {};

    switch (arrowheadType) {
        case 'triangle':
            arrowhead = {
                type: 'triangle',
                // preset: 'default',
                points: [215, 55, 275, 75, 215, 95],
                fillOpacity: 1
            };
            break;
        case 'barbed':
            arrowhead = {
                type: 'barbed',
                // preset: 'default',
                points: [215, 55, 275, 75, 215, 95, 235, 75],
                fillOpacity: 1
            };
            break;
        case 'ellipse':
            arrowhead = {
                type: 'ellipse',
                // preset: 'default',
                cx: 260,
                cy: 75,
                rx: 15,
                ry: 15,
                fillOpacity: 1
            };
            break;
        case 'rectangle':
            arrowhead = {
                type: 'rectangle',
                // preset: 'default',
                x: 245,
                y: 60,
                width: 30,
                height: 30,
                fillOpacity: 1
            };
            break;
        case 'polyline':
            arrowhead = {
                type: 'polyline',
                // preset: 'default',
                points: [215, 55, 275, 75, 215, 95],
                fillOpacity: 0
            };
            break;
        default: break;
    }

    arrowhead.handles = generateHandles(arrowhead);
    arrowhead.handles = updateHandles(arrowhead);
    arrowhead = updateLengthAndRefX(arrowhead);

    return arrowhead;
}

export function setArrowheadHeight(height, arrowhead, halfHeight, editorHeight) {
    switch (arrowhead.type) {
        case "triangle":
        case "polyline":
        case "barbed":
            arrowhead.points[1] = clamp(halfHeight - height / 2, 0, halfHeight);
            arrowhead.points[5] = editorHeight - arrowhead.points[1];
            break;
        case "rectangle":
            arrowhead.y = clamp(halfHeight - height / 2, 0, halfHeight);
            arrowhead.height = clamp(height, 0, editorHeight);
            break;
        default: break;
    }

    arrowhead.handles = updateHandles(arrowhead);

    return arrowhead;
}

export function setArrowheadLength(length, arrowhead, leftBufferX, rightBufferX) {
    length = clamp(length, 0, rightBufferX - leftBufferX);

    switch (arrowhead.type) {
        case "triangle":
        case "polyline":
            arrowhead.points[0] = rightBufferX - length;
            arrowhead.points[4] = rightBufferX - length;
            break;
        case "barbed":
            const barbLength = arrowhead.points[6] - arrowhead.points[0];
            arrowhead.points[0] = rightBufferX - length;
            arrowhead.points[4] = rightBufferX - length;
            arrowhead.points[6] = clamp(arrowhead.points[0] + barbLength, leftBufferX, rightBufferX);
            break;
        case "rectangle":
            arrowhead.x = rightBufferX - length;
            arrowhead.width = length;
            break;
        default: break;
    }

    arrowhead = updateLengthAndRefX(arrowhead);
    arrowhead.handles = updateHandles(arrowhead);

    return arrowhead;
}

export function setArrowheadRadiusX(rx, arrowhead, leftBufferX, rightBufferX) {
    rx = clamp(rx, 0, (rightBufferX - leftBufferX) / 2);

    arrowhead.cx += arrowhead.rx - rx;
    arrowhead.rx = rx;

    arrowhead.handles = updateHandles(arrowhead);
    arrowhead = updateLengthAndRefX(arrowhead);

    return arrowhead;
}

export function setArrowheadRadiusY(ry, arrowhead, halfHeight) {
    ry = clamp(ry, 0, halfHeight);

    arrowhead.ry = ry;

    arrowhead.handles = updateHandles(arrowhead);

    return arrowhead;
}

export function reshape(arrowhead, draggableData, handleIndex, height, width, buffer, lockAspectRatio) {
    const { x, y, deltaX, node } = draggableData;

    let offsetLeft = 0;
    let offsetTop = 0;

    if (node) {
        offsetLeft = node.parentNode.getBoundingClientRect().left;
        offsetTop = node.parentNode.getBoundingClientRect().top;
    }

    let mouseX = x - offsetLeft;
    let mouseY = y - offsetTop;

    const leftBufferX = buffer;
    const rightBufferX = width - buffer;

    const halfHeight = height / 2;
    const halfWidth = width / 2;

    switch (arrowhead.type) {
        case 'triangle':
        case 'polyline':
            arrowhead.points[0] = clamp(mouseX, leftBufferX, rightBufferX);
            arrowhead.points[1] = clamp(mouseY, 0, height);
            arrowhead.points[4] = arrowhead.points[0];
            arrowhead.points[5] = height - arrowhead.points[1];
            break;
        case 'barbed':
            if (handleIndex === 0) {
                arrowhead.points[0] = clamp(mouseX, leftBufferX, rightBufferX);
                arrowhead.points[1] = clamp(mouseY, 0, height);
                arrowhead.points[4] = arrowhead.points[0];
                arrowhead.points[5] = height - arrowhead.points[1];
            } else if (handleIndex === 1) {
                arrowhead.points[6] = clamp(mouseX, leftBufferX, rightBufferX);
            }
            break;
        case 'ellipse':
            if (handleIndex === 0) {
                if (lockAspectRatio) {
                    arrowhead.rx = clamp(arrowhead.rx - (deltaX / 2), 0, halfHeight);
                    arrowhead.cx = clamp(arrowhead.cx + (deltaX / 2), rightBufferX - halfHeight, rightBufferX);
                    arrowhead = setArrowheadRadiusY(arrowhead.rx, arrowhead, halfHeight);
                } else {
                    arrowhead.rx = clamp(arrowhead.rx - (deltaX / 2), 0, (rightBufferX - leftBufferX) / 2);
                    arrowhead.cx = clamp(arrowhead.cx + (deltaX / 2), halfWidth, rightBufferX);
                }
            } else if (handleIndex === 1) {
                if (lockAspectRatio) {
                    arrowhead.ry = clamp(Math.abs(arrowhead.cy - mouseY), 0, halfHeight);
                    arrowhead = setArrowheadRadiusX(arrowhead.ry, arrowhead, rightBufferX - height, rightBufferX);
                } else {
                    arrowhead.ry = Math.abs(arrowhead.cy - mouseY);
                }
            }
            break;
        case 'rectangle':
            if (handleIndex === 0) {
                if (lockAspectRatio) {
                    arrowhead.x = clamp(mouseX, rightBufferX - height, rightBufferX);
                    arrowhead.width = rightBufferX - arrowhead.x;
                    arrowhead = setArrowheadHeight(arrowhead.width, arrowhead, halfHeight, height);
                } else {
                    arrowhead.x = clamp(mouseX, leftBufferX, rightBufferX);
                    arrowhead.width = rightBufferX - arrowhead.x;
                }
            } else if (handleIndex === 1) {
                arrowhead.y = clamp(mouseY, 0, height);
                arrowhead.height = (halfHeight - arrowhead.y) * 2;
                if (lockAspectRatio) {
                    arrowhead = setArrowheadLength(arrowhead.height, arrowhead, leftBufferX, rightBufferX);
                }
            }
            break;
        default:
            break;
    }

    arrowhead = updateLengthAndRefX(arrowhead);
    arrowhead.handles = updateHandles(arrowhead);

    return arrowhead;
}

function generateHandles(arrowhead) {
    let numHandles;

    switch (arrowhead.type) {
        case 'barbed':
        case 'ellipse':
        case 'rectangle':
            numHandles = 2;
            break;
        case 'triangle':
        case 'polyline':
            numHandles = 1;
            break;
        default: break;
    }

    let handles = [];

    for (let i = 0; i < numHandles; i++) {
        handles.push({id: uuidv1(), index: i});
    }

    return handles;
}

export function updateHandles(arrowhead) {
    switch (arrowhead.type) {
        case 'triangle':
        case 'polyline':
            arrowhead.handles[0].x = arrowhead.points[0];
            arrowhead.handles[0].y = arrowhead.points[1];
            break;
        case 'barbed':
            arrowhead.handles[0].x = arrowhead.points[0];
            arrowhead.handles[0].y = arrowhead.points[1];
            arrowhead.handles[1].x = arrowhead.points[6];
            arrowhead.handles[1].y = arrowhead.points[7];
            break;
        case 'ellipse':
            arrowhead.handles[0].x = arrowhead.cx - arrowhead.rx;
            arrowhead.handles[0].y = arrowhead.cy;
            arrowhead.handles[1].x = arrowhead.cx;
            arrowhead.handles[1].y = arrowhead.cy - arrowhead.ry;
            break;
        case 'rectangle':
            arrowhead.handles[0].x = arrowhead.x;
            arrowhead.handles[0].y = arrowhead.y + arrowhead.height / 2;
            arrowhead.handles[1].x = arrowhead.x + arrowhead.width / 2;
            arrowhead.handles[1].y = arrowhead.y;
            break;
        default: break;
    }

    return arrowhead.handles;
}

export function updateLengthAndRefX(arrowhead) {
    switch (arrowhead.type) {
        case 'triangle':
            arrowhead.refX = arrowhead.points[0];
            arrowhead.length = arrowhead.points[2] - arrowhead.points[0];
            break;
        case 'barbed':
            arrowhead.refX = arrowhead.points[6];
            arrowhead.length = arrowhead.points[2] - arrowhead.points[6];
            break;
        case 'ellipse':
            arrowhead.refX = arrowhead.cx - arrowhead.rx;
            arrowhead.length = arrowhead.rx * 2;
            break;
        case 'rectangle':
            arrowhead.refX = arrowhead.x;
            arrowhead.length = arrowhead.width;
            break;
        case 'polyline':
            arrowhead.refX = arrowhead.points[2];
            arrowhead.length = 0;
            break;
        default: break;
    }

    return arrowhead;
}

export function changeArrowheadPreset(presetName, shapes, arrowheads, selected) {
    var { arrowhead, path } = getArrowInfo(shapes, arrowheads, selected);

    const newArrowhead = arrowheads.presets[presetName];

    const updatedArrowhead = Object.assign({}, arrowhead, {...newArrowhead});
    updatedArrowhead.handles = generateHandles(updatedArrowhead);
    updatedArrowhead.handles = updateHandles(updatedArrowhead);

    const updatedPath = Object.assign({}, path, {arrowheadLength: newArrowhead.length});

    return { updatedArrowhead, updatedPath };
}

export function scaleArrowheadPoints(points, strokeWidth) {
    const originalStrokeWidth = 10;
    const scale = strokeWidth / originalStrokeWidth;

    console.log(scale);

    for (let i = 0; i < points.length; i++) {
        points[i] = points[i] * scale;
    }

    console.log(points);
    return formatPoints(points);
}

export function scaleRefX(refX, strokeWidth) {
    const originalStrokeWidth = 10;
    const scale = strokeWidth / originalStrokeWidth;
    console.log(refX * scale);

    return refX * scale;
}

export function getArrowInfo(shapes, arrowheads, selected) {
    const arrowheadId = shapes.byId[selected[0]].arrowheadId;
    const arrowhead = arrowheads.byId[arrowheadId];
    const pathId = selected[0];
    const path = shapes.byId[pathId];

    return { arrowheadId, arrowhead, pathId, path };
}

export function clamp(num, min, max) {
    return Math.max(min, Math.min(num, max));
}
