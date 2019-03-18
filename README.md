# image-upldr

This package simply allows you to compress and resize images on the FrontEnd and upload the Base64 equivalent to the server side.

## Installation

**Option 1:**

Download [upldr.js](https://github.com/thearsalan/image-upldr/blob/master/src/upldr.js) and include it in the page:
```html
<script src="path/to/upldr.js"></script>
```

**Option 2:**
```bash
$ npm install image-upldr
```

## Basic Usage

You need to have an labeled input for uploading the files, and another hidden one for storing the uploaded Base64 value.

You may call the following function, wherever you see fit and with the options you may need. 

```javascript
compressBeforeUpload(sourceInputElement, 
                     targetInputElementId, 
                     compressionMethod = null, 
                     compressionPercentage = 0, 
                     thresholdHeight = null, 
                     thresholdWidth = null)
```

where

- `sourceInputElement` is the input element from which the uploaded file is retrieved
- `targetInputElementId` is the id of the hidden input element, which holds the Base64 equivalent of the uploaded file after resizing and compression
- `compressionMethod` could be set as `"r"` or `"f"`
    * For a total relative resizing and compression, use `"r"` which needs to be accompanied by the desired compression percentage, as well.
    * If you are looking for a resizing based on a fixed width or height or both, the compressionMethod shall be set as `"f"`, accompanied by the `thresholdHeight` and `thresholdWidth` in `px`


### Example
In this example, we're going to call the function on the `onchange()`  method of the source-element, so that the compression 
happens after the file is received in the uploader. We have prepared the uploader as the following, since we want a total 
compression and resizing operation on the uploaded image, we have opted for `"r"` as the compression method, and we want
the file to be 30% smaller before we send its Base64 equivalent to the server side.

The resulted Base64 string is attainable in the `value` of `target-element`. 

```html
<label for="source-element" class="button__upload">
    Select File
</label>

<input id="source-element" type="file" accept="image/jpg, image/jpeg, image/png" 
onchange="compressBeforeUpload(this, "target-element", "r", 30);"/>

<input hidden id="target-element" title="target-element"/>
```


## Compatibility
image-upldr works with any browser that supports HTML5 Canvas.

image-upldr only works with image files for now.



