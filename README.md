# JavaScript's basics workshop

## Into

- What is HTML?
- What is CSS?
- What is JavaScript?

### Application entry point

All projects begin with creating single file! Create application entry point, which will be HTML document file
named `index.html`

- Base HTML document

1. Create empty file `index.html`
2. Define document base structure
   - define `!doctype` tag with attribute `html` on the first line
   - define `html` tag with `head` and `body` tags. Set lang attribute to `en`
   - inside `head` tag
      - add `meta` tag with attribute `charset` with value `utf-8` to set page encoding
      - add `title` tag with text children `Play Hangman!`
3. Inside `body` add `div` tag with text children `Test!`
4. Open file in a browser to see if it works. You should see text from `div` element and title of window in Tab should
   be as You defined in `title` tag

## Linking files

We need to separate code into files, according to its purpose. Connect style sheet and script file to your HTML
document.

- loading stylesheets
- loading scripts
- printing to browser console

1. Create empty file called `styles.css`
   - Add styling for `body`. You can create style rule with template below:
       ```text
         [tagName or selector]: {
             [cssProperty]: value;
         }       
       ```
   - Set rule `family-font` with value `sans-serif` for tag `body`
2. Link style sheet to HTML document. In `head` tag, inside document, add new tag `link` with 3 attributes
   - `rel` attribute set linking relation, set value to `stylesheet`
   - `type` attribute with value `text/css`
   - `href` attribute with file name to link with value `styles.css`
   - Open `index.html` in browser and inspect `div` element to check if stylesheet is loaded.
3. Create empty file `game.js`
   - inside add following line:
     `console.log('game script loaded');`
4. Link script to HTML document. Add `script` tag with 2 attributes as last child of `body` tag:
   - `type` with value `text/javascript` so browser can parse text as javascript
   - `src` with value `game.js`
   - Check browser console to see if message is printed

## Manipulating DOM

To make dynamic pages we need to manipulate DOM. We can edit, add or delete HTML elements.

- finding DOM element with `id` attribute
- appending node to DOM
- `document` built-in functions
- storing references using `const`

1. Inside `index.html` add `id` attribute with value `gameContent` to `div` inside `body` to be able to find this element easily in
   javascript code
2. Inside `game.js`:
   - Using built-in function `document.getElementById` find `div` with id `gameContent`
      - `document.getElementById` function takes one parameter - element id
      - store returned value using `const` for later usage.
   - Clear element content by changing element attribute `textConent` to empty string `''`
      - To access element attribute use dot operator `gameContent.textContent` and attribute name.
      - To change attribute value, just assign new value directly as so:
         - `element.attribute = newValue;`
   - Check browser to see that text initially loaded with html file is cleared
   - Create header element with text `Welcome to Hangman!`
      - To create element use `document.createElement`
         - Pass one argument to function with tagName with value `h1`
         - Set `textContent` attribute with value `Welcome to Hangman!`
         - store returned value using `const` with name `viewTitle`
      - Append created header element to previously stored found element
         - To append children to element use method `appendChild`
            - `element.appendChild(childElement);`
   - Check browser to see changes. Investigate Element tab in devTools to see html structure

## Handling user input

Every web application is based on user events. Handle `blur` event in `input` element, to see what character user
is typing.

- listening for elements events
- inline functions

1. Create `div` element with text `Enter your name:`
   - store reference using `const` with name `nameInputLabel`
2. Create `input` element
   - store reference using `const` with name `nameInput`
3. Add event listener to `input` element
   - to add event listener to element use element method `addEventListener`
      - first argument of this method is event name, listen for an element blur event (fired when element loses focus) which value is `blur`
      - second argument is function which will be called every times element fires proper event
         - inside event listener function add call to `console.log` and print value of event target
            - event listener function first argument is event object which describes an event that took place
            - example:
             ```javascript
               nameInput.addEventListener('input', event => {
                    console.log(event.target.value);
               });
             ``` 
4. Append new elements to `div` with game content
5. Try entering some text and lose focus by a click outside input to see if console is printing text entered in input

## Mutable values

Some values change over time. Use mutable `let` to store some mutable data.

- mutable reference with `let`

1. Create variable for storing value from input with name `name` at file beginning
   - to store mutable value use `let`
   - while defining, assign empty string: `''`
   - `let` value can be reassigned while `const` not
2. Inside input event listener assign value from an event to created variable
3. After assigning print value of created variable, instead directly reading from event to check if value was stored correctly.

## Encapsulating logic

While writing code, it's getting longer and more complicated. Use function to group and encapsulate related logic.

- defining own functions with `function` keyword

1. Create function called `welcomeView`, that takes no arguments
   - To create function use key word `function` followed by function name and then round parenthesis
   - example:
       ```javascript
         function nameIt() {
           // instructions
         }
       ```
2. Move code to function (everything besides `let` for storing name, `const` for storing reference to div with id `gameContent` and clearing its content)
   - creating header, label and input
   - event listening
   - appending to DOM
3. Call created function
   - check browser, there should be no visible changes

## Abstracting rendering

Drawing to screen is repeatable process. We need to abstract rendering logic to function.

- conditions
- `if` statement

1. Create mutable variable for storing active view name, with name `activeView`
   - initialize variable with value `welcome`
2. Create function called `render` with no arguments
3. Move line with setting `gameContent.textContent` to empty string to `render` function
4. Inside `render` check which view render
   - use `if` statement
      - example `if` statement:
       ```javascript
       if (condition1) {
         // do something
       }
       ```
   - if `activeView` is equal to `welcome` call `welcomeView`
5. Check browser if there is still no changes in application visually

## Changing view

Every modern application is capable of changing whole view in instant. Create abstraction for changing view.

- contacting strings
- `else if`

1. Create function `playView`
   - inside create `h1` element with text equal to `'Hi, ' + name`
2. Inside `welcomeView` function
   - Create `button` element with text equal to `Play game!`
   - Add event listener for event `click`
      - on every click change value of `activeView` to `play`
      - call `render` function
   - append button to game content
3. Add additional condition statement inside `render` using `else if`, check if `activeView` is equal `play`
   - call `playView` function
4. Check browser, test if clicking in the button with text `Play game!` changes view

## Views loop

Every game needs to be endless in terms of state. After ending game, we want to start over.

- `else` statement

1. Create function `endGameView` with no arguments
   - create element `h1` with text `Game finished!`
   - create `button` element with text `Play again`
      - add event listener for `click` event
         - change active view to welcome view
         - call `render`
   - append elements to game content
2. Inside `playView` create button with text `Give up`
   - listen for `click` event
      - change `activeView` value to `endGame`
      - call `render` function
   - append element to game content
3. Append the button to game content
4. Inside `render` function add `else` statement after `else if` statement with call to `endGameView` function

## Storing game state

As game grows in logic, it stores more data, keeping it spread out all over code base is disaster. Define all game state
as single object.

- objects

1. Create an object named `gameState`
   - example:
    ```javascript
    const objectName = {
       key1: 'value',
       key2: 123,
    }
    ```
2. Add field `name` with initial value `''`
3. Add field `activeView` with initial value `welcome`
4. Change all usage of `name` and `activeView` variables to use `gameState` object
5. Delete unused variables
5. Check browser to see if everything works

## SPA like updating content

Create more elastic way of rendering view. Instead of modifying game content, view should return new content to be
shown.

- Updating objects

1. Create function `gameStateUpdate` with body below:
    ```javascript
    function gameStateUpdate(newGameState) {
      Object.assign(gameState, newGameState);
      render();
    }
    ```
2. Add 3 arguments to all view functions
   - first argument named `contnt`
   - second argument named `state`
   - third argument named `stateUpdate`
3. Pass `gameCotent`, `gameState` and `stateUpdate` to every view call
4. Change lines modifying `gameState` directly to calls with `stateUpdate` with proper partial state updated
   - example:
    ```javascript
    stateUpdate({ activeView: 'play' });
    ```
   - remove call to `render` - it's called by state update function now
5. Change `gameState` usage inside views to `state`
6. Change `gameContent` usage inside views to `content`
7. Set value for input while rendering welcome view with stored name
   - access current input value with `value` field of element and assign new value from store
8. Inside render function
   - add new mutable variable `viewContent` without initializer
   - inside `if` statement assign returned value to `viewContent`
   - after `if` statement append `viewContent` to game content
9. Check browser to see that input won't change value - everything else should work as previously

## Selecting letters

Add some real game logic. Draw all alphabet letters in play view, store clicked letters and disable one that were
already clicked.

- Arrays
- `for` loop

1. At the beginning of file create variable to store all alphabet letters using array
   - example array syntax
    ```javascript
    const array = ['element1', 'element2'];
    ```
   - use english alphabet
2. Add to `gameState` object new field `selectedLetters`, and initialize it with empty array
3. Inside `playView` create `div` element for storing letters buttons
4. Iterate over all letters and create `button` element
   - to iterate overall letters use `for` loop
    ```javascript
    for (let i = 0; i < 10; i++) {
       // iteration for 10 times
    }
    ```
   - set button text to equal iterated letter
   - set `disabled` attribute by checking in `state.selectedLetters` includes iterated letter
      - use array method `includes` which takes one argument - element in an array you are looking for
   - add event listener for click event for every letter button
      - on a click, update state so `state.selectedLetters` includes clicked letter
         - use array method `concat`
   - append the button to buttons container
5. Append buttons container to view content

## Phrases

We need so phrase to guess. Create some phrases and make some randomness logic while getting new phrase to guess.

- array function iterating
- logic operators
- randomness

1. At the beginning of file create array for holding phrases that user will be guessing
2. Create function for getting random phrase
   - Inside create variable for holding random phrases array index
      - Use `Math.floor` and `Math.random` and phrases array length
      - return phrase at found index
3. Add a new field to game state called `secretPhrase` with initial value empty string
4. Inside `welcomeView` when user click button
   - update state so `secretPhrase` inside game state will be random phrase
      - use previously created function to get random phrase
   - reset `selectedLetters` to empty array
5. Inside `playView`
   - Create a container for phrase letters (`div`)
   - Split `state.secretPhrase` into array holding single letter
      - use string method `string.split(seperator)`
      - split by empty string `''`
   - Iterate over every letter
      - use array function to iterate:
       ```javascript
       [1,2,3].forEach(number => {
          // iterates 3 times, every time argument `number` holding another element from iterated array
       }) 
       ```
      - create span element
      - check if letter is visible
         - it is visible if letter is space character
         - OR it is visible if letter is included in `state.selectedLetters`
         - use OR operator `||`
   - Set element text using previously calculated value (is letter visible) with ternary expression
      - example ternary expression:
       ```text
       const result = condition ? ifConditionTrue : ifConditionFalse
       ```
      - use asterisk character `*`  for hidden letters
   - Append a span to letters container
   - Append letters container to view before letters buttons container

## Detecting game end and simple scoring

We need to add some logic for game to end. Every time user sees all letters in a phrase - call it end game.

- string template
- `every` method on array

1. Inside play view add mutable variable for storing count of visible letters
   - initialize it with number `0`
2. Add to game state new field `mistakes` and initialize it with number `0`
3. Inside letter button listener
   - check if clicked letter was mistake
      - use string method `includes`
         - example
          ```javascript
          'abc'.includes('a'); // -> true
          ```
   - store check result in variable
   - store selected letters to const (`const selectedLetters = state.selectedLetters.concat(letter);`)
      - inside `stateUpdate` use object short notation `{ selectedLetters: selectedLetters}` is the same as `{ selectedLetters }`
   - check if all letters are visible after selecting letter
      - split `state.secretPhrase` with empty string to iterate over all letters using `every` method
         - array method `every` return true, only if all iterations on array returns true
         - while iterating check if `selectedLetters` includes iterated letter
            - if iterated letter is space, return true
         - store iteration result
   - update active view to `end` if all letters are visible or to `play` if not

4. Increase mistakes count if letter button was mistake
   - use ternary expression
   - for a good click don't change value
5. In end view create `h3` element
   - use string template to interpolate a message for user, containing information about mistakes count
   - example string template
    ```javascript
    const foo = 123;
    const text = `count: ${foo}`;
    ```
6. Clear `mistakes` and `selectedLetters` for every time user click `Play game!` button

## Persisting game state

Every time we refresh our page, progress is lost. Persist game state using browser local storage.

- localStorage
- JSON api

1. Create variable for persisted game state read from local storage
   - initialize it with loaded item from local storage
   - example
    ```javascript
    const storedValue = localStorage.getItem('key');
    ```
2. While initializing game state variable check if loaded game state from local storage is not empty and use this value
   to initialize game state
   - use ternary expression while assigning value
   - parse value using JSON api
      - use `parse` method from api to parse string into object
       ```javascript
       const parsedObject = JSON.parse('{ "a": true }'); // -> { a: true }
       ```
3. Update `gameStateUpdate` function, so it updates local storage on every state update
   - use `setItem` method from local storage api
   - parse game state object to string using JSON api
      - use `stringify` method
       ```javascript
       const stringifiedObject = JSON.stringify({ a: true }); // -> '{ "a": true }'
       ```

## Drawing Hangman

Let draw Hangman! Every time, user make another mistake, draw another hangman part.

- template tag

1. Add to `index.html` code below, after `div` with id `gameContent`
    ```html
    <template id="hangman">
        <div class="hangmanContainer">
            <div class="hangmanRow">
                <div></div>
                <div class="hangmanHead"></div>
                <div></div>
            </div>
            <div class="hangmanRow">
                <div class="hangmanLeftHand"></div>
                <div class="hangmanBody"></div>
                <div class="hangmanRightHand"></div>
            </div>
            <div class="hangmanRow">
                <div class="hangmanLeftLeg"></div>
                <div></div>
                <div class="hangmanRightLeg"</div>
        </div>
        </div>
    </template>
    ```
2. Add styles below to `styles.css`
    ```css
    .hangmanContainer {
        width: 200px;
        display: flex;
        flex-direction: column;
    }
    
    .hangmanRow {
        display: flex;
        justify-content: center;
    }
    
    .hangmanHead {
        border: solid 5px;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        opacity: 0;
    }
    
    .hangmanBody {
        border: solid 3px;
        height: 20px;
        opacity: 0;
    }
    
    .hangmanLeftHand {
        border: solid;
        transform: rotate(45deg);
        margin-right: 5px;
        opacity: 0;
    }
    
    .hangmanRightHand {
        border: solid;
        transform: rotate(-45deg);
        margin-left: 5px;
        opacity: 0;
    }
    
    .hangmanLeftLeg {
        border: solid;
        height: 30px;
        transform: rotate(25deg);
        margin-right: 5px;
        opacity: 0;
    }
    
    .hangmanRightLeg {
        border: solid;
        height: 30px;
        transform: rotate(-25deg);
        margin-left: 5px;
        opacity: 0;
    }
    ```
3. Inside play view using `document.querySelector` find `template` element with id `hangman`
   - store to variable
4. Clone template using template element method `content.cloneNode`
   - pass `true` as argument
5. Find element with class `hangmanHead` inside cloned element using `querySelector` method
   - pass proper css selector as argument
   - store it as variable
6. Repeat process for `hangmanBody`, `hangmanLeftHand`, `hangmanRightHand`, `hangmanLeftLeg`, `hangmanRightLeg`
7. Set opacity style of every Hangman part
   - change element style by changing `style` property
      - change `opacity` style property
      - check mistakes count and assign proper opacity value for every part
         - if mistakes count is greater than `0` set head opacity to `'1'`
         - for every mistake show one part more

## Split code into separate files

Keeping all code in one file is not a good idea. Extract view functions to separate files.

- global scope
- closures

1. Create separate files for views functions
2. Add scripts in `index.html`
   - add before `game.js`
3. Move code to files

## Additional challenges

After creating base project, You can try adding more functionalities by Your own, without steps with explanation.

1. Game timer. Add a timer which will count down from fixed value 1a. Add way to set up time on first view
2. Keyboard support. Try adding keyboard key pressed handling to update app state
3. Score board. Add score board. It can be displayed on the last view, after game is over. Use player time, mistakes and
   phrase characters count to sort results.
4. Load phreses from file using `fetch` api.

## Hosting site on github pages

When your work is done, it is time to share it with world! Publish your project using GitHub pages

1. Go push changes to github
2. Go to project settings
3. Scroll down to `GitHub Pages` section
4. Choose `master` branch as source
5. Done! Go to `username.gitbub.io/project-name`

## Dictionary

- Tag/TagName - html element name, for example `div`
- Element/node - using proper tags You can create elements for example `<div>hello</div>`
- Attribute or element attribute - element can have additional attributes, for example: `charset` is attribute of `meta`
  tag - `<meta charset="utf-8">`
- Children of element/node are descent of this element, for example: `<div><p>hello</p></div>`, element with tag `p` is
  children of element with tag `div`
