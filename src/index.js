import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import fetch from "./fake-fetch";
import "./styles.css";

function Employees() {
  const [list, setList] = useState(null);

  useEffect(() => {
    let controller = new AbortController();
    (async () => {
      try {
        const response = await fetch("/employees/list", {
          signal: controller.signal
        });
        setList(await response.json());
        controller = null;
      } catch (e) {
        // Handle fetch error
        console.log("error", e);
      }
    })();
    // clean up
    return () => controller?.abort();
  }, []);

  return (
    <div className="list">
      {list === null ? "Fetching employees..." : null}
      {list?.map((name) => (
        <div className="item" key={name}>
          {name}
        </div>
      ))}
    </div>
  );
}

function About() {
  return (
    <div className="about">
      <p>Our restaurant is located in a lovely place with a great view.</p>
      <p>Our employees are dedicated to serve you the best dishes!</p>
    </div>
  );
}

function App() {
  const [page, setPage] = useState("employees");

  const showEmployeesPage = () => setPage("employees");
  const showAboutPage = () => setPage("about");

  return (
    <div className="App">
      <h2>My restaurant</h2>
      <a href="#" onClick={showEmployeesPage}>
        Employees Page
      </a>
      &nbsp;
      <a href="#" onClick={showAboutPage}>
        About Page
      </a>
      {page === "employees" ? <Employees /> : <About />}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
