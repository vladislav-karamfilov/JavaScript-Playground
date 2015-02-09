(function () {
    var TRIANGLES_SAVES_STORAGE_NAME = 'triangles-saves';

    var canvas = document.getElementById('canvas-triangles'),
        colorPicker = document.getElementById('triangle-color-picker'),
        clearCanvasBtn = document.getElementById('btn-clear-canvas'),
        saveToLocalStorageBtn = document.getElementById('btn-save-to-local-storage'),
        trianglesSavesContainer = document.getElementById('triangles-saves-container'),
        context = canvas.getContext('2d'),
        triangles = [],
        firstPoint,
        secondPoint,
        thirdPoint;

    (function () {
        loadTrianglesSaves();
    }());

    canvas.addEventListener('click', function (ev) {
        var rect = canvas.getBoundingClientRect(),
            currentPoint = {
                xCoordinate: (ev.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
                yCoordinate: (ev.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
            },
            color;

        if (!firstPoint) {
            firstPoint = currentPoint;
        } else if (!secondPoint) {
            secondPoint = currentPoint;
        } else if (!thirdPoint) {
            thirdPoint = currentPoint;

            color = colorPicker.value;

            if (isValidTriangle(firstPoint, secondPoint, thirdPoint)) {
                drawTriangle(firstPoint, secondPoint, thirdPoint, color);

                triangles.push({
                    firstPoint: firstPoint,
                    secondPoint: secondPoint,
                    thirdPoint: thirdPoint,
                    color: color
                });
            }

            firstPoint = secondPoint = thirdPoint = null;
        }
    }, false);

    clearCanvasBtn.addEventListener('click', clearCanvasAndTriangles, false);

    saveToLocalStorageBtn.addEventListener('click', function () {
        var saveName = prompt('Enter save name:'),
            trianglesStorage;
        if (saveName) {
            if (triangles.length) {
                trianglesStorage = JSON.parse(localStorage.getItem(TRIANGLES_SAVES_STORAGE_NAME)) || {};
                if (trianglesStorage[saveName]) {
                    if (!confirm('There is a save with the name \'' + saveName + '\'. Do you want to overwrite it?')) {
                        return
                    }
                }

                trianglesStorage[saveName] = triangles;

                localStorage.setItem(TRIANGLES_SAVES_STORAGE_NAME, JSON.stringify(trianglesStorage));

                alert('Triangles saved successfully!');
                clearCanvasAndTriangles();
                trianglesSavesContainer.removeChild(document.getElementById('triangles-saves-drop-down-list'));
                trianglesSavesContainer.removeChild(document.getElementById('btn-load-triangles-save'));
                loadTrianglesSaves();
            } else {
                alert('There is no triangles on the canvas...');
            }
        }
    }, false);

    function isValidTriangle(firstPoint, secondPoint, thirdPoint) {
        var doubleArea = firstPoint.xCoordinate * (secondPoint.yCoordinate - thirdPoint.yCoordinate) +
            secondPoint.xCoordinate * (thirdPoint.yCoordinate - firstPoint.yCoordinate) +
            thirdPoint.xCoordinate * (firstPoint.yCoordinate - secondPoint.yCoordinate);

        return doubleArea != 0;
    }

    function drawTriangle(firstPoint, secondPoint, thirdPoint, color) {
        context.fillStyle = color;
        context.beginPath();
        context.moveTo(firstPoint.xCoordinate, firstPoint.yCoordinate);
        context.lineTo(secondPoint.xCoordinate, secondPoint.yCoordinate);
        context.lineTo(thirdPoint.xCoordinate, thirdPoint.yCoordinate);
        context.closePath();
        context.fill();
    }

    function clearCanvasAndTriangles() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        triangles = [];
    }

    function loadTrianglesSaves() {
        var trianglesStorage = JSON.parse(localStorage.getItem(TRIANGLES_SAVES_STORAGE_NAME)),
            trianglesSavesFragment,
            trianglesSavesDropDownList,
            triangleSaveOption,
            loadTrianglesSaveBtn;
        if (trianglesStorage) {
            trianglesSavesFragment = document.createDocumentFragment();
            trianglesSavesDropDownList = document.createElement('select');
            trianglesSavesDropDownList.id = 'triangles-saves-drop-down-list';

            for (var save in trianglesStorage) {
                triangleSaveOption = document.createElement('option');
                triangleSaveOption.value = save;
                triangleSaveOption.textContent = save;
                trianglesSavesDropDownList.appendChild(triangleSaveOption);
            }

            loadTrianglesSaveBtn = document.createElement('button');
            loadTrianglesSaveBtn.id = 'btn-load-triangles-save';
            loadTrianglesSaveBtn.textContent = 'Load!';
            loadTrianglesSaveBtn.addEventListener('click', loadTriangles, false);

            trianglesSavesFragment.appendChild(trianglesSavesDropDownList);
            trianglesSavesFragment.appendChild(loadTrianglesSaveBtn);
            trianglesSavesContainer.appendChild(trianglesSavesFragment);
        }
    }

    function loadTriangles() {
        var trianglesStorage = JSON.parse(localStorage.getItem(TRIANGLES_SAVES_STORAGE_NAME)),
            saveName = document.getElementById('triangles-saves-drop-down-list').value;
        if (trianglesStorage && trianglesStorage[saveName]) {
            trianglesStorage[saveName].forEach(function (triangle) {
                drawTriangle(triangle.firstPoint, triangle.secondPoint, triangle.thirdPoint, triangle.color);
            });

            triangles = trianglesStorage[saveName];
        }
    }
})();