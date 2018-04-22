class Dot {
  constructor() {
    this.va = createVector( 100, 380 );
    this.vb = createVector( 600, 100 );
  }
  display() {
    stroke( 70 );
    line( this.va.x, this.va.y, this.vb.x, this.vb.y );
  }
  update( vehicle ) {
    fill( 70 );
    stroke( 70 );
    strokeWeight( .5 );
    let ab = p5.Vector.sub( this.vb, this.va );
    let av = p5.Vector.sub( vehicle.position.copy(), this.va );
    ab.normalize();
    let projection = ab.mult( ab.dot( av ) );
    projection.add( this.va );
    ellipse( projection.x, projection.y, 4 );
    line( projection.x, projection.y, vehicle.position.x, vehicle.position.y );
    line( this.va.x, this.va.y, vehicle.position.x, vehicle.position.y );
  }
}
