var pinkmanhp = 100;
var starcounter = 0;
var wizardspeed =.5;

  Crafty.init(800, 500, document.getElementById("game"));
  
  Crafty.sprite(20, "img/sprites20.png",{
    grass1: [0,0],
    grass2: [1,0],
    grass3: [2,0],
    grass4: [3,0],
    wall: [0,1],
    star: [1,1]
  });
  Crafty.sprite(40, "img/sprites40.png",{
    pinkman: [0,0],
    wizard: [1,0],
  });

  function healthloss(damage){
    pinkmanhp-=damage;
    $("#healthbar").html("HP: " + pinkmanhp);
    $("#healthbarbar").val(pinkmanhp);
     ispinkmandeadyet();
  }

  function ispinkmandeadyet(){
    if(pinkmanhp<1){
      Crafty.enterScene("dead");
    }
  }

  Crafty.scene("first",function(){
          
           function generateWorld() {
            for (var i = 0; i < 40; i++) {
              for (var j = 0; j < 25; j++) {
                 grassType = Math.floor((Math.random()*4)+1)
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
            wizard.x-=wizardspeed;
          }
          else{
            wizard.x+=wizardspeed;
          }
          if(pinkman.y-wizard.y<0){
            wizard.y-=wizardspeed;
          }
          else{
            wizard.y+=wizardspeed;
          }
        })

        generateWorld();
        generateWestWall();
        generateEastWall();
        generateSouthWall();
        generateNorthWall();

        

          pinkman = Crafty.e("2D, Canvas, Fourway, Collision, Solid, pinkman")
          .attr({x:400, y:250, w:40, h:40})
          .fourway(200)
          .collision()
          .checkHits("Solid")
          .bind("HitOn",function(){
            console.log("kolizjaaaaaaaaaa")
          })

          wizard = Crafty.e("2D, Canvas, Solid, Collision, wizard")
          .attr({x:700, y:200, w:40, h:40})
          .checkHits("pinkman")
          .collision()
          .bind("HitOn",function(){
            if(wizard.x<pinkman.x){
              pinkman.x+=20
            }
            if(wizard.x>pinkman.x){
              pinkman.x-=20
            }
            if(wizard.y<pinkman.y){
              pinkman.y+=20
            }
            if(wizard.y>pinkman.y){
              pinkman.y-=20
            }
            let damage = 10;
            healthloss(damage);
          })

          function starcollector(){

            starx = Math.floor((Math.random()*700)+50)
            stary = Math.floor((Math.random()*400)+50)

            star = Crafty.e("2D, Canvas, Solid, Collision, star")
            .attr({x: starx, y: stary, w:20, h:20})
            .checkHits("pinkman")
            .collision()
            .bind("HitOn", function(){
                starcounter++;
                wizardspeed=wizardspeed*1.2;
                star.destroy();
                starcollector();
                $("#stars").html("gwiazdy:"+starcounter)
            })
          }
          
          starcollector();
          
  })

  Crafty.scene("dead", function(){
    Crafty.background("black");
    Crafty.e("Text, 2D, DOM")
    .text("Zginoles. Odswiez strone by zagrac ponownie")
    .attr({x:30, y:230, w: 700, h:50})
    .css({"text-align": "center", "color": "white", "font-size": "30px", "font-family": "'Courier New', Courier, monospace;"})
  })

Crafty.enterScene("first")