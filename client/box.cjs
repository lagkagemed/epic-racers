(function(exports){

     exports.new = function(x, y, id) {
         let self = {}
         self.x = x
         self.y = y
         self.id = id
         self.dir = 0
         self.torques = []
         return self
    }

     exports.update = function(box, server, pack){
          let i = box.torques.length
          let update = false
          while(i--) {
               let torque = box.torques[i]
               if (torque.spd > 0) {
                    box.x += Math.cos(torque.dir) * torque.spd;
                    box.y += Math.sin(torque.dir) * torque.spd;
                    torque.spd -= 0.2
               } else {
                    box.torques.splice(i, 1)
                    update = true
               }
          }
          if (server && update) {
               pack.push({x: box.x, y: box.y, dir: box.dir, torques: box.torques, id:box.id})
          }
    };

     exports.draw = function(box, ctx, offsetX, offsetY) {
          let boxOX = box.x + (offsetX * -1)
          let boxOY = box.y + (offsetY * -1)

          ctx.translate(boxOX, boxOY);
          ctx.rotate(box.dir); // Angle in radians
          ctx.drawImage(boxSpr, -boxSpr.width / 2, -boxSpr.height / 2)
          ctx.rotate(-box.dir); // Angle in radians
          ctx.translate(-boxOX, -boxOY);
    }
 
 }(typeof exports === 'undefined' ? this.Box = {} : exports));