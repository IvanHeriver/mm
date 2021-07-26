# Mind Master

Are you a mind master? Test your skill in this famous deduction game. The web app is available at [https://ivanheriver.github.io/mm/](https://ivanheriver.github.io/mm/)

This game is a simple project that I developed as an exercice to get familiar with the React JS framework. 

## How to play

The figure below describes the different elements of the app when you first arrive in the app.

![help_img_1](/public/help/help_1.png)

The goal of the game is to guess the colors of the grey circles at the top.
To achieve this goal you can submit guesses which will give you clues: each guess you submit gives you the following pieces of information:
* the number of right colors in the right spots
* the number of right colors in wrong spots

By deduction, after a certain number of guesses, you can eventually find the solution to the problem.

To create a guess you must select a color for each grey circle in the current guess.Press the mouse button (or touch with you finger) one of the grey circle (this will make the color selector appear) and then drag in the direction of the desired color.
Note that you can change the way the colors are selected in the configuration page: instead of click & drag mode, you can simply enable the click & click mode where the first click open the color selector and the second click select the desired color.

![help_img_2](/public/help/help_2.png)

After selecting all the colors of your current guess and submitting you guess (by clicking on the play button), the game gives you a certain number (can be none) of black and white pegs at the left of your guess that correspond to:
* **black pegs**: the number of right colors in the right spots
* **white pegs**: the number of right colors in wrong spots

In the example given below, the two white pegs indicates that two of the colors of your guess where right colors but in wrong spots.

![help_img_3](/public/help/help_3.png)

After a few guess you should be able to find the solutions such as in the example below.

![help_img_4](/public/help/help_4.png)

You can customize the difficulty of the game in the configuration page with: 
* the number of different colors (from 3 to 8 colors, default is 6)
* the number of spots in a problem (from 3 to 8 spots, default is 4)

