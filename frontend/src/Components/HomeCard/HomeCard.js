
import "./HomeCard.css";


export default function OutlinedCard() {
  return (
    <div class="row">
    <div class="column">
      <div class="card1">
        <h3>Crop</h3>
        <br/>
        <p>This tab is to see added crop and add new crop</p>
        <p><button className="loginbutton" ><a style={{color:'white'}} href="/crop">Crop</a></button></p>
      </div>
    </div>
  
    <div class="column">
      <div class="card1">
        <h3>Plot</h3>
        <br/>
        <p>This tab is to see added plot and add new plot</p>
        <p><button className="loginbutton" ><a style={{color:'white'}} href="/plot">Plot</a></button></p>
      </div>
    </div>
    
    <div class="column">
      <div class="card1">
        <h3>Demand</h3>
        <br/>
        <p>This tab is to submit demand</p>
        <br/>
        <p><button className="loginbutton" ><a style={{color:'white'}} href="/demand">Demand</a></button></p>
      </div>
      
    </div>
    
    <div class="column">
      <div class="card1">
        <h3>To-do</h3>
        <br/>
        <p>This tab is to see and select the daily task pushed on basis of demand</p>
       
        
        <p><button className="loginbutton" ><a style={{color:'white'}} href="/to-do">To-do</a></button></p>
      </div>
    </div>
  </div>
  );
}
