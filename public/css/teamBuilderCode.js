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
        alert("Team saved: " + team.join(", "));
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
