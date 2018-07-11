var game = new Phaser.Game(480, 320, Phaser.CANVAS, 'game-div', {
    preload: preload, create: create, update: update
});
  var ball;
  var paddle;
  var bricks;
  var newBrick;
  var brickInfo;
  var scoreText;
  var score = 0;

  var stork;
  var sack;
  var numberOfSacks = 5;
  var numberOfCollision = 0;
  var character;
  var storkFacing = 'left';
  var characterFacing = 'right';
  var cursors;
  var numberOfLives = 5;

  function preload() {
      game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      game.scale.pageAlignHorizontally = true;
      game.scale.pageAlignVertically = true;
      game.stage.backgroundColor = '#eee';
      game.load.image('background', 'images/Cityscape.png')
      game.load.image('sack', 'images/sack.png');
      game.load.spritesheet('womansprite', 'images/womanSprite.png', 100, 120);
      game.load.spritesheet('uniqueKey', 'images/newStork.png', 100, 100);

      
  }
  function create() {
      game.add.tileSprite(0, 0, 1000, 600, 'background');

      text = game.add.text(370, 300, "Number of lives \n0 ", {
      font: "12px Arial",
      fill: "#fffff",
      align: "center"
  });

  text.anchor.setTo(0.5, 0.5);
      game.physics.setBoundsToWorld();
      cursors = game.input.keyboard.createCursorKeys();



       stork = game.add.sprite(32, 32, 'uniqueKey');
       game.physics.enable(stork, Phaser.Physics.ARCADE);
       stork.y = 0
       stork.animations.add('right', [4, 5], 8, true);
       stork.animations.add('left', [6, 7], 8, true);
       stork.animations.play('left', 10, true);
       game.add.tween(stork).to({ x: 300}, 2000, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);


       sack = game.add.emitter(0, 0, numberOfSacks);
       sack.makeParticles('sack');
       sack.scale.set(0.5,0.5)
       stork.addChild(sack);





      sack.lifespan = 5000;
      sack.gravity = 100;
      
      character = game.add.sprite(32, 32, 'womansprite');
       character.y = 200;
       game.physics.enable(character, Phaser.Physics.ARCADE);
       character.animations.add('right', [5,4,3,2,1,0], 5, true);
       character.animations.add('left', [0,1,2,4,5],8, true);
      
       character.animations.play('left', 10, true);
  }
  function update() {
      if (game.physics.arcade.collide(sack, character)) {
          numberOfCollision += 1
          console.log(numberOfCollision)
      }


      stork.body.collideWorldBounds = true;
      sack.emitParticle();
      if (stork.x < 50) {
          stork.body.velocity.x = -150;
          if (storkFacing != 'left') {
              stork.animations.play('left');
              storkFacing = 'left';
          }
      } else if (stork.x > 250) {
          stork.body.velocity.x = 150;

          if (storkFacing != 'right') {
              stork.animations.play('right');
              storkFacing = 'right';
          }
      }
  
      if (character.x >= 379) {
          if (characterFacing != 'right') {
              character.animations.play('right', 10, true);
              characterFacing = 'right';
          } 
      }
      
      character.body.collideWorldBounds = true;
      
      if (cursors.right.isDown) {
          character.body.velocity.x += 5
         
              if (characterFacing != 'right') {
                  character.animations.play('right');
                  characterFacing = 'right';
              }
            
      }  else if (cursors.left.isDown) {
          character.body.velocity.x -= 5
              if (characterFacing != 'left') {
                  character.animations.play('left');
                  characterFacing = 'left';
              }
          
      }      
  }


  // this function (needed only on JSFiddle) take care of loading the images from the remote server
  function handleRemoteImagesOnJSFiddle() {
      game.load.baseURL = 'https://end3r.github.io/Gamedev-Phaser-Content-Kit/demos/';
      game.load.crossOrigin = 'anonymous';
  }