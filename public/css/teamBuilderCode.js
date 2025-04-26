const router = require("../../routes");
const { team } = require("../models");

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll("button");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      console.log("clicked " + button.id);

      if (button.id === "team-save-button") {
        const team = [
          document.getElementById("team-slot-1").textContent,
          document.getElementById("team-slot-2").textContent,
          document.getElementById("team-slot-3").textContent,
          document.getElementById("team-slot-4").textContent,
          document.getElementById("team-slot-5").textContent,
        ];
        console.log(team);
        if (team.includes("slot empty")) {
          alert("Please fill all team slots before saving.");
          return;
        } else {
          try {
            //const teamInfo = team.join(", ");

            fetch("/auth/team", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                member1: team[0],
                member2: team[1],
                member3: team[2],
                member4: team[3],
                member5: team[4],
              }),
            })
              .then((response) => {
                if (response.ok) {
                  return response.json();
                } else {
                  alert("Failed to save team.");
                }
              })
              .then((data) => {
                console.log(data);
                alert("Team saved successfully!");
              });
          } catch (err) {
            console.log(err);
            res.status(500).json(err);
            alert("Failed to save team.");
          }
        }
      } else if (button.id === "team-clear-button") {
        document.getElementById("team-slot-1").textContent = "slot empty";
        document.getElementById("team-slot-2").textContent = "slot empty";
        document.getElementById("team-slot-3").textContent = "slot empty";
        document.getElementById("team-slot-4").textContent = "slot empty";
        document.getElementById("team-slot-5").textContent = "slot empty";
      } else if (
        button.id === document.getElementById("team-slot-1").textContent ||
        button.id === document.getElementById("team-slot-2").textContent ||
        button.id === document.getElementById("team-slot-3").textContent ||
        button.id === document.getElementById("team-slot-4").textContent ||
        button.id === document.getElementById("team-slot-5").textContent
      ) {
        alert("This character is already on your team.");
      } else if (
        document.getElementById("team-slot-1").textContent === "slot empty"
      ) {
        document.getElementById("team-slot-1").textContent = button.id;
      } else if (
        document.getElementById("team-slot-2").textContent === "slot empty"
      ) {
        document.getElementById("team-slot-2").textContent = button.id;
      } else if (
        document.getElementById("team-slot-3").textContent === "slot empty"
      ) {
        document.getElementById("team-slot-3").textContent = button.id;
      } else if (
        document.getElementById("team-slot-4").textContent === "slot empty"
      ) {
        document.getElementById("team-slot-4").textContent = button.id;
      } else if (
        document.getElementById("team-slot-5").textContent === "slot empty"
      ) {
        document.getElementById("team-slot-5").textContent = button.id;
      } else {
        let temp4 = document.getElementById("team-slot-4").textContent;
        let temp3 = document.getElementById("team-slot-3").textContent;
        let temp2 = document.getElementById("team-slot-2").textContent;
        let temp1 = document.getElementById("team-slot-1").textContent;
        document.getElementById("team-slot-1").textContent = button.id;
        document.getElementById("team-slot-2").textContent = temp1;
        document.getElementById("team-slot-3").textContent = temp2;
        document.getElementById("team-slot-4").textContent = temp3;
        document.getElementById("team-slot-5").textContent = temp4;
      }
    });
  });
});
