import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "../TestApp.css";

export const Form = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [major, setMajor] = useState("");
  const [graduationDate, setGraduationDate] = useState("");
  const [workExp, setWorkExp] = useState([]);

  function clearInputFields() {
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

  function addGenInfo(e) {
    e.preventDefault();
    setName(document.querySelector("input[type='text']").value);
    setEmail(document.querySelector("input[type='email']").value);
    setNumber(document.querySelector("input[type='tel']").value);
    setSchoolName(document.querySelector("input#school").value);
    setMajor(document.querySelector("input#major").value);
    setGraduationDate(document.querySelector("input#graduation-date").value);
    clearInputFields();
  }

  function editGenInfo(e) {
    e.preventDefault();
    document.querySelector("input[type='text']").value = name;
    document.querySelector("input[type='email']").value = email;
    document.querySelector("input[type='tel']").value = number;
    document.querySelector("input#school").value = schoolName;
    document.querySelector("input#major").value = major;
    document.querySelector("input#graduation-date").value = graduationDate;
  }

  function addWorkExperience(e) {
    e.preventDefault();
    if (
      document.querySelector("input#company").value.length &&
      document.querySelector("input#job-title").value.length &&
      document.querySelector("input#start-date").value.length &&
      document.querySelector("input#end-date").value.length
    ) {
      setWorkExp([
        ...workExp,
        [
          uuidv4(),
          document.querySelector("input#company").value,
          document.querySelector("input#job-title").value,
          document.querySelector("input#start-date").value,
          document.querySelector("input#end-date").value,
        ],
      ]);
    }
    clearInputFields();
  }

  function deleteWorkExperience(e) {
    e.preventDefault();
    setWorkExp(workExp.filter((expe) => expe[0] !== e.target.id));
  }

  useEffect(() => {
    console.log({ name, schoolName, workExp });
  });

  let cv;
  let workExperiencesBulletin;
  if (name.length) {
    cv = (
      <>
        <h1>{name}</h1>
        <h4>{email}</h4>
        <h4>{number}</h4>
        <h2>Education</h2>
        <h4>
          {schoolName.length
            ? `Attended ${schoolName} and graduated on ${graduationDate} with a degree in ${major}`
            : null}
        </h4>
      </>
    );
  } else {
    cv = "";
  }
  if (workExp.length) {
    workExperiencesBulletin = (
      <>
        <h2>Work Experiences</h2>
        <ul>
          {workExp.map((exp) => (
            <li key={exp[0]}>
              {`${exp[1]} as a ${exp[2]} from ${exp[3]} to ${exp[4]}`}{" "}
              <button type="button" id={exp[0]} onClick={deleteWorkExperience}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </>
    );
  }

  return (
    <div>
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
            <button type="button" onClick={addGenInfo}>
              Add
            </button>
            {name !== "" ? (
              <>
                <button type="button" onClick={editGenInfo}>
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
            <button type="submit" onClick={addWorkExperience}>
              Add To Work Experiences
            </button>
          </form>
        </div>
        <div id="cv-container">
          <div id="general-info">{cv}</div>
          <div id="work-exp-list">{workExperiencesBulletin}</div>
        </div>
      </div>
    </div>
  );
};
