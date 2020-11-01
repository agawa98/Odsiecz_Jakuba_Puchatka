var counter = 0;
var jakubpuchatekhp = 100;
var swordjakubpuchatekhp;
var wizardhp = 150;
var starcounter = 0;
var wizardspeed =.5;
var swordpickedup = false;
var wizardtext = ["Czarodziej: Hultaju oddawaj moje gwiazdy!!!", "Czarodziej: Co ty robisz z moimi gwiazdami??", "Czarodziej: Stój!!!!!", "Czarodziej: *sapie*"]

  Crafty.init(800, 500, document.getElementById("game"));
  
  Crafty.sprite(20, "img/sprites20.png",{
    grass1: [0,0],
    grass2: [1,0],
    grass3: [2,0],
    grass4: [3,0],
    wall: [0,1],
    star: [1,1],
    sword: [2,1],
    medpack: [3,1]
  });
  Crafty.sprite(40, "img/sprites40.png",{
    jakubpuchatek: [0,0],
    swordjakubpuchatek: [0,1],
    wizard: [1,0],
  });

  function healthloss(damage){
    jakubpuchatekhp-=damage;
    $("#healthbar").html("HP: " + jakubpuchatekhp);
    $("#healthbarbar").val(jakubpuchatekhp);
     isjakubpuchatekdeadyet();
  }

  function cleardialog(){
    $(".bubble").remove();
  }

  function isjakubpuchatekdeadyet(){
    if(jakubpuchatekhp<1){
      Crafty.enterScene("dead");
      cleardialog();
    }
  }

  function iswizarddeadyet(){
    if(wizardhp<1){
      Crafty.enterScene("wizarddead");
      cleardialog();
      objectiveid = "wizardobjective";
      objectivecompleted(objectiveid);
    }
  }

  function objectivecompleted(objectiveid){
    document.getElementById(objectiveid).style.color = "green";
  }

  function newdialogbubble(){
    let los=Math.round(Math.random()*3);
    var parag = document.createElement("p");
    parag.className = "bubble";
    var text = document.createTextNode(wizardtext[los]);
    var bubblediv = document.getElementById("bubblecontainer");
    parag.appendChild(text);
    bubblediv.appendChild(parag);
  }

  function showwizardobjective(){
    
    var wotext = document.createTextNode("Rozpruj Czarodzieja!!!");
    var parag = document.createElement("p");
    parag.className = "objective";
    parag.id = "wizardobjective";
    var objdiv = document.getElementById("objectivelist");
    parag.appendChild(wotext);
    objdiv.appendChild(parag);
  }

  function clearobjectives(){
    $(".objective").remove();
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
                .checkHits("jakubpuchatek")
                .checkHits("swordjakubpuchatek")
                .bind("HitOn", function(){
                  jakubpuchatek.x+=12;
                  if(swordpickedup == true){
                    swordjakubpuchatek.x+=12;
                  }
                })
            }
          }

          function generateEastWall(){
            for(var i=0;i<25;i++){
              Crafty.e("2D, Canvas, Solid, Collision, wall")
                .attr({x:780 , y:i*20})
                .checkHits("jakubpuchatek")
                .checkHits("swordjakubpuchatek")
                .bind("HitOn", function(){
                  jakubpuchatek.x-=12;
                  if(swordpickedup == true){
                    swordjakubpuchatek.x-=12;
                  }
                })
            }
          }

          function generateNorthWall(){
            for(var i=0;i<40;i++){
              Crafty.e("2D, Canvas, Solid, Collision, wall")
                .attr({x:20*i , y:0})
                .checkHits("jakubpuchatek")
                .checkHits("swordjakubpuchatek")
                .bind("HitOn", function(){
                  jakubpuchatek.y+=12;
                  if(swordpickedup == true){
                    swordjakubpuchatek.y+=12;
                  }
                })
            }
          }

          function generateSouthWall(){
            for(var i=0;i<40;i++){
              Crafty.e("2D, Canvas, Solid, Collision, wall")
                .attr({x:i*20 , y:480})
                .checkHits("jakubpuchatek")
                .checkHits("swordjakubpuchatek")
                .bind("HitOn", function(){
                  jakubpuchatek.y-=12;
                  if(swordpickedup == true){
                    swordjakubpuchatek.y-=12;
                    console.log("sdsd")
                  }
                })
            }
          }
        Crafty.bind("EnterFrame", function(){
          if(jakubpuchatek.x-wizard.x<0){
            wizard.x-=wizardspeed;
          }
          else{
            wizard.x+=wizardspeed;
          }
          if(jakubpuchatek.y-wizard.y<0){
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

        var stext = document.createTextNode("Zbierz gwiazdy 0/11");
        var parag = document.createElement("p");
        parag.className = "objective";
        parag.id = "stars"
        var objdiv = document.getElementById("objectivelist");
        parag.appendChild(stext);
        objdiv.appendChild(parag);

          jakubpuchatek = Crafty.e("2D, Canvas, Fourway, Collision, Solid, jakubpuchatek")
          .attr({x:400, y:250, w:40, h:40})
          .fourway(200)
          .collision()
          .checkHits("Solid")
          .bind("HitOn",function(){
            console.log("kolizjaaaaaaaaaa")
          })

          wizard = Crafty.e("2D, Canvas, Solid, Collision, wizard")
          .attr({x:700, y:200, w:40, h:40})
          .checkHits("jakubpuchatek")
          .collision()
          .bind("HitOn",function(){
            if(wizard.x<jakubpuchatek.x){
              jakubpuchatek.x+=20
            }
            if(wizard.x>jakubpuchatek.x){
              jakubpuchatek.x-=20
            }
            if(wizard.y<jakubpuchatek.y){
              jakubpuchatek.y+=20
            }
            if(wizard.y>jakubpuchatek.y){
              jakubpuchatek.y-=20
            }
            let damage = 10;
            healthloss(damage);
          })

          function starcollector(){

            starx = Math.floor((Math.random()*700)+50)
            stary = Math.floor((Math.random()*400)+50)

            star = Crafty.e("2D, Canvas, Solid, Collision, star")
            .attr({x: starx, y: stary, w:20, h:20})
            .checkHits("jakubpuchatek")
            .collision()
            .bind("HitOn", function(){
                starcounter++;
                wizardspeed=wizardspeed*1.15;
                star.destroy();
                if(starcounter<11){
                  starcollector();
                } 
                $("#stars").html("Zbierz gwiazdy ("+starcounter+"/11)")
                if(starcounter>10){
                  objectiveid="stars";
                  objectivecompleted(objectiveid);

                  showwizardobjective();
                  
                  sword = Crafty.e("2D, Canvas, Solid, Collision, sword")
                  .attr({x: 100, y:210, w:40, h:40})
                  .checkHits("jakubpuchatek")
                  .collision()
                  .bind("HitOn", function(){
                    sword.destroy();
                    swordpickedup = true;
                    
                    swordjakubpuchatek = Crafty.e("2D, Canvas, Fourway, Collision, Solid, swordjakubpuchatek")
                      .attr({x:jakubpuchatek.x, y:jakubpuchatek.y, w:40, h:40})
                      .fourway(200)
                      .collision()
                      .checkHits("Solid")
                      .onHit("wizard", function(){
                        wizardhp-=25;
                        iswizarddeadyet();
                      })
                      .bind("HitOn",function(){
                        console.log("kolizjaaaaaaaaaa")
                      })
                    swordjakubpuchatekhp = jakubpuchatekhp;
                    jakubpuchatek.destroy()
                    
                    swordwizard = Crafty.e("2D, Canvas, Solid, Collision, wizard")
                      .attr({x:wizard.x, y:wizard.y, w:40, h:40})
                      .checkHits("swordjakubpuchatek")
                      .collision()
                      .bind("HitOn",function(){
                        if(swordwizard.x<swordjakubpuchatek.x){
                          swordjakubpuchatek.x+=20
                        }
                        if(swordwizard.x>swordjakubpuchatek.x){
                          swordjakubpuchatek.x-=20
                        }
                        if(swordwizard.y<swordjakubpuchatek.y){
                          swordjakubpuchatek.y+=20
                        }
                        if(swordwizard.y>swordjakubpuchatek.y){
                          swordjakubpuchatek.y-=20
                        }
                        let damage = 10;
                        healthloss(damage);
                      })
                    swordwizardspeed = 2.5;
                    wizard.destroy();
                    Crafty.bind("EnterFrame", function(){
                      if(swordjakubpuchatek.x-swordwizard.x<0){
                        swordwizard.x-=swordwizardspeed;
                      }
                      else{
                        swordwizard.x+=swordwizardspeed;
                      }
                      if(swordjakubpuchatek.y-swordwizard.y<0){
                        swordwizard.y-=swordwizardspeed;
                      }
                      else{
                        swordwizard.y+=swordwizardspeed;
                      }
                    })
                  })
                }
                let los = Math.floor(Math.random()*100)
                if(los>75){
                  newdialogbubble()
                }
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






  Crafty.scene("wizarddead", function(){
    swordjakubpuchatekhp=100;
    Crafty.background("green");
    Crafty.e("Text, 2D, DOM")
    .text("Brawo, rozgromiłeś Czarodzieja! Rozpoczynanie następnego poziomu za chwilę...")
    .attr({x:30, y:230, w: 700, h:50})
    .css({"text-align": "center", "color": "white", "font-size": "30px", "font-family": "'Courier New', Courier, monospace;"})
    .bind("EnterFrame", function(){
      counter++;
      if(counter>385){
        console.log(counter);
        Crafty.enterScene("second")
      }
      if(counter>380){
        clearobjectives();
      }
    })
  })

Crafty.enterScene("first")