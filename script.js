var editModeOn = false;
function toggleEdit() {
  editModeOn = !editModeOn;
  document.getElementById("editButton").classList.toggle("selected");
}
function createStickyNote() {
  var newNote = document.createElement("div");
  // newNote.contentEditable = true;

  //Styling the note
  newNote.className = "stickyNote";
  newNote.style.transform = "rotate(" + Math.random(0, 45) + "deg)";

  document.body.appendChild(newNote);
  const notes = document.getElementsByClassName("stickyNote");

  Array.from(notes).forEach(dragStickyNote);
}

const notes = document.getElementsByClassName("stickyNote");

Array.from(notes).forEach(dragStickyNote);

function dragStickyNote(element) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  element.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    if (editModeOn === true) {
      element.contentEditable = true;
    } else {
      e = e || window.event;
      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;
      element.classList.toggle("dragging");

      //     When user unclicks, it stops dragging the sticky
      document.onmouseup = () => {
        document.onmouseup = null;
        document.onmousemove = null;

        // This lets us style while dragging
        element.classList.toggle("dragging");

        // This is logic to ensure that the sticky note does not leave the screen (with some clipping allowed)
        if (
          element.offsetTop - pos2 <
          document.getElementById("buttonContainer").clientHeight
        ) {
          console.log("Reset Top");
          element.style.top = "50%";
        }
        if (element.offsetLeft - pos1 < 25) {
          element.style.left = "50%";
        }
      };

      document.onmousemove = draggingLogic;
    }

    function draggingLogic(e) {
      e = e || window.event;
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;

      element.style.top = element.offsetTop - pos2 + "px";
      element.style.left = element.offsetLeft - pos1 + "px";
    }
  }
}
function resetArea() {
  let result = confirm("Are you sure you to delete all sticky notes?");

  if (result) {
    document.getElementById("screenWipe").style.animation =
      "screenfire 3s ease-in-out forwards";
    setTimeout(() => {
      const notes = document.getElementsByClassName("stickyNote");
      Array.from(notes).forEach((note) => {
        note.remove();
      });
    }, 1500);
    setTimeout(() => {
      document.getElementById("screenWipe").style.animation = "";
    }, 3000);
  }
}
