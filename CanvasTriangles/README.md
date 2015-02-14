#Canvas Triangles

#### A small app that allows you to draw triangles on a canvas and save them into the local storage of your browser and load them later.

Original task description: [HackBulgaria's NodeJS course task to apply](https://github.com/HackBulgaria/NodeJS-1/blob/master/TasksForCourseApply/2-Canvas-Triangles.md)
### Drawing Triangles On Canvas

Implement a web application, that uses HTML5 Canvas where users can draw triangles in different colors.

A quick reminder for what a triangle is - http://en.wikipedia.org/wiki/Triangle

The app should have functionality for saving all drawn triangles to a `localStorage` so they can be loaded after this.

#### Requirements

##### Drawing Triangles with fill color

Every tree points that the user clicks on the canvas, should create a new triangle. As simple as that.

Every triangle should have a fill color, that should be selected by a color input. Once a color is selected, every next triangle is filled by that color.

[__Use an HTML 5 color input!__](http://www.w3schools.com/html/tryit.asp?filename=tryhtml5_input_type_color)

The position of the color input is up to you!

##### Clearing the canvas

There should be a button called "Clear Canvas" which clears the entire canvas for new triangles!

#### Bonus Round - If you want to

##### Saving the canvas to local storage

__There should be a button called "Save to local storage".__

Once the button is clicked, the app should prompt the user to give name for the current save.

This means we can have multiple saves for our canvas!

##### Loading the canvas from local storage

There should be a drop-down menu with all saves from the local storage and a button __Load!__

Once a save is selected and the button is clicked, the canvas should be populated with the triangles from the save.
