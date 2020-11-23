var acounter = 0;
var bcounter = 0;
var ccounter = 0;
var dcounter = 0;
var ecounter = 0;
var fcounter = 0;
var gcounter = 0
var hcounter = 0;
var icounter = 0
var jcounter = 0;
var kcounter = 0;
var lcounter = 0;
var counterskel=0
var skeletoncounter=0;
var jakubpuchatekhp = 100;
var swordjakubpuchatekhp=100;
var swordjakubpuchatekspeed=1;
var healthregentimeout = 100;
var damagemultiplier=1;
var wizardhp = 150;
var starcounter = 0;
var wizardspeed =.5;
var normalskeletonspeed = 1.8;
var bigskeletonspeed = 1.5;
var xskeletonspeed = 3;
var yskeletonspeed = 3;
var normalskeletonhp = 120;
var bigskeletonhp = 160;
var xskeletonhp = 100;
var yskeletonhp = 100;
var bomblont = 0
var openbars =0;
var miodekcooldown = 0;
var lastfacingdirection=0;
var swordpickedup = false;
var skelspawned= false;
var medpackpickedup =true;
var skelpassed=false;
var wellchoicehasbeenmade=false;
var bombpickedup = false;
var bombspawned = false;
var someonewashurt = false;
var cobra1hp = 100;
var cobra2hp = 100;
var cobra3hp = 100;
var cobra1speed = 2;
var cobra2speed = 3;
var cobra3speed = 4;
var venomduration = 0;
var villageburnedtext = "Ta wioska wyglądała podejrzanie więc wybiegłeś stamtąd jak najszybciej nawet nie patrząc na studnię"
var wizardtext = ["Czarodziej: Hultaju oddawaj moje gwiazdy!!!", "Czarodziej: Co ty robisz z moimi gwiazdami??", "Czarodziej: Stój!!!!!", "Czarodziej: *sapie*"]
var skeletontext = ["*kości stukają*", "Szkielet: Co ty tu robisz??", "Szkielet: Co zrobiłeś z Czarodziejem???"]
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
    bridge1: [2,4],
    bridge2: [3,4],
    lawn1: [0,5],
    lawn2: [1,5],
    lawn3: [2,5],
    lawn4: [3,5],
    lawn5: [0,6],
    lawn6: [1,6],
    fencehori: [2,6],
    fencevert: [3,6],
    fenceleftbot: [0,7],
    fencelefttop: [1,7],
    fencerighttop: [2,7],
    fencerightbot: [3,7],
    sanddefault: [0,8],
    sand1: [1,8],
    sand2: [2,8],
    sand3: [3,8],
    sand4: [0,9],
    sand5: [1,9],
    vineh1: [2,9],
    vineh2: [3,9],
    vinev1: [0,10],
    vinev2: [1,10],
    vinec1: [2,10],
    vinec2: [3,10],
    miodek: [0,11],
    cobra: [0,12],
    bombpickup: [2,12],


  });
  Crafty.sprite(40, "img/sprites40.png",{
    jakubpuchatek: [0,0],
    swordjakubpuchatek: [0,1],
    wizard: [1,0],
    normalskeleton: [1,1],
    xskeleton: [0,2],
    yskeleton: [1,2],
  });
  Crafty.sprite(60, "img/sprites60.png",{
    bigskeleton: [0,0],
    wishingwell: [1,0]
  });
  Crafty.sprite(140, "img/sprites140.png",{
    ironbars: [0,0],
    house: [1,0]
  });
  Crafty.sprite(300, "img/sprites300.png",{
    bombready: [0,0],
  });

  function op(){
    starcounter=10;
    openbars=4;
    counterskel = 390;
  }




  function newtask(content, id){
    var text = document.createTextNode(content);
    var parag = document.createElement("p");
    parag.className = "objective"
    parag.id = id;
    var objdiv = document.getElementById("objectivelist")
    parag.appendChild(text);
    objdiv.appendChild(parag);
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
      objectivecompleted("wizardobjective");
    }
  }

  function caniopenbars(){
    if(Math.round(Math.random()*4)>1){
      newdialogbubble(skeletontext, 2);
    }
    openbars++;
    if(openbars>3){
      skelpassed=true;
      ironbars.destroy();
      objectivecompleted("skeletonobjective");
    }
  }

  function isnormalskeletondeadyet(){
    if(normalskeletonhp<1){
      caniopenbars();
      normalskeleton.destroy()
    }
  }
  function isbigskeletondeadyet(){
    if(bigskeletonhp<1){
      caniopenbars();
      bigskeleton.destroy()
    }
  }
  function isxskeletondeadyet(){
    if(xskeletonhp<1){
      caniopenbars();
      xskeleton.destroy()
    }
  }
  function isyskeletondeadyet(){
    if(yskeletonhp<1){
      caniopenbars();
      yskeleton.destroy()
    }
  }

  function objectivecompleted(objectiveid){
    document.getElementById(objectiveid).style.color = "green";
  }

  function newdialogbubble(whicharray, numberofarraycontentsminusone){
    let los=Math.round(Math.random()*numberofarraycontentsminusone);
    var parag = document.createElement("p");
    parag.className = "bubble";
    var text = document.createTextNode(whicharray[los]);
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

  function healthregen(){
      ccounter++
      if(ccounter == healthregentimeout && swordjakubpuchatekhp <99){
        healthloss(-2);
      }
      if(ccounter==healthregentimeout){
        ccounter = 0;
      }
  }

  document.getElementById("wellbtn").addEventListener("click", function(event){
    event.preventDefault();
    wellwished();
  })

  function wellwished(){
    if(document.getElementById("biggerhealth").checked){
      healthregentimeout=50;
      villageburnedtext = "Pełen sił idziesz przed siebie w kierunku Moskwy."
    }
    if(document.getElementById("biggersword").checked){
      damagemultiplier = 2;
      villageburnedtext = "Z podwójnie śmiertelnym mieczem biegniesz dalej w kierunku Moskwy."
    }
    wellchoicehasbeenmade=true;
    objectivecompleted("wellobjective")
    document.getElementById("wellchoice").style.visibility = "hidden"
  }

  function spawnmedpack(){
    let los = Math.round(Math.random()*10);
          if(los>3 && medpackpickedup ==true){
            medpackpickedup=false;
            var medx = Math.floor((Math.random()*650)+50)
            var medy = Math.floor((Math.random()*400)+50)
            medpack = Crafty.e("2D, Canvas, Solid, Collision, medpack")
                .attr({x: medx, y: medy, w:20, h:20})
                .checkHits("swordjakubpuchatek")
                .collision()
                .bind("HitOn", function(){
                  if(swordjakubpuchatekhp<76){
                    healthloss(-25);
                    medpack.destroy()
                    medpackpickedup=true;
                  }
                  if(swordjakubpuchatekhp>75 && swordjakubpuchatekhp<100){
                    let damage = (100-swordjakubpuchatekhp)*-1
                    healthloss(damage);
                    medpack.destroy();
                    medpackpickedup=true;
                  }
                })
          }
          bcounter=0;
  }

  function spawnbomb(){
          if(bombpickedup ==false && bombspawned==false){
            bombspawned=true
            var bombx = Math.floor((Math.random()*650)+50)
            var bomby = Math.floor((Math.random()*400)+50)
            bomb = Crafty.e("2D, Canvas, Solid, Collision, bombpickup")
                .attr({x: bombx, y: bomby})
                .checkHits("swordjakubpuchatek")
                .collision()
                .bind("HitOn", function(){
                  if(bombpickedup==false){
                    bomb.destroy()
                    bombpickedup=true;
                    bombspawned=false;
                  }
                })
          }
          lcounter = 0;
  }

  function cobra1tookdamage(dmg){
    cobra1hp-=dmg;
    if(cobra1hp<1){
      cobra1.destroy()
    }
  }

  function cobra2tookdamage(dmg){
    cobra2hp-=dmg;
    if(cobra2hp<1){
      cobra2.destroy()
    }
  }

  function cobra3tookdamage(dmg){
    cobra3hp-=dmg;
    if(cobra3hp<1){
      cobra3.destroy()
    }
  }

  Crafty.scene("introduction", function(){
    Crafty.background("#158f1b")
    Crafty.e("2D, DOM, Text")
    .text("Po tym, jak Kłapouchy okazał się agentem KGB, który miał na celu eksterminację wszystkich obywateli Stumilowego Lasu, Jakub Puchatek miał już dość tych zdradzieckich rusków.")
    .attr({x:30, y:230, w: 700, h:50})
    .css({"text-align": "center", "color": "white", "font-size": "20px", "font-family": "'Courier New', Courier, monospace;"})
    .bind("EnterFrame", function(){
      dcounter++;
      if(dcounter==400){
        Crafty.enterScene("introduction2")
      }
    })
    .bind("KeyDown", function(e){
      if(e.key == Crafty.keys.SPACE){
        dcounter = 399;
      }
    })
  })

  Crafty.scene("introduction2", function(){
    Crafty.background("#168250")
    Crafty.e("2D, DOM, Text")
    .text("Zaraz po pogrzebie Krzysia wyruszył w podróż do filii rosyjskiej agencji niecałe 2500km stąd. Pierwszą przeszkodę spotkał jeszcze w swoim rodzimym lesie.")
    .attr({x:30, y:230, w: 700, h:50})
    .css({"text-align": "center", "color": "white", "font-size": "20px", "font-family": "'Courier New', Courier, monospace;"})
    .bind("EnterFrame", function(){
      ecounter++;
      if(ecounter==400){
        Crafty.enterScene("first")
      }
    })
    .bind("KeyDown", function(e){
      if(e.key == Crafty.keys.SPACE){
        ecounter = 399;
      }
    })
  })





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

                  newtask("Rozpruj Czarodzieja!!!", "wizardobjective");
                  
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
                        healthloss(10);
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
                  newdialogbubble(wizardtext, 3)
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
    .text("Brawo, rozgromiłeś Czarodzieja! Przeszukując jego zwłoki w poszukiwaniu magicznych przedmiotów, natrafiasz na błyszczący pierścień. Po założeniu go na palec przenosi cię on do komnaty Czarodzieja...")
    .attr({x:30, y:170, w: 700, h:50})
    .css({"text-align": "center", "color": "white", "font-size": "30px", "font-family": "'Courier New', Courier, monospace;"})
    .bind("EnterFrame", function(){
      acounter++;
      if(acounter==250){
        Crafty.enterScene("second")
      }
      if(acounter==249){
        clearobjectives();
      }
    })
    .bind("KeyDown", function(e){
      if(e.key == Crafty.keys.SPACE){
        acounter = 248;
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
          healthloss(20);
          })
      }
    }

    function generateEastWall(){
      for(var j=37;j<40;j++){
      for(var i=0;i<25;i++){
        if(i>9 && i<15){
          continue;
        }
        lavatype = Math.round(Math.random()+1)
        Crafty.e("2D, Canvas, Solid, Collision, lava"+lavatype)
          .attr({x:j*20 , y:i*20})
          .checkHits("jakubpuchatek")
          .checkHits("swordjakubpuchatek")
          .bind("HitOn", function(){
          swordjakubpuchatek.x-=12;
          healthloss(20);
          })
      }
    }
    }

    function generateBridge(){
      for(var j=37;j<40;j++){
        for(var i=10; i<15;i++){
          let bridgetype = Math.round(Math.random()+1)
          Crafty.e("2D, Canvas, bridge"+bridgetype)
          .attr({x:j*20, y:i*20})
        }
      }
    }

    function generateIronBars(){
        ironbars = Crafty.e("2D, Canvas, Collision, Solid, ironbars")
        .attr({x:720, y:180, w:20, h:140})
        .collision()
        .checkHits("jakubpuchatek")
        .checkHits("swordjakubpuchatek")
        .bind("HitOn", function(){
          swordjakubpuchatek.x-=16;
        })
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
          healthloss(20);
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
          healthloss(20);
          })
      }
    }

    function generateNextLevelTransition(){

        Crafty.e("2D, Canvas, Solid, Collision")
        .attr({x:780, y:200, w:10, h:100})
        .collision()
        .checkHits("swordjakubpuchatek")
        .bind("HitOn", function(){
          cleardialog();
          clearobjectives();
          Crafty.enterScene("skeletonkilled");
          let swjphp = -1*(100-swordjakubpuchatekhp)
        healthloss(swjphp)
        })
    }

    generateWorld();
    generateWestWall();
    generateSouthWall();
    generateNorthWall();
    generateEastWall();
    generateBridge();
    generateIronBars();
    generateNextLevelTransition();

    newtask("Zabij cztery szkielety aby móc otworzyć bramę!", "skeletonobjective");

    Crafty.bind("EnterFrame",function(){
      lcounter++
      if(lcounter==500){
        spawnbomb();
      }
    })

    Crafty.bind("KeyDown", function(e){
      if(e.key == Crafty.keys.O){
        console.log(bombpickedup)
        if(bombpickedup==true){
        bombarmed = Crafty.e("2D, Canvas, Solid, Collision, SpriteAnimation, bombready")
        .attr({x:swordjakubpuchatek.x-150, y:swordjakubpuchatek.y-150})
        .reel("bombexplosion", 10000, 0, 0, 2)
        .animate("bombexplosion", 1)
        .collision()
        .checkHits("Solid")
        .bind("EnterFrame",function(){
          bomblont++;
          if(bomblont>180){
            this.reelPosition(1)
          }
          if(bomblont>201){
            bomblont=0;
            bombpickedup=false;
            bombarmed.destroy();
          }
          if(bomblont==200){
            if(counterskel>400){
              if(xskeleton.x > bombarmed.x && xskeleton.x < bombarmed.x+300 && xskeleton.y > bombarmed.y && xskeleton.y < bombarmed.y+300){
                xskeletonhp-=50;
                isxskeletondeadyet()
                someonewashurt=true
              }
            }
            if(counterskel>1200){
              if(bigskeleton.x > bombarmed.x && bigskeleton.x < bombarmed.x+300 && bigskeleton.y > bombarmed.y && bigskeleton.y < bombarmed.y+300){
                bigskeletonhp-=50;
                isbigskeletondeadyet()
                someonewashurt=true
              }
            }
            if(counterskel>800){
              if(normalskeleton.x > bombarmed.x && normalskeleton.x < bombarmed.x+300 && normalskeleton.y > bombarmed.y && normalskeleton.y < bombarmed.y+300){
                normalskeletonhp-=50;
                isnormalskeletondeadyet()
                someonewashurt=true
              }
            }
            if(counterskel>1600){
              if(yskeleton.x > bombarmed.x && yskeleton.x < bombarmed.x+300 && yskeleton.y > bombarmed.y && yskeleton.y < bombarmed.y+300){
                yskeletonhp-=50;
                isyskeletondeadyet()
                someonewashurt=true
              }
            }
            if(someonewashurt == true){
              bomblont=0;
              bombpickedup=false;
              bombarmed.destroy();
              spawnbomb();
              someonewashurt=false;
            }
          }
        })
        }
      }
    })





    swordjakubpuchatek = Crafty.e("2D, Canvas, Fourway, Collision, Solid, swordjakubpuchatek")
      .attr({x:jakubpuchatek.x, y:jakubpuchatek.y, w:40, h:40})
      .fourway(200)
      .collision()
      .checkHits("Solid")
      .onHit("normalskeleton", function(){
        normalskeletonhp-=20;
        isnormalskeletondeadyet();
      })
      .onHit("bigskeleton", function(){
        bigskeletonhp -=20;
        isbigskeletondeadyet();
      })
      .onHit("xskeleton", function(){
        xskeletonhp -=20;
        isxskeletondeadyet();
      })
      .onHit("yskeleton", function(){
        yskeletonhp-=20;
        isyskeletondeadyet();
      })

      Crafty.bind("EnterFrame", function(){                    
        bcounter++;
        
        if(bcounter>300){                     
          spawnmedpack()
        }
      })

      Crafty.bind("EnterFrame", function(){
        healthregen();
      })
      
      Crafty.bind("EnterFrame", function(){
        counterskel++;
        if(skelpassed==false){
        if(counterskel==400 && skeletoncounter<4){
          xskeleton = Crafty.e("2D, Canvas, Solid, Collision, xskeleton, enemy")
          .checkHits("swordjakubpuchatek")
          .attr({x:100, y:400, w:40, h:40})
          .collision()
          .onHit("swordjakubpuchatek",function(){
            if(xskeleton.x<swordjakubpuchatek.x){
              swordjakubpuchatek.x+=20
            }
            if(xskeleton.x>swordjakubpuchatek.x){
              swordjakubpuchatek.x-=20
            }
            if(xskeleton.y<swordjakubpuchatek.y){
              swordjakubpuchatek.y+=20
            }
            if(xskeleton.y>swordjakubpuchatek.y){
              swordjakubpuchatek.y-=20
            }
            let damage = 15;
            healthloss(damage);
          })
          skelspawned =true;
          skeletoncounter++;
        }

        if(counterskel==800 && skeletoncounter<4){
          normalskeleton = Crafty.e("2D, Canvas, Solid, Collision, normalskeleton, enemy")
          .checkHits("swordjakubpuchatek")
          .attr({x:700, y:100, w:40, h:40})
          .collision()
          .onHit("swordjakubpuchatek",function(){
            if(normalskeleton.x<swordjakubpuchatek.x){
              swordjakubpuchatek.x+=20
            }
            if(normalskeleton.x>swordjakubpuchatek.x){
              swordjakubpuchatek.x-=20
            }
            if(normalskeleton.y<swordjakubpuchatek.y){
              swordjakubpuchatek.y+=20
            }
            if(normalskeleton.y>swordjakubpuchatek.y){
              swordjakubpuchatek.y-=20
            }
            healthloss(20);
          })
          skelspawned =true;
          skeletoncounter++;
        }

        if(counterskel==1200 && skeletoncounter<4){
          bigskeleton = Crafty.e("2D, Canvas, Solid, Collision, bigskeleton, enemy")
          .checkHits("swordjakubpuchatek")
          .attr({x:700, y:400, w:60, h:60})
          .collision()
          .onHit("swordjakubpuchatek",function(){
            if(bigskeleton.x<swordjakubpuchatek.x){
              swordjakubpuchatek.x+=40
            }
            if(bigskeleton.x>swordjakubpuchatek.x){
              swordjakubpuchatek.x-=40
            }
            if(bigskeleton.y<swordjakubpuchatek.y){
              swordjakubpuchatek.y+=40
            }
            if(bigskeleton.y>swordjakubpuchatek.y){
              swordjakubpuchatek.y-=40
            }
            healthloss(35);
          })
          skelspawned =true;
          skeletoncounter++;
        }

        if(counterskel==1600 && skeletoncounter<4){
          yskeleton = Crafty.e("2D, Canvas, Solid, Collision, yskeleton, enemy")
          .checkHits("swordjakubpuchatek")
          .attr({x:100, y:50, w:40, h:40})
          .collision()
          .onHit("swordjakubpuchatek",function(){
            if(yskeleton.x<swordjakubpuchatek.x){
              swordjakubpuchatek.x+=20
            }
            if(yskeleton.x>swordjakubpuchatek.x){
              swordjakubpuchatek.x-=20
            }
            if(yskeleton.y<swordjakubpuchatek.y){
              swordjakubpuchatek.y+=20
            }
            if(yskeleton.y>swordjakubpuchatek.y){
              swordjakubpuchatek.y-=20
            }
            healthloss(10);
          })
          skelspawned =true;
          skeletoncounter++;
        }
      }
      })
  
      Crafty.bind("EnterFrame", function(){
          if(skelspawned==true){
            if(skeletoncounter>1){
              if(swordjakubpuchatek.x-normalskeleton.x<0){
                normalskeleton.x-=normalskeletonspeed;
              }
              else{
                normalskeleton.x+=normalskeletonspeed;
              }
              if(swordjakubpuchatek.y-normalskeleton.y<0){
                normalskeleton.y-=normalskeletonspeed;
              }
              else{
                normalskeleton.y+=normalskeletonspeed;
              }
            }
            if(skeletoncounter>2){
              if(swordjakubpuchatek.x-bigskeleton.x<0){
                bigskeleton.x-=bigskeletonspeed;
              }
              else{
                bigskeleton.x+=bigskeletonspeed;
              }
              if(swordjakubpuchatek.y-bigskeleton.y<0){
                bigskeleton.y-=bigskeletonspeed;
              }
              else{
                bigskeleton.y+=bigskeletonspeed;
              }
            }
            if(skeletoncounter>0){
              if(swordjakubpuchatek.x-xskeleton.x<0){
                xskeleton.x-=xskeletonspeed;
              }
              else{
                xskeleton.x+=xskeletonspeed;
              }
            }
            if(skeletoncounter>3){
              if(swordjakubpuchatek.y-yskeleton.y<0){
                yskeleton.y-=yskeletonspeed;
              }
              else{
                yskeleton.y+=yskeletonspeed;
              }
            }
          }
          })
    
  })

  Crafty.scene("skeletonkilled", function(){
    bombpickedup=false;
    medpackpickedup=false;
    Crafty.background("#411561");
    Crafty.e("Text, 2D, DOM")
    .text("Wychodząc z jaskini natknąłęś się na opuszczoną osadę ze studnią na środku.")
    .attr({x:30, y:230, w: 700, h:50})
    .css({"text-align": "center", "color": "white", "font-size": "30px", "font-family": "'Courier New', Courier, monospace;"})
    .bind("EnterFrame",function(){
      fcounter++
      if(fcounter==300){
        Crafty.enterScene("third")
      }
    })
    .bind("KeyDown", function(e){
      if(e.key == Crafty.keys.SPACE){
        fcounter = 299;
      }
    })
  })





  Crafty.scene("third", function(){


    newtask("Wybierz życzenie w studni", "wellobjective")


    function generateWorld() {
      for (var i = 0; i < 40; i++) {
        for (var j = 0; j < 25; j++) {
          var los=Math.round(Math.random()*100);
          
          if(los>98){
           lawntype = Math.round((Math.random()*2)+3)
           Crafty.e("2D, Canvas, Color, lawn"+lawntype)
            .attr({x: i * 20, y: j * 20})
            .color("none");
          }
          if(los>90 && los<=98){
          lawntype = Math.round(Math.random()+1)
           Crafty.e("2D, Canvas, Color, lawn"+lawntype)
            .attr({x: i * 20, y: j * 20})
            .color("none");
          }
          if(los<=90){
            Crafty.e("2D, Canvas, Color, lawn6")
              .attr({x: i * 20, y: j * 20})
              .color("none");
        }
      }
      }
    }
  
    function generateWestWall(){
      for(var i=0;i<25;i++){
        lavatype = Math.round(Math.random()+1)
        Crafty.e("2D, Canvas, Solid, Collision, fencevert")
          .attr({x:0 , y:i*20})
          .checkHits("swordjakubpuchatek")
          .bind("HitOn", function(){
          swordjakubpuchatek.x+=12;
          })
      }
    }

    function generateEastWall(){
      for(var i=0;i<25;i++){
        if(i>9 && i<15){
          continue;
        }
        lavatype = Math.round(Math.random()+1)
        Crafty.e("2D, Canvas, Solid, Collision, fencevert")
          .attr({x:780 , y:i*20})
          .checkHits("jakubpuchatek")
          .checkHits("swordjakubpuchatek")
          .bind("HitOn", function(){
          swordjakubpuchatek.x-=12;
          })
      }
    }
    function generateNorthWall(){
      for(var i=1;i<39;i++){
        lavatype = Math.round(Math.random()+1)
        Crafty.e("2D, Canvas, Solid, Collision, fencehori")
          .attr({x:20*i , y:0})
          .checkHits("swordjakubpuchatek")
          .bind("HitOn", function(){
          swordjakubpuchatek.y+=12;
          })
      }
      Crafty.e("2D, Canvas, Solid, Collision, fencerighttop")
        .attr({x:780, y:0})
      Crafty.e("2D, Canvas, Solid, Collision, fencelefttop")
        .attr({x:0, y:0})

    }

    function generateSouthWall(){
      for(var i=1;i<39;i++){
        lavatype = Math.round(Math.random()+1)
        Crafty.e("2D, Canvas, Solid, Collision, fencehori")
          .attr({x:i*20 , y:480})
          .checkHits("swordjakubpuchatek")
          .bind("HitOn", function(){
          swordjakubpuchatek.y-=12; 
          })
      }
      Crafty.e("2D, Canvas, Solid, Collision, fencerightbot")
        .attr({x:780, y:480})
      Crafty.e("2D, Canvas, Solid, Collision, fenceleftbot")
        .attr({x:0, y:480})
    }

    function generateHouses(){
      var house = Crafty.e("2D, Canvas, Solid, Collision, house")
        .attr({x:400, y:0})
        .collision()
        .checkHits("swordjakubpuchatek")
        .bind("HitOn",function(){
            if(house.x<swordjakubpuchatek.x){
              swordjakubpuchatek.x+=20
            }
            if(house.x>swordjakubpuchatek.x){
              swordjakubpuchatek.x-=20
            }
            if(house.y<swordjakubpuchatek.y){
              swordjakubpuchatek.y+=20
            }
            if(house.y>swordjakubpuchatek.y){
              swordjakubpuchatek.y-=20
            }

    })
    }

    function generateNextLevelTransition(){

      Crafty.e("2D, Canvas, Solid, Collision")
      .attr({x:780, y:200, w:10, h:100})
      .collision()
      .checkHits("swordjakubpuchatek")
      .bind("HitOn", function(){
        cleardialog();
        clearobjectives();
        Crafty.enterScene("villageburned");
        let swjphp = -1*(100-swordjakubpuchatekhp)
      healthloss(swjphp)
      })
     }

    generateWorld();
    generateEastWall();
    generateWestWall();
    generateNorthWall();
    generateSouthWall();
    generateHouses();
    generateNextLevelTransition();

    var swordjakubpuchatek = Crafty.e("2D, Canvas, Fourway, Collision, Solid, swordjakubpuchatek")
    .attr({x:70, y:200})
    .fourway(200)
    .collision()
    .checkHits("Solid")

    var wishingwell = Crafty.e("2D, Canvas, Solid, Collision, wishingwell")
    .attr({x:570, y:220})
    .collision()
    .checkHits("Solid")
    .bind("HitOn",function(){
      if(wishingwell.x<swordjakubpuchatek.x){
        swordjakubpuchatek.x+=12
      }
      if(wishingwell.x>swordjakubpuchatek.x){
        swordjakubpuchatek.x-=12
      }
      if(wishingwell.y<swordjakubpuchatek.y){
        swordjakubpuchatek.y+=12
      }
      if(wishingwell.y>swordjakubpuchatek.y){
        swordjakubpuchatek.y-=12
      } 
      if(wellchoicehasbeenmade == false){
        document.getElementById("wellchoice").style.visibility = "visible";

       
      }
      

    })


  })



  Crafty.scene("villageburned",function(){
    if(wellchoicehasbeenmade==false){
      document.getElementById("wellchoice").style.visibility = "hidden"
    }
    Crafty.background("#411561");
    Crafty.e("Text, 2D, DOM")
    .text(villageburnedtext)
    .attr({x:30, y:230, w: 700, h:50})
    .css({"text-align": "center", "color": "white", "font-size": "30px", "font-family": "'Courier New', Courier, monospace;"})
    .bind("EnterFrame",function(){
      hcounter++
      if(hcounter==300){
        Crafty.enterScene("fourth")
      }
    })
    .bind("KeyDown", function(e){
      if(e.key == Crafty.keys.SPACE){
        hcounter = 299;
      }
    })
  })



  Crafty.scene("fourth",function(){

    function generateWorld() {
      for (var i = 0; i < 40; i++) {
        for (var j = 0; j < 25; j++) {
          var los=Math.round(Math.random()*100);
          
          if(los>98){
           sandtype = Math.round(Math.random()+4)
           Crafty.e("2D, Canvas, Color, sand"+sandtype)
            .attr({x: i * 20, y: j * 20})
            .color("none");
          }
          if(los>90 && los<=98){
          sandtype = Math.round((Math.random()*2)+1)
           Crafty.e("2D, Canvas, Color, sand"+sandtype)
            .attr({x: i * 20, y: j * 20})
            .color("none");
          }
          if(los<=90){
            Crafty.e("2D, Canvas, Color, sanddefault")
              .attr({x: i * 20, y: j * 20})
              .color("none");
        }
      }
      }
    }
  
    function generateWestWall(){
      for(var i=0;i<25;i++){
        vinetype = Math.round(Math.random()+1)
        Crafty.e("2D, Canvas, Solid, Collision, vinev"+vinetype)
          .attr({x:0 , y:i*20})
          .checkHits("swordjakubpuchatek")
          .bind("HitOn", function(){
          swordjakubpuchatek.x+=12;
          healthloss(5)
          })
      }
    }

    function generateEastWall(){
      for(var i=0;i<25;i++){
        if(i>9 && i<15){
          continue;
        }
        vinetype = Math.round(Math.random()+1)
        Crafty.e("2D, Canvas, Solid, Collision, vinev"+vinetype)
          .attr({x:780 , y:i*20})
          .checkHits("swordjakubpuchatek")
          .bind("HitOn", function(){
          swordjakubpuchatek.x-=12;
          healthloss(5)
          })
      }
    }
    function generateNorthWall(){
      for(var i=1;i<39;i++){
        vinetype = Math.round(Math.random()+1)
        Crafty.e("2D, Canvas, Solid, Collision, vineh"+vinetype)
          .attr({x:20*i , y:0})
          .checkHits("swordjakubpuchatek")
          .bind("HitOn", function(){
          swordjakubpuchatek.y+=12;
          healthloss(5)
          })
      }
      vinetype = Math.round(Math.random()+1)
      Crafty.e("2D, Canvas, Solid, Collision, vinec"+vinetype)
        .attr({x:780, y:0})

      vinetype = Math.round(Math.random()+1)
      Crafty.e("2D, Canvas, Solid, Collision, vinec"+vinetype)
        .attr({x:0, y:0})

    }

    function generateSouthWall(){
      for(var i=1;i<39;i++){
        vinetype = Math.round(Math.random()+1)
        Crafty.e("2D, Canvas, Solid, Collision, vineh"+vinetype)
          .attr({x:i*20 , y:480})
          .checkHits("swordjakubpuchatek")
          .bind("HitOn", function(){
          swordjakubpuchatek.y-=12; 
          healthloss(5);
          })
      }
      vinetype = Math.round(Math.random()+1)
      Crafty.e("2D, Canvas, Solid, Collision, vinec"+vinetype)
        .attr({x:780, y:480})

      vinetype = Math.round(Math.random()+1)
      Crafty.e("2D, Canvas, Solid, Collision, vinec"+vinetype)
        .attr({x:0, y:480})
    }

    generateWorld();
    generateEastWall();
    generateWestWall();
    generateSouthWall();
    generateNorthWall();

    Crafty.bind("EnterFrame", function(){
      healthregen();
    })

    Crafty.bind("KeyDown", function(e){
      if(e.key == Crafty.keys.UP_ARROW){
        lastfacingdirection=0
      }
    })
    Crafty.bind("KeyDown", function(e){
      if(e.key == Crafty.keys.RIGHT_ARROW){
        lastfacingdirection=1
      }
    })
    Crafty.bind("KeyDown", function(e){
      if(e.key == Crafty.keys.DOWN_ARROW){
        lastfacingdirection=2
      }
    })
    Crafty.bind("KeyDown", function(e){
      if(e.key == Crafty.keys.LEFT_ARROW){
        lastfacingdirection=3
      }
    })

    
    var swordjakubpuchatek = Crafty.e("2D, Canvas, Fourway, Collision, Solid, swordjakubpuchatek")
    .attr({x:70, y:200})
    .fourway(200)
    .collision()
    .checkHits("Solid")
    .bind("EnterFrame",function(){
      miodekcooldown++
      gcounter++;
      console.log(gcounter+"      counter")
      console.log(swordjakubpuchatekhp+"     hp")
      console.log(venomduration + "     venomdur")
      if(gcounter>55){
        if(venomduration>0){
          venomduration--;
          healthloss(8);
          gcounter=0;
        }
      }
    })
    .bind("KeyDown", function(e){
      if(e.key == Crafty.keys.P && miodekcooldown > 50){
        miodekcooldown = 0;
        var miodek = Crafty.e("2D, Canvas, SpriteAnimation, Collision, Solid, miodek")
        .attr({x:swordjakubpuchatek.x, y:swordjakubpuchatek.y})
        .reel("miodekspin", 500, 0, 11, 4)
        .animate("miodekspin", -1)
        .collision()
        .checkHits("Solid")
        .bind("EnterFrame",function(){
          icounter++;
          if(lastfacingdirection == 0){
            miodek.y-=6;
          }
          if(lastfacingdirection == 1){
            miodek.x+=6;
          }
          if(lastfacingdirection == 2){
            miodek.y+=6;
          }
          if(lastfacingdirection == 3){
            miodek.x-=6;
          }
        })
        .onHit("Solid", function(){
          if(icounter>20){
            this.destroy()
            icounter=0;

          }
        })
      }
    })
    .onHit("miodek", function(){
      if(icounter>20){
        healthloss(15)}
      
    })
    .onHit("enemy",function(){
      if(jcounter>70){
        venomduration +=3;
        jcounter=0;
      }
    })


    


    cobra1 = Crafty.e("2D, Collision, Canvas, Solid, SpriteAnimation, cobra, enemy")
    .attr({x:710, y: 60})
    .collision()
    .checkHits("Solid")
    .reel("cobramove", 2000, 0, 12, 2)
    .animate("cobramove", -1)
    .onHit("miodek", function(){
      cobra1tookdamage(10)
    })
    .onHit("swordjakubpuchatek", function(){
      cobra1tookdamage(damagemultiplier*20)
      if(cobra1.x<swordjakubpuchatek.x){
        swordjakubpuchatek.x+=12
      }
      if(cobra1.x>swordjakubpuchatek.x){
        swordjakubpuchatek.x-=12
      }
      if(cobra1.y<swordjakubpuchatek.y){
        swordjakubpuchatek.y+=12
      }
      if(cobra1.y>swordjakubpuchatek.y){
        swordjakubpuchatek.y-=12
      }
    })
    .bind("EnterFrame", function(){
      if(swordjakubpuchatek.x-cobra1.x<0){
        cobra1.x-=cobra1speed;
      }
      else{
        cobra1.x+=cobra1speed;
      }
      if(swordjakubpuchatek.y-cobra1.y<0){
        cobra1.y-=cobra1speed;
      }
      else{
        cobra1.y+=cobra1speed;
      }
    })
    

    cobra2 = Crafty.e("2D, Collision, Canvas, Solid, SpriteAnimation, cobra, enemy")
    .attr({x:710, y: 250})
    .collision()
    .checkHits("Solid")
    .reel("cobramove", 2000, 0, 12, 2)
    .animate("cobramove", -1)
    .onHit("miodek", function(){
      cobra2tookdamage(10)
    })
    .onHit("swordjakubpuchatek", function(){
      cobra2tookdamage(damagemultiplier*20)
      if(cobra2.x<swordjakubpuchatek.x){
        swordjakubpuchatek.x+=12
      }
      if(cobra2.x>swordjakubpuchatek.x){
        swordjakubpuchatek.x-=12
      }
      if(cobra2.y<swordjakubpuchatek.y){
        swordjakubpuchatek.y+=12
      }
      if(cobra2.y>swordjakubpuchatek.y){
        swordjakubpuchatek.y-=12
      } 
    })
    .bind("EnterFrame", function(){
      if(swordjakubpuchatek.x-cobra2.x<0){
        cobra2.x-=cobra2speed;
      }
      else{
        cobra2.x+=cobra2speed;
      }
      if(swordjakubpuchatek.y-cobra2.y<0){
        cobra2.y-=cobra2speed;
      }
      else{
        cobra2.y+=cobra2speed;
      }
    })
    

    cobra3 = Crafty.e("2D, Collision, Canvas, Solid, SpriteAnimation, cobra, enemy")
    .attr({x:710, y: 440})
    .collision()
    .checkHits("Solid")
    .reel("cobramove", 2000, 0, 12, 2)
    .animate("cobramove", -1)
    .onHit("miodek", function(){
      cobra3tookdamage(10)
    })
    .onHit("swordjakubpuchatek", function(){
      cobra3tookdamage(damagemultiplier*20)
      if(cobra3.x<swordjakubpuchatek.x){
        swordjakubpuchatek.x+=12
      }
      if(cobra3.x>swordjakubpuchatek.x){
        swordjakubpuchatek.x-=12
      }
      if(cobra3.y<swordjakubpuchatek.y){
        swordjakubpuchatek.y+=12
      }
      if(cobra3.y>swordjakubpuchatek.y){
        swordjakubpuchatek.y-=12
      } 
    })
    .bind("EnterFrame", function(){
      if(swordjakubpuchatek.x-cobra3.x<0){
        cobra3.x-=cobra3speed;
      }
      else{
        cobra3.x+=cobra3speed;
      }
      if(swordjakubpuchatek.y-cobra3.y<0){
        cobra3.y-=cobra3speed;
      }
      else{
        cobra3.y+=cobra3speed;
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








Crafty.enterScene("introduction")