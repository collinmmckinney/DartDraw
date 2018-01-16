export function setGrid(stateCopy) {
    const { ruler, gridLines } = stateCopy;
    var pixelsPerUnit = 72;
    var divisions = pixelsPerUnit;
    gridLines.divisions = [];
    gridLines.subDivisions = [];
    gridLines.snapTo = pixelsPerUnit / Math.pow(ruler.base, ruler.exponent);

    for (var i = 0; i < stateCopy.canvasWidth; i += gridLines.snapTo) {
        if (i === 0) {
            continue;
        }
        if (i % divisions === 0) {
            gridLines.divisions.push(i);
        } else {
            gridLines.subDivisions.push(i);
        }
    }

    return stateCopy;
}

export function toggleGridSnapping(stateCopy) {
    stateCopy.gridSnapping = !stateCopy.gridSnapping;
    return stateCopy;
}
