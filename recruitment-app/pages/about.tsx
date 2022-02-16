import React from "react";
import DefaultPage from "~/components/defaultpage.tsx";

/**
 * The about us page
 * @returns The about us page. 
 */
export default function About() {
  //Check if user is logged in and return proper page and if not return log in page
  return (
    <DefaultPage header="About us">
        <head>
        <script src="https://code.iconify.design/1/1.0.7/iconify.min.js"></script>
        </head>
        <div className="about_container">
            <div className="about">
                <p>
                    This project is part of the KTH course IV1201 Design of Global Applications. <br></br>
                    See our project at our Github Repository: <a href="https://github.com/WilliamRagstad/IV1201-Project/">https://github.com/WilliamRagstad/IV1201-Project/</a>
                </p>
            </div>
        </div>
        <div className="about_container">
            <ul className="about">
                <li><a href="https://www.linkedin.com/in/william-axbrink/" target="_blank">William Axbrink <span className="iconify"
								data-icon="fa-linkedin" data-inline="true"></span></a></li>
                <li><a href="https://www.linkedin.com/in/william-r%C3%A5gstad-79787988/" target="_blank">William Rågstad <span className="iconify"
								data-icon="fa-linkedin" data-inline="true"></span></a></li>
                <li><a href="https://www.linkedin.com/in/ludvig-lind%C3%A9n-1691a2193/" target="_blank">Ludvig Lindén <span className="iconify"
								data-icon="fa-linkedin" data-inline="true"></span></a></li>
            </ul>
        </div>
    </DefaultPage>
  );
}
