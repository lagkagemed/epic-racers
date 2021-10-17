(function(exports){

    exports.new = function(Ferry, x, y, destArr, spd, id) {
         let self = Ferry.new(x,y,destArr, spd, id)
         return self
    }

    exports.update = function(Ferry, bullD, server, pack){
        Ferry.update(bullD, server, pack)
    };

    exports.draw = function(bullD, ctx, offsetX, offsetY) {
         let bullDOX = bullD.x + (offsetX * -1)
         let bullDOY = bullD.y + (offsetY * -1)

         ctx.translate(bullDOX, bullDOY);
         ctx.rotate(bullD.dir); // Angle in radians
         ctx.drawImage(bullDSpr, -bullDSpr.width / 2, -bullDSpr.height / 2)
         ctx.rotate(-bullD.dir); // Angle in radians
         ctx.translate(-bullDOX, -bullDOY);
    }
 
 }(typeof exports === 'undefined' ? this.Bulldozer = {} : exports));