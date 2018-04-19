// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com
// The "Vehicle" class
class Vehicle {
  constructor( x, y ) {
      this.acceleration = createVector( 0, 0 );
      this.velocity = createVector( 0, -2 );
      this.position = createVector( x, y );
      this.r = 6;
      this.maxspeed = 4;
      this.maxforce = 0.05;
    }
    // Method to update location
  update() {
    // Update velocity
    this.velocity.add( this.acceleration );
    // Limit speed
    this.velocity.limit( this.maxspeed );
    this.position.add( this.velocity );
    // Reset accelerationelertion to 0 each cycle
    this.acceleration.mult( 0 );
  }
  applyForce( force ) {
      // We could add mass here if we want A = F / M
      this.acceleration.add( force );
    }
    // A method that calculates a steering force towards a target
    // STEER = DESIRED MINUS VELOCITY
  arrive( target, modus ) {
    let targetvel = target.velocity.copy();
    strokeWeight( 1 );
    var brake, d;
    if ( modus === true ) {
      var braker = p5.Vector.sub( target.location, this.position );
      var desired = p5.Vector.sub( p5.Vector.add( target.location, targetvel.mult( 50 ) ), this.position );
      stroke( 225, 100 );
      line( this.position.x, this.position.y, this.position.x + desired.x, this.position.y + desired.y );
      brake = braker.mag();
      if ( brake < 100 ) {
        result[ 0 ]++;
        var m = map( brake, 0, 100, 0, this.maxspeed );
        desired.setMag( m );
        target.color = color( 255, 102, 102 );
        out1 = 0;
      } else {
        desired.setMag( this.maxspeed );
        out1 = 1;
      }
      fill( 255, 102, 102 );
    } else {
      var desired = p5.Vector.sub( target.location, this.position ); // A vector pointing from the location to the target
      stroke( 225, 100 );
      line( this.position.x, this.position.y, this.position.x + desired.x, this.position.y + desired.y );
      d = desired.mag();
      // Scale with arbitrary damping within 100 pixels
      if ( d < 100 ) {
        result[ 1 ]++;
        var m = map( d, 0, 100, 0, this.maxspeed );
        desired.setMag( m );
        target.color = color( 66, 134, 244 );
        out2 = 0;
      } else {
        desired.setMag( this.maxspeed );
        out2 = 1;
      }
      fill( 66, 134, 244 );
    }
    // Steering = Desired minus Velocity
    var steer = p5.Vector.sub( desired, this.velocity );
    steer.limit( this.maxforce ); // Limit to maximum steering force
    this.applyForce( steer );
  }
  display() {
    // Draw a triangle rotated in the direction of velocity
    var theta = this.velocity.heading() + PI / 2;
    stroke( 200 );
    strokeWeight( 1 );
    push();
    translate( this.position.x, this.position.y );
    rotate( theta );
    beginShape();
    vertex( 0, -this.r * 2 );
    vertex( -this.r, this.r * 2 );
    vertex( this.r, this.r * 2 );
    endShape( CLOSE );
    pop();
    //  console.log( this.position, this.velocity );
    stroke( 255, 102, 102 );
    strokeWeight( 1 );
    line( this.position.x, this.position.y, this.position.x + this.velocity.x * 15, this.position.y + this.velocity.y * 15 );
  }
}
