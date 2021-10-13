(function(exports){

     exports.new = function(x, y, destArr, waitTime, spd) {
          let self = {}
          self.type = 0
          self.x = x
          self.y = y
          self.destArr = destArr
          self.dest = 0;
          self.waitTime = waitTime
          self.waitCount = 0
          self.spd = spd
          self.dir = 0
          return self
     }

     exports.update = function(ferry){

          let destX = ferry.destArr[ferry.dest].x
          let destY = ferry.destArr[ferry.dest].x

          let goUp = false
          let goDown = false
          let goLeft = false
          let goRight = false

          if (destX > ferry.x) goRight = true; else goLeft = true;
          if (destY > ferry.y) goDown = true; else goUp = true;

          if (goUp && !goRight && !goDown && !goLeft) ferry.dir = Math.PI / 4 * 6
          if (goUp && goRight && !goDown && !goLeft) ferry.dir = Math.PI / 4 * 7
          if (!goUp && goRight && !goDown && !goLeft) ferry.dir = 0
          if (!goUp && goRight && goDown && !goLeft) ferry.dir = Math.PI / 4 * 1
          if (!goUp && !goRight && goDown && !goLeft) ferry.dir = Math.PI / 4 * 2
          if (!goUp && !goRight && goDown && goLeft) ferry.dir = Math.PI / 4 * 3
          if (!goUp && !goRight && !goDown && goLeft) ferry.dir = Math.PI / 4 * 4
          if (goUp && !goRight && !goDown && goLeft) ferry.dir = Math.PI / 4 * 5

          // Sæt ny position
          ferry.x += Math.cos(ferry.dir) * ferry.spd;
          ferry.y += Math.sin(ferry.dir) * ferry.spd;
          
     };

     exports.draw = function(ferry, ctx, offsetX, offsetY) {
          let ferryOX = ferry.x + (offsetX * -1)
          let ferryOY = ferry.y + (offsetY * -1)
          ctx.drawImage(ferrySpr, ferryOX, ferryOY)
     }
  
  }(typeof exports === 'undefined' ? this.Ferry = {} : exports));