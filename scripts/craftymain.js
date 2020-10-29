
var screenWidth = 900;

  Crafty.init(800, 500, document.getElementById("game"));
  
  Crafty.sprite(20, "img/sprites.png",{
    grass1: [0,0],
    grass2: [1,0],
    grass3: [2,0],
    pinkman: [0,1],
    wizard: [0,2],
    wall: [0,3]
  });

  Crafty.scene("first",function(){
          
           function generateWorld() {
            for (var i = 0; i < 40; i++) {
              for (var j = 0; j < 25; j++) {
                 grassType = Math.floor((Math.random()*3)+1)
                 Crafty.e("2D, Canvas, Color, grass"+grassType)
                  .attr({x: i * 20, y: j * 20})
                  .color("none");
              }
            }
          }
        
          function generateWestWall(){
            for(var i=0;i<25;i++){
              Crafty.e("2D, Canvas, Solid, Collision, wall")
                .attr({x:0 , y:i*20})
                .checkHits("pinkman")
                .bind("HitOn", function(){
                  pinkman.x+=6;
                })
            }
          }

          function generateEastWall(){
            for(var i=0;i<25;i++){
              Crafty.e("2D, Canvas, Solid, Collision, wall")
                .attr({x:780 , y:i*20})
                .checkHits("pinkman")
                .bind("HitOn", function(){
                  pinkman.x-=6;
                })
            }
          }

          function generateNorthWall(){
            for(var i=0;i<40;i++){
              Crafty.e("2D, Canvas, Solid, Collision, wall")
                .attr({x:20*i , y:0})
                .checkHits("pinkman")
                .bind("HitOn", function(){
                  pinkman.y+=6;
                })
            }
          }

          function generateSouthWall(){
            for(var i=0;i<40;i++){
              Crafty.e("2D, Canvas, Solid, Collision, wall")
                .attr({x:i*20 , y:480})
                .checkHits("pinkman")
                .bind("HitOn", function(){
                  pinkman.y-=6;
                })
            }
          }
        Crafty.bind("EnterFrame", function(){
          if(pinkman.x-wizard.x<0){
            wizard.x-=.5;
          }
          else{
            wizard.x+=.5;
          }
          if(pinkman.y-wizard.y<0){
            wizard.y-=.5;
          }
          else{
            wizard.y+=.5;
          }
        })


          generateWorld();
          generateWestWall();
          generateEastWall();
          generateSouthWall();
          generateNorthWall();


          pinkman = Crafty.e("2D, Canvas, Fourway, Collision, Solid, pinkman")
          .attr({x:400, y:250, w:50, h:40})
          .fourway(200)
          .collision()
          .checkHits("Solid")
          .bind("HitOn",function(){
            console.log("kolizjaaaaaaaaaa")
          })

          wizard = Crafty.e("2D, Canvas, Solid, Collision, wizard")
          .attr({x:700, y:200, w:40, h:40})
          .checkHits("pinkman")
          .bind("HitOn",function(){
            pinkman.x-=20;
          })
  })


  

Crafty.enterScene("first")

    
