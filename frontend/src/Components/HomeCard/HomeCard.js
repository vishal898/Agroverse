
import "./HomeCard.css";


export default function OutlinedCard() {
  return (
    <div class="row">
    <div class="column">
      <div class="card1">
        <h3>Crop</h3>
        <p>Some text</p>
        <p>Some text</p>
        <p><button className="loginbutton" ><a style={{color:'white'}} href="/crop">Crop</a></button></p>
      </div>
    </div>
  
    <div class="column">
      <div class="card1">
        <h3>Plot</h3>
        <p>Some text</p>
        <p>Some text</p>
        <p><button className="loginbutton" ><a style={{color:'white'}} href="/plot">Plot</a></button></p>
      </div>
    </div>
    
    <div class="column">
      <div class="card1">
        <h3>Demand</h3>
        <p>Some text</p>
        <p>Some text</p>
        <p><button className="loginbutton" ><a style={{color:'white'}} href="/demand">Demand</a></button></p>
      </div>
      
    </div>
    
    <div class="column">
      <div class="card1">
        <h3>To-do</h3>
        <p>Some text</p>
        <p>Some text</p>
        <p><button className="loginbutton" ><a style={{color:'white'}} href="/to-do">To-do</a></button></p>
      </div>
    </div>
  </div>
  );
}
