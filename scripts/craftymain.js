var counterskel=0
var skeletoncounter=0;
var counter = 0;
var jakubpuchatekhp = 100;
var swordjakubpuchatekhp=100;
var wizardhp = 150;
var starcounter = 0;
var wizardspeed =.5;
var skeletonspeed = 1.5;
var swordpickedup = false;
var skelspawned= false;
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
    medpack: [3,1],
    cave1: [0,2],
    cave2: [1,2],
    cave3: [2,2],
    cave4: [3,2],
    cave5: [0,3],
    cave6: [1,3],
    cave7: [2,3],
    cave8: [3,3],
    lava1: [0,4],
    lava2: [1,4],
  });
  Crafty.sprite(40, "img/sprites40.png",{
    jakubpuchatek: [0,0],
    swordjakubpuchatek: [0,1],
    wizard: [1,0],
  });
  Crafty.sprite(60, "img/sprites60.png",{
    skeleton: [0,0]
  });

  function s2(){
    Crafty.enterScene("second");
  }






  function healthloss(damage){
    if(swordpickedup == false){
      jakubpuchatekhp -=damage;
      $("#healthbar").html("HP: " + jakubpuchatekhp);
      $("#healthbarbar").val(jakubpuchatekhp);
    }
    if(swordpickedup == true){
      swordjakubpuchatekhp-=damage;
      $("#healthbar").html("HP: " + swordjakubpuchatekhp);
      $("#healthbarbar").val(swordjakubpuchatekhp);
    }
    isjakubpuchatekdeadyet();
  }

  function cleardialog(){
    $(".bubble").remove();
  }

  function isjakubpuchatekdeadyet(){
    if(swordpickedup ==true){
      if(swordjakubpuchatekhp<1){
        Crafty.enterScene("dead");
        cleardialog();
      }
    }
    else{
    if(jakubpuchatekhp<1){
      Crafty.enterScene("dead");
      cleardialog();
    }
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





  Crafty.scene("wizarddead", function(){
    let damage = swordjakubpuchatekhp-100;
    healthloss(damage);
    Crafty.background("green");
    Crafty.e("Text, 2D, DOM")
    .text("Brawo, rozgromiłeś Czarodzieja! Rozpoczynanie następnego poziomu za chwilę...")
    .attr({x:30, y:230, w: 700, h:50})
    .css({"text-align": "center", "color": "white", "font-size": "30px", "font-family": "'Courier New', Courier, monospace;"})
    .bind("EnterFrame", function(){
      counter++;
      if(counter>385){
        Crafty.enterScene("second")
      }
      if(counter>380){
        clearobjectives();
      }
    })
  })





  Crafty.scene("second", function(){
    
    function generateWorld() {
      for (var i = 0; i < 40; i++) {
        for (var j = 0; j < 25; j++) {
          var los=Math.round(Math.random()*100);
          if(los>97){
           cavetype = Math.floor((Math.random()*6)+2)
           Crafty.e("2D, Canvas, Color, cave"+cavetype)
            .attr({x: i * 20, y: j * 20})
            .color("none");
          }
          else{
            Crafty.e("2D, Canvas, Color, cave1")
              .attr({x: i * 20, y: j * 20})
              .color("none");
        }
      }
      }
    }
  
    function generateWestWall(){
      for(var i=0;i<25;i++){
        lavatype = Math.round(Math.random()+1)
        Crafty.e("2D, Canvas, Solid, Collision, lava"+lavatype)
          .attr({x:0 , y:i*20})
          .checkHits("swordjakubpuchatek")
          .bind("HitOn", function(){
          swordjakubpuchatek.x+=12;
          let damage = 20
          healthloss(damage);
          })
      }
    }

    function generateEastWall(){
      for(var i=0;i<25;i++){
        lavatype = Math.round(Math.random()+1)
        Crafty.e("2D, Canvas, Solid, Collision, lava"+lavatype)
          .attr({x:780 , y:i*20})
          .checkHits("jakubpuchatek")
          .checkHits("swordjakubpuchatek")
          .bind("HitOn", function(){
          swordjakubpuchatek.x-=12;
          let damage = 20
          healthloss(damage);
          })
      }
    }

    function generateNorthWall(){
      for(var i=0;i<40;i++){
        lavatype = Math.round(Math.random()+1)
        Crafty.e("2D, Canvas, Solid, Collision, lava"+lavatype)
          .attr({x:20*i , y:0})
          .checkHits("jakubpuchatek")
          .checkHits("swordjakubpuchatek")
          .bind("HitOn", function(){
          swordjakubpuchatek.y+=12;
          let damage = 20
          healthloss(damage);
          })
      }
    }

    function generateSouthWall(){
      for(var i=0;i<40;i++){
        lavatype = Math.round(Math.random()+1)
        Crafty.e("2D, Canvas, Solid, Collision, lava"+lavatype)
          .attr({x:i*20 , y:480})
          .checkHits("swordjakubpuchatek")
          .bind("HitOn", function(){
          swordjakubpuchatek.y-=12; 
          let damage = 20
          healthloss(damage);
          })
      }
    }

    generateWorld();
    generateWestWall();
    generateSouthWall();
    generateNorthWall();
    generateEastWall();


    swordjakubpuchatek = Crafty.e("2D, Canvas, Fourway, Collision, Solid, swordjakubpuchatek")
      .attr({x:jakubpuchatek.x, y:jakubpuchatek.y, w:40, h:40})
      .fourway(200)
      .collision()
      .checkHits("Solid")
      .onHit("skeleton", function(){
        let damage = 15
        healthloss(damage);
      })

      Crafty.bind("EnterFrame", function(){                    
        counter++;
        
        if(counter>200){                     
          let los = Math.round(Math.random()*10);
          if(los>8){
            var medx = Math.floor((Math.random()*700)+50)
            var medy = Math.floor((Math.random()*400)+50)
            medpack = Crafty.e("2D, Canvas, Solid, Collision, medpack")
                .attr({x: medx, y: medy, w:20, h:20})
                .checkHits("swordjakubpuchatek")
                .collision()
                .bind("HitOn", function(){
                  if(swordjakubpuchatekhp<76){
                    let damage = -25;
                    healthloss(damage);
                    medpack.destroy()
                  }
                  if(swordjakubpuchatekhp>75 && swordjakubpuchatekhp<100){
                    let damage = (100-swordjakubpuchatekhp)*-1
                    healthloss(damage);
                    medpack.destroy();
                  }
                })
          }
          counter=0;
        }
      })
      
      Crafty.bind("EnterFrame", function(){
        counterskel++;
        if(counterskel>400 && skeletoncounter<4){
          skeleton = Crafty.e("2D, Canvas, Solid, Collision, skeleton")
          .checkHits("swordjakubpuchatek")
          .attr({x:100, y:400, w:60, h:60})
          .collision()
          .bind("HitOn",function(){
            if(skeleton.x<swordjakubpuchatek.x){
              swordjakubpuchatek.x+=20
            }
            if(skeleton.x>swordjakubpuchatek.x){
              swordjakubpuchatek.x-=20
            }
            if(skeleton.y<swordjakubpuchatek.y){
              swordjakubpuchatek.y+=20
            }
            if(skeleton.y>swordjakubpuchatek.y){
              swordjakubpuchatek.y-=20
            }
            let damage = 10;
            healthloss(damage);
          })
          skelspawned =true;
          skeletoncounter++;
          counterskel=0;
        }
      })
      Crafty.bind("EnterFrame", function(){
        if(skelspawned==true){
        if(swordjakubpuchatek.x-skeleton.x<0){
          skeleton.x-=skeletonspeed;
        }
        else{
          skeleton.x+=skeletonspeed;
        }
        if(swordjakubpuchatek.y-skeleton.y<0){
          skeleton.y-=skeletonspeed;
        }
        else{
          skeleton.y+=skeletonspeed;
        }
      }
   })


      

  })
  
  
  
  
  
  Crafty.scene("dead", function(){
    Crafty.background("black");
    Crafty.e("Text, 2D, DOM")
    .text("Zginoles. Odswiez strone by zagrac ponownie")
    .attr({x:30, y:230, w: 700, h:50})
    .css({"text-align": "center", "color": "white", "font-size": "30px", "font-family": "'Courier New', Courier, monospace;"})
  })








Crafty.enterScene("first")