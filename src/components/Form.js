import { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import "../TestApp.css";

export class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      number: "",
      schoolName: "",
      major: "",
      graduationDate: "",
      workExp: [],
    };

    this.addGenInfo = this.addGenInfo.bind(this);
    this.editGenInfo = this.editGenInfo.bind(this);
    this.deleteWorkExperience = this.deleteWorkExperience.bind(this);
    this.addWorkExperience = this.addWorkExperience.bind(this);
  }

  clearInputFields() {
    document.querySelector("input[type='text']").value = "";
    document.querySelector("input[type='email']").value = "";
    document.querySelector("input[type='tel']").value = "";
    document.querySelector("input#school").value = "";
    document.querySelector("input#major").value = "";
    document.querySelector("input#graduation-date").value = "";
    document.querySelector("input#company").value = "";
    document.querySelector("input#job-title").value = "";
    document.querySelector("input#start-date").value = "";
    document.querySelector("input#end-date").value = "";
  }

  addGenInfo(e) {
    e.preventDefault();

    this.setState({
      name: document.querySelector("input[type='text']").value,
      email: document.querySelector("input[type='email']").value,
      number: document.querySelector("input[type='tel']").value,
      schoolName: document.querySelector("input#school").value,
      major: document.querySelector("input#major").value,
      graduationDate: document.querySelector("input#graduation-date").value,
      workExp: [...this.state.workExp],
    });
    console.log(this.state);
    this.clearInputFields();
  }

  editGenInfo(e) {
    e.preventDefault();
    document.querySelector("input[type='text']").value = this.state.name;
    document.querySelector("input[type='email']").value = this.state.email;
    document.querySelector("input[type='tel']").value = this.state.number;
    document.querySelector("input#school").value = this.state.schoolName;
    document.querySelector("input#major").value = this.state.major;
    document.querySelector("input#graduation-date").value =
      this.state.graduationDate;
  }

  addWorkExperience(e) {
    e.preventDefault();
    if (
      document.querySelector("input#company").value.length &&
      document.querySelector("input#job-title").value.length &&
      document.querySelector("input#start-date").value.length &&
      document.querySelector("input#end-date").value.length
    ) {
      this.setState({
        name: this.state.name,
        email: this.state.email,
        number: this.state.number,
        schoolName: this.state.schoolName,
        major: this.state.major,
        graduationDate: this.state.graduationDate,
        workExp: [
          ...this.state.workExp,
          [
            uuidv4(),
            document.querySelector("input#company").value,
            document.querySelector("input#job-title").value,
            document.querySelector("input#start-date").value,
            document.querySelector("input#end-date").value,
          ],
        ],
      });
      this.clearInputFields();
    }
  }

  deleteWorkExperience(e) {
    console.log(e.target.id);
    e.preventDefault();
    // remove
    this.setState({
      name: this.state.name,
      email: this.state.email,
      number: this.state.number,
      schoolName: this.state.schoolName,
      major: this.state.major,
      graduationDate: this.state.graduationDate,
      workExp: this.state.workExp.filter((expe) => expe[0] != e.target.id),
    });
  }

  render() {
    let cv;
    let workExpBulletin;
    let workExperiences = this.state.workExp;
    if (this.state.name != "") {
      cv = (
        <>
          <h1>{this.state.name}</h1>
          <h4>{this.state.email}</h4>
          <h4>{this.state.number}</h4>
          <h2>Education</h2>
          <h4>
            {this.state.schoolName.length
              ? `Attended ${this.state.schoolName} and graduated on ${this.state.graduationDate} with a degree in ${this.state.major}`
              : null}
          </h4>
        </>
      );
    } else {
      cv = "";
    }

    if (workExperiences.length) {
      workExpBulletin = (
        <>
          <h2>Work Experiences</h2>
          <ul>
            {workExperiences.map((exp) => (
              <li key={exp[0]}>
                {`${exp[1]} as a ${exp[2]} from ${exp[3]} to ${exp[4]}`}{" "}
                <button
                  type="button"
                  id={exp[0]}
                  onClick={this.deleteWorkExperience}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </>
      );
    }

    return (
      <div id="main-container">
        <div id="form-container">
          <form>
            <h4>General Information</h4>
            <label htmlFor="name">Name</label>
            <input type="text" id="name"></input> <br />
            <label htmlFor="email">Email</label>
            <input type="email" id="email"></input> <br />
            <label htmlFor="number">Phone Number</label>
            <input type="tel" id="number"></input> <br />
            <label htmlFor="school">School Name</label>
            <input type="text" id="school"></input> <br />
            <label htmlFor="major">Major</label>
            <input type="text" id="major"></input> <br />
            <label htmlFor="graduation-date">Graduation Date</label>
            <input type="date" id="graduation-date"></input> <br />
            <button type="button" onClick={this.addGenInfo}>
              Add
            </button>
            {this.state.name != "" ? (
              <>
                <button type="button" onClick={this.editGenInfo}>
                  Edit
                </button>
              </>
            ) : null}
          </form>
          <hr></hr>
          <form>
            <h4>Work Experience</h4>
            <label htmlFor="company">Company</label>
            <input type="text" id="company"></input> <br />
            <label htmlFor="job-title">Job Title</label>
            <input type="text" id="job-title"></input> <br />
            <label htmlFor="start-date">Start Date</label>
            <input type="date" id="start-date"></input>
            <br />
            <label htmlFor="end-date">End Date</label>
            <input type="date" id="end-date"></input>
            <br />
            <button type="submit" onClick={this.addWorkExperience}>
              Add To Work Experiences
            </button>
          </form>
        </div>
        <div id="cv-container">
          <div id="general-info">{cv}</div>
          <div id="work-exp-list">{workExpBulletin}</div>
        </div>
      </div>
    );
  }
}
