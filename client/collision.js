let collisionDataArray = []

function loadColDataArray(track) {

    const collisionCanvas = document.createElement('canvas')
    const collisionCtx = collisionCanvas.getContext("2d")
    collisionCtx.imageSmoothingEnabled = false
    collisionCtx.webkitImageSmoothingEnabled = false

    collisionCanvas.width = track.width
    collisionCanvas.height = track.height  
    collisionCtx.drawImage(track, 0, 0);
    let inputImg = collisionCtx.getImageData(0,0,track.width,track.height);
    let collisionData = inputImg.data

    for ( let i = 0; i < collisionData.length; i+=4 ){

        //find the colour of this particular pixel
        let colour = "#";

        //---------------------------------------------------------------
        //convert the RGB numbers into a hex string. i.e. [255, 10, 100]
        //into "FF0A64"
        //---------------------------------------------------------------
        function _Dex_To_Hex( number ){
            let out = number.toString(16);
            if ( out.length < 2 ){
                out = "0" + out;
            }
            return out;
        }
        for ( let colourIndex = 0; colourIndex < 3; colourIndex++ ){
            colour += _Dex_To_Hex( collisionData[ i+colourIndex ] );
        }
        //set the fill colour
        collisionDataArray.push(colour)

    }

    console.log(collisionDataArray)

}
