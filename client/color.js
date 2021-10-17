function recolorImage(img,oldRed,oldGreen,oldBlue,newRed,newGreen,newBlue){

    let c2 = document.createElement('canvas');
    let ctx2 = c2.getContext("2d");
    let w2 = img.width;
    let h2 = img.height;

    c2.width = w2;
    c2.height = h2;

    // draw the image on the temporary canvas
    ctx2.drawImage(img, 0, 0, w2, h2);

    // pull the entire image into an array of pixel data
    var imageData2 = ctx2.getImageData(0, 0, w2, h2);

    // examine every pixel, 
    // change any old rgb to the new-rgb
    for (var i=0;i<imageData2.data.length;i+=4)
      {
          // is this pixel the old rgb?
          if(imageData2.data[i]==oldRed &&
             imageData2.data[i+1]==oldGreen &&
             imageData2.data[i+2]==oldBlue
          ){
              // change to your new rgb
              imageData2.data[i]=newRed;
              imageData2.data[i+1]=newGreen;
              imageData2.data[i+2]=newBlue;
          }
      }
    // put the altered data back on the canvas  
    ctx2.putImageData(imageData2,0,0);
    // put the re-colored image back on the image
    var img1=document.createElement('img')
    img1.src = c2.toDataURL('image/png');
    return img1;
}

let colorArr = [[255,43,60],[112,255,155],[43,71,255]]

let carSprArr = []

function makeColorArray() {
    for (let i = 0; i < colorArr.length; i++) {
        let colArr = colorArr[i]
        carSprArr.push(recolorImage(carBlueSpr, 0, 38, 255, colArr[0], colArr[1], colArr[2]))
    }
}