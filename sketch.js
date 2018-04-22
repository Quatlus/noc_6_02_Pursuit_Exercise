// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com
// Arriving "vehicle" follows the mouse position
// Implements Craig Reynold's autonomous steering behaviors
// One vehicle "arrive"
// See: http://www.red3d.com/cwr/
//
// Modified code for exercise
//
let v;
let vbetter;
let t;
let result = [ 0, 0 ];
let out1 = 0;
let out2 = 0;
let dot;

function setup() {
  createCanvas( 640, 400 );
  v = new Vehicle( 0, height );
  vbetter = new Vehicle( 0, height );
  t = new Thiev();
  dot = new Dot();
}

function draw() {
  background( 51 );
  let mouse = createVector( mouseX, mouseY );
  dot.display();
  dot.update( vbetter );
  dot.update( v );
  dot.update( t );
  // Draw an ellipse at the mouse position
  fill( 127 );
  stroke( 200 );
  strokeWeight( 2 );
  //  ellipse( mouse.x, mouse.y, 48, 48 );
  // Call the appropriate steering behaviors for our agents
  vbetter.arrive( t, true );
  vbetter.update();
  vbetter.display();
  v.arrive( t, false );
  v.update();
  v.display();
  t.update();
  t.display();
  fill( 255 );
  noStroke();
  text( 'red pursuit: ' + result[ 0 ] + ' - blue seeker: ' + result[ 1 ], 50, 50 );
}
class Thiev {
  constructor() {
    this.acceleration = createVector( 0, 0 );
    this.velocity = createVector( -2, -2 );
    this.position = createVector( width / 2, height / 2 );
    this.color = ( 255 );
  }
  update() {
    // this.acceleration.add( ( noise( frameCount / 1000 ) - .5 ) * .3, ( noise( frameCount / 8000 ) - .5 ) * .01 );
    let nsz = ( noise( frameCount / 400 ) - .5 ) * .05;
    this.acceleration.add( nsz, 0 );
    this.velocity.add( this.acceleration );
    this.velocity.limit( 5 );
    this.position.add( this.velocity );
    this.acceleration.mult( 0 );
    if ( this.position.x < 20 || this.position.x > width - 20 ) {
      this.velocity.x *= -1;
    }
    if ( this.position.y < 20 || this.position.y > height - 20 ) {
      this.velocity.y *= -1;
    }
  }
  display() {
    if ( out1 && out2 ) this.color = color( 255 );
    if ( !out1 && !out2 ) this.color = color( 128 );
    fill( this.color );
    ellipse( this.position.x, this.position.y, 30 );
    line( this.position.x, this.position.y, this.position.x + this.velocity.x * 50, this.position.y + this.velocity.y * 50 );
  }
  set fillColor( color ) {
    this._color = color;
  }
}

function mouseDragged() {
  // t.velocity.mult( 0.98 );
}

function mousePressed() {
  // save( "image.jpg" )
  // t.velocity.mult( 2 );
}
