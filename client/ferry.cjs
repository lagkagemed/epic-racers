(function(exports){

     exports.new = function(x, y, destArr, waitTime, spd, id) {
          let self = {}
          self.id = id
          self.type = 0
          self.x = x
          self.y = y
          self.destArr = destArr
          self.dest = 0;
          self.waitTime = waitTime
          self.waitCount = waitTime
          self.spd = spd
          self.dir = 0
          return self
     }

     exports.update = function(ferry){

          let destX = ferry.destArr[ferry.dest].x
          let destY = ferry.destArr[ferry.dest].y

          if (ferry.x > destX - ferry.spd && ferry.x < destX + ferry.spd && ferry.y > destY - ferry.spd && ferry.y < destY + ferry.spd && ferry.waitCount == 0) {
               ferry.waitCount = ferry.waitTime
               ferry.dest++
               if (ferry.dest == ferry.destArr.length) ferry.dest = 0
          }

          if (ferry.waitCount == 0) {

               let goUp = false
               let goDown = false
               let goLeft = false
               let goRight = false

               if (destX - ferry.spd > ferry.x) goRight = true;
               if (destX + ferry.spd < ferry.x) goLeft = true;
               if (destY - ferry.spd > ferry.y) goDown = true; 
               if (destY + ferry.spd < ferry.y) goUp = true;

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

          }

          if (ferry.waitCount > 0) ferry.waitCount--
          
     };

     exports.draw = function(ferry, ctx, offsetX, offsetY) {
          let ferryOX = ferry.x + (offsetX * -1)
          let ferryOY = ferry.y + (offsetY * -1)
          ctx.drawImage(ferrySpr, ferryOX, ferryOY)
     }
  
  }(typeof exports === 'undefined' ? this.Ferry = {} : exports));