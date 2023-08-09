import React from "react";

class App extends React.Component{
  state = {
    question: '',
    responses: [],
  };

  render(){
    return(
      <div>
        <div>
          {this.state.responses.map((response, index) =>
            <li key={index}>{response}</li>
          )}
        </div>
        
        <input
          type="text"
          value={this.state.question} 
          onChange={event => this.setState({ question: event.target.value })} 
        />

        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    );
  }
}
export default App;
