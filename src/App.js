import { Component } from "react";

// use only class components to:
//// add a section to add general info like name, email, phone number
//// add a section for educational experience(school name, study, date)
//// add a section for practical experiences / work - research, etc

// include ability to :
//// edit cv - all input fields fill with current values and allow you to append changes
//// should be able to edit and resumbit each field

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Hello world!</h1>
      </div>
    );
  }
}

export default App;
