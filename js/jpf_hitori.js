"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 11
   Review Assignment

   Author: Abdifatah Ali
   Date:   January 24, 2020

   Global Variables
   ================
   
   allCells
      References the TD cells within the Hitori table grid.   
      
   Function List
   =============

   startUp()
      Run when the web page is loaded; displays puzzle 1
      and loads the event handlers for the web page buttons.
      
   setupPuzzle()
      Sets up a new puzzle, adding the event handlers for
      every puzzle cell.      

   switchPuzzle(e)
      Swaps one puzzle for another based on the button being clicked
      by the user. Confirms the change before swapping in the
      new puzzle.

   findErrors()
      Highlights the errors in the Hitori puzzle in a red font.
      
   showSolution()
      Shows the solution to the Hitori puzzle
    
   checkSolution()
      Checks the current user's puzzle to verify whether it contains
      the complete and correct solution.

   drawHitori(numbers, blocks, rating)
      Returns a text string of the HTML code to
      display a Hitori puzzle table based on the contents of
      the numbers, blocks, and rating parameters.
	
*/


/* ================================================================= */

/* Declare the global allCells variable that is has undefined value for the variable yet */
var allCells;
/* Insert a command to run the startUp() function when the page is loaded by the browser. */
window.onload = startUp;
/* Add the startUp() function, which displays the contents of Puzzle 1 after the page is loaded and sets up the initial event handlers. */
function startUp() {
   /* Change the inner HTML of the element with the ID, “puzzleTitle” to the text “Puzzle 1”. */
   document.getElementById("puzzleTitle").innerHTML = "Puzzle 1";
   /* Call the drawHitori() function using the hitori1Numbers, hitori1Blocks, and hitori1Rating variables as parameter values and store the HTML code returned by the function in the inner HTML of the page element with the ID “puzzle”. */
   document.getElementById("puzzle").innerHTML = drawHitori(hitori1Numbers, hitori1Blocks, hitori1Rating);
   /* Declare a variable named puzzleButtons referencing the page elements with the class name “puzzles”.*/
   var puzzleButtons = document.getElementsByClassName("puzzles");
   /* Loop through the puzzleButtons object collection and for each button add an event handler that runs the switchPuzzle() function when the button is clicked. */
   for (var i = 0; i < puzzleButtons.length; i++) {
      puzzleButtons[i].onclick = switchPuzzle;
   }
   /* Call the setupPuzzle() function that defines the initial appearance of the first puzzle. */
   setupPuzzle();
   /* Add an event handler to the Check Solutions button to run the findErrors() function when clicked. */
   document.getElementById("check").addEventListener("click", findErrors);
   /*Add an event handler to the Show Solutions button to run the showSolution() function when clicked.*/
   document.getElementById("solve").addEventListener("click", showSolution);
}

/* Add the switchPuzzle() function, which switches the page between the three possible Hitori puzzles. Include the event object e as a parameter of the function */
function switchPuzzle(e) {
   /* Enclose all of the commands in the switchPuzzle() function within an ifstatement that ­displays a confirm dialog box asking users whether they want to switch puzzles even though their work will be lost. If the confirm dialog box returns a value of true, run the commands within the if statement command block. */
   if (confirm("Do you want to switch puzzles even though your work will be lost?")) {
      /* Declare the puzzleID variable equal to the ID of the event object target. */
      var puzzleID = e.target.id;
      /* Change the inner HTML of the element with the ID “puzzleTitle” to the value of the value attribute of the event object target. */
      document.getElementById("puzzleTitle").innerHTML = e.target.value;
      /* Create a switch-case structure with the puzzleID variable that loads the appropriate HTML code for each of the three puzzles into the page element with the ID “puzzle”. Use the drawHitori() function to generate the HTML code and assume that puzzleID is limited to the values “puzzle1”, “puzzle2”, and “puzzle3”. */
      switch (puzzleID) {
         case "puzzle1":
            document.getElementById("puzzle").innerHTML =
               drawHitori(hitori1Numbers, hitori1Blocks, hitori1Rating);
            break;
         case "puzzle2":
            document.getElementById("puzzle").innerHTML =
               drawHitori(hitori2Numbers, hitori2Blocks, hitori2Rating);
            break;
         case "puzzle3":
            document.getElementById("puzzle").innerHTML =
               drawHitori(hitori3Numbers, hitori3Blocks, hitori3Rating);
            break;
      }
      /* Call the setupPuzzle() function to set up the features of the selected puzzle. */
      setupPuzzle();
   }
}

/* Create the setupPuzzle() function to set up the features of the puzzle table. */
function setupPuzzle() {

   var cursorType;
   /* Use the querySelectorAll() method to create an object collection of all of the td elements within the hitoriGrid table and save the object collection in the allCells variable. */
   allCells = document.querySelectorAll("table#hitoriGrid td");
   /* Create a for loop that loops the allCells object collection and, for each cell, change the ­background-color style to white, the font color to black, and the border-radius value to 0. */
   for (var i = 0; i < allCells.length; i++) {
      allCells[i].style.backgroundColor = "white";
      allCells[i].style.color = "black";
      allCells[i].style.borderRadius = "0";
      /* Add a mousedown event listener for each cell in the allCells collection that changes the cell’s appearance depending on whether the Shift key, the Alt key, or no key is pressed by the user. Add the following commands to the anonymous function for the mousedown event: */
      allCells[i].addEventListener("mousedown",
         function (e) {
            /* Change the background color to white, the font color to black, and the border radius to 0 if the user is pressing the Shift key. */
            if (e.shiftKey) {
               e.target.style.backgroundColor = "white";
               e.target.style.color = "black";
               e.target.style.borderRadius = "0";
            }
            /* Change the background color to black, the font color to white, and the border radius to 0 if the user is pressing the Alt key. */
            else if (e.altKey) {
               e.target.style.backgroundColor = "black";
               e.target.style.color = "white";
               e.target.style.borderRadius = "0";
            }
            /* Otherwise, change the background color to rgb(101, 101, 101), the font color to white, and the border radius to 50%. */
            else {
               e.target.style.backgroundColor = "rgb(101,101,101)";
               e.target.style.color = "white";
               e.target.style.borderRadius = "50%";
            }
            /* To avoid inadvertently selecting the text of the table cells, include a command to prevent the default action of the browser in response to the mousedown event. */
            e.preventDefault();
         });


      /* a different mouse cursor depending on whether the user is pressing the Shift key, the Alt key, or no key when the mouse pointer moves over a puzzle cell. Within the for loop, add a mouseover event listener for each puzzle cell that runs an anonymous function that */
      document.addEventListener("mouseover",
         function (e) {
            /* Changes the cursor to the jpf_eraser.png image or the generic cursor named “alias” if the user is pressing the Shift key. */
            if (e.shiftKey) {
               e.target.style.cursor = "url(img/jpf_eraser.png), alias";
            }
            /* Changes the cursor to the jpf_block.png image or the generic cursor named “cell” if the user is pressing the Alt key. */
            else if (e.altKey) {
               e.target.style.cursor = "url(img/jpf_block.png), cell";
            }
            /* Otherwise, changes the cursor to the jpf_circle.png image or the generic cursor named “pointer”. */
            else {
               e.target.style.cursor = "url(img/jpf_circle.png), pointer";
            }
         });
      /* dd an event listener that runs the checkSolution() function in response to the mouseup event to test whether the user has solved the puzzle. */
      document.addEventListener("mouseup", checkSolution);
   }
}

/* Create the findErrors() function that will highlight incorrect cells by displaying the cell number of an incorrect cell in a red font. */
function findErrors() {
   /* Create a for loop that goes through all of the cells in the allCells object collection. If the cell belongs to the blocks class but has a background color of rgb(101, 101, 100) or if it belongs to the circles class but has a black background, change the font color to red. */
   for (var i = 0; i < allCells.length; i++) {
      if ((allCells[i].className === "blocks" &&
         allCells[i].style.backgroundColor === "rgb(101,101,100)")
         ||
         (allCells[i].className === "circles" &&
            allCells[i].style.backgroundColor === "black")) {
         allCells[i].style.color = "red";
      }
   }
   /* Insert a setTimeout() method with a 1-second interval. Within the setTimeout()method, add an anonymous function that loops through every cell in the allCells collection, changing all cells with a font color of red back to white. */
   setTimeout(
      function () {
         for (var i = 0; i < allCells.length; i++) {
            if (allCells[i].style.color === "red") {
               allCells[i].style.color = "white";
            }
         }
      }
      , 1000);

}

function checkSolution() {
   /* Set the initial solved state of the puzzle to true */
   var solved = true;

   /* Loop through the puzzle cells, exiting when an incorrect
      cell is found, setting the solved variable to false */

   for (var i = 0; i < allCells.length; i++) {
      var cellColor = allCells[i].style.backgroundColor;
      var cellClass = allCells[i].className;

      /* A cell is incorrect if it is in the block class and is not black
         or in the circle class and is not white */
      if ((cellClass == "blocks" && cellColor !== "black") ||
         (cellClass == "circles" && cellColor !== "rgb(101, 101, 101)")) {
         solved = false;
         break;
      }
   }

   /* If solved is still true after the loop, display an alert box */
   if (solved) alert("Congratulations! You solved the puzzle!");
}

function showSolution() {
   for (var i = 0; i < allCells.length; i++) {
      allCells[i].style.color = "";
      allCells[i].style.backgroundColor = "";
      allCells[i].style.borderRadius = "";
   };
}

function drawHitori(numbers, blocks, rating) {

   /* Initial HTML String for the Hitori Puzzle */
   var htmlString = "";

   /* numbers is a multidimensional array containing the
      Hitori numbers; blocks is a corresponding 
      multidimensional array containing the location of the
      blocks which are indicated by the # character.
      Non-blocking cells are indicated by a blank character.
  */

   /* Create a Web table with the id, hitoriGrid, containing
      the numeric values. Blocks cells have the class name,
      blocks. Non-blocking cells have the class name, circles
  */

   var totalRows = numbers.length;
   var totalCols = numbers[0].length;
   htmlString = "<table id='hitoriGrid'>";
   htmlString += "<caption>" + rating + "</caption>";


   for (var i = 0; i < totalRows; i++) {
      htmlString += "<tr>";

      for (var j = 0; j < totalCols; j++) {
         if (blocks[i][j] == "#") htmlString += "<td  class='blocks'>"
         else htmlString += "<td class='circles'>";

         htmlString += numbers[i][j];
         htmlString += "</td>";
      }

      htmlString += "</tr>";
   }

   htmlString += "</table>";

   return htmlString;
}