/**
 * Created by Arsalan Yarveisi on 3/17/19.
 */

function compressBeforeUpload(sourceInputElement, targetInputElementId, compressionMethod = null, compressionPercentage = 0, thresholdHeight = null, thresholdWidth = null) {

    // Validate the request first

    if (sourceInputElement.files && sourceInputElement.files[0]) {

        var reader = new FileReader();

        reader.onload = function (event) {
            var image = new Image();

            image.onload = function () {
                var canvas = document.createElement("canvas");
                var context = canvas.getContext("2d");

                // set initial values
                canvas.width = image.width;
                canvas.height = image.height;

                if (compressionMethod == "r") {

                    // based on compressionPercentage
                    if (compressionPercentage > 0) {
                        canvas.height = image.height * (100 - compressionPercentage) / 100;
                        canvas.width = image.width * (100 - compressionPercentage) / 100;
                    }

                }

                if (compressionMethod == "f") {

                    // based on thresholdHeight only
                    if (thresholdHeight > 0 && thresholdWidth == null) {
                        canvas.height = thresholdHeight;
                        canvas.width = image.width * (canvas.height / image.height);
                    }

                    // based on thresholdWidth
                    if (thresholdWidth > 0 && thresholdHeight == null) {
                        canvas.width = thresholdWidth;
                        canvas.height = image.height * (canvas.width / image.width);
                    }

                    // based on both thresholds
                    if (thresholdWidth > 0 && thresholdHeight > 0) {
                        canvas.height = thresholdHeight;
                        canvas.width = thresholdWidth;
                    }

                }

                context.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);

                document.getElementById(targetInputElementId).value = canvas.toDataURL();
            };
            image.src = event.target.result;
        };
        reader.readAsDataURL(sourceInputElement.files[0]);
    }
}

export default compressBeforeUpload;