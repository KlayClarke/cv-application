import { Component } from "react";
import { Form } from "./components/NewForm";
import "./TestApp.css";

export class TestApp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="app-container">
        <Form />
      </div>
    );
  }
}
