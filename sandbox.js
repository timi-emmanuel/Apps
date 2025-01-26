// vowel counter 
const  input = document.querySelector('input'),
buttons = document.querySelectorAll('#vowelBtns button'),
vowels = ['a', 'e', 'i', 'o', 'u'];

function counters(){
  let word = input.value.trim();
  console.log(word)
  let vowelArray = [],
  cosonantArray = [];
  for(let char of word){
    if(vowels.includes(char)){
      vowelArray.push(char);          
   }  else{
    cosonantArray.push(char)
   }}      
  let vowelResult = vowelArray.length,
  consonantResult = cosonantArray.length;
  result = [vowelResult,consonantResult];
  return result 
}
buttons.forEach( button => {
button.addEventListener('click', ({target}) => {
  let word = input.value;
  if(!word){
    alert('input a word or a sentence')
    return}
  else{
    let myFunction = counters();
  if(target.id === 'countVowel'){
     target.textContent = `Vowel count is ${myFunction[0]}`;
    return 
  };
  if(target.id === 'countConsonant'){
     target.textContent = `consonant count is ${myFunction[1]}`;
     return
  }}  
})
});

// Note Taker
const textArea = document.querySelector("#text"),
  addNoteBtn = document.querySelector("#addNote"),
  defaultParagraph = document.querySelector("#default-message");

// Function to add a new note
function addNote() {
  let note = textArea.value.trim(); // Trim whitespace
  if (!note) {
    alert("Input a note");
    return;
  }

  defaultParagraph.classList.add("hidden");

  // Calculate the current note number dynamically
  const noteSection = document.querySelector("#note-section");
  const currentNoteCount = noteSection.children.length;
  const noteNumber = currentNoteCount + 1; // Ensure first note starts at 1

  // Create elements for the new note
  let container = document.createElement("div");
  container.classList.add(
    "flex",
    "flex-col",
    "gap-2",
    "p-2",
    "border",
    "border-gray-300",
    "rounded",
    "relative"
  );

  let paragraph = document.createElement("p");
  paragraph.textContent = note;
  paragraph.classList.add("overflow-hidden", "text-ellipsis", "whitespace-nowrap");

  let heading = document.createElement("h1");
  heading.textContent = `NOTE ${noteNumber}`;
  heading.classList.add("text-lg");

  let buttonContainer = document.createElement("div");
  buttonContainer.classList.add("flex", "gap-2");

  // View Details Button
  let viewButton = document.createElement("button");
  viewButton.textContent = "View Details";
  viewButton.classList.add(
    "bg-blue-500",
    "hover:bg-blue-700",
    "text-white",
    "p-2",
    "rounded-md",
    "text-sm"
  );

  viewButton.addEventListener("click", () => {
    showModal(note); // Pass the specific note's text to the modal
  });

  // Delete Button
  let deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add(
    "bg-red-500",
    "hover:bg-red-700",
    "text-white",
    "p-2",
    "rounded-md",
    "text-sm"
  );

  // Add event listener to delete the note
  deleteButton.addEventListener("click", () => {
    container.remove(); // Remove the note container
    updateNoteNumbers(); // Update note numbers
    // Check if there are no more notes and show the default message
    if (noteSection.children.length === 0) {
      defaultParagraph.classList.remove("hidden");
    }
  });

  // Append buttons and elements
  buttonContainer.append(viewButton, deleteButton);
  container.append(heading, paragraph, buttonContainer);

  // Add the container to the note section
  noteSection.append(container);

  // Clear the text area
  textArea.value = "";
}

// Add note button click listener
addNoteBtn.addEventListener("click", addNote);

// Listen for Enter key in the textarea
textArea.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault(); // Prevent a new line in the textarea
    addNote();
  }
});

// Function to update note numbers dynamically
function updateNoteNumbers() {
  const noteSection = document.querySelector("#note-section");
  const notes = noteSection.querySelectorAll("h1"); // Select all headings
  
  notes.forEach((note, index) => {
    note.textContent = `NOTE ${index + 1}`; // Update the text
    console.log(notes)
  });
}

function showModal(note) {
  const modal = document.getElementById("modal");
  const modalParagraph = document.querySelector("#modal-paragraph");

  // Set the modal content dynamically
  modalParagraph.textContent = note
 
  // Show the modal
  modal.classList.replace("hidden", "flex");
}

// Function to hide the modal
function closeModal() {
  const modal = document.getElementById("modal");
  modal.classList.replace("flex", "hidden");
}
