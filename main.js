window.onload = function () {

  var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
    'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
    't', 'u', 'v', 'w', 'x', 'y', 'z'];

  var categories;
  var chosenCategory;
  var getHint;
  var word;
  var guess;
  var geusses = [];
  var lives;
  var counter;
  var space;


  var showLives = document.getElementById("mylives");
  var showCatagory = document.getElementById("scatagory");
  var getHint = document.getElementById("hint");
  var showClue = document.getElementById("clue");




  /**
   * Create the buttons to chose the different alphabet letters
   * 
   */
  var buttons = function () {
    myButtons = document.getElementById('buttons');
    letters = document.createElement('ul');

    for (var i = 0; i < alphabet.length; i++) {
      letters.id = 'alphabet';
      list = document.createElement('li');
      list.id = 'letter';
      list.innerHTML = alphabet[i];
      check();
      myButtons.appendChild(letters);
      letters.appendChild(list);
    }
  }



  /**
   * Category is selected here
   * 
   */
  var selectCat = function () {
    if (chosenCategory === categories[0]) {
      catagoryName.innerHTML = "The Chosen Category Is Object-oriented Programming";
    } else if (chosenCategory === categories[1]) {
      catagoryName.innerHTML = "The Chosen Category Is Machine Learning";
    } else if (chosenCategory === categories[2]) {
      catagoryName.innerHTML = "The Chosen Category Is Data Analysis";
    }
  }

  /**
   * 
   * User starts guessing the letters --> right or wrong
   */
  result = function () {
    wordHolder = document.getElementById('hold');
    correct = document.createElement('ul');

    for (var i = 0; i < word.length; i++) {
      correct.setAttribute('id', 'my-word');
      guess = document.createElement('li');
      guess.setAttribute('class', 'guess');
      if (word[i] === "-") {
        guess.innerHTML = "-";
        space = 1;
      } else {
        guess.innerHTML = "_";
      }

      geusses.push(guess);
      wordHolder.appendChild(correct);
      correct.appendChild(guess);
    }
  }


  /**
   * Lives are shown
   * 
   */
  comments = function () {
    showLives.innerHTML = "You have " + lives + " lives";
    if (lives < 1) {
      showLives.innerHTML = "Game Over";
    }
    for (var i = 0; i < geusses.length; i++) {
      if (counter + space === geusses.length) {
        showLives.innerHTML = "You Win!";
      }
    }
  }


  /**
   * Stickman shows how many lives are left
   * 
   */
  var animate = function () {
    var drawMe = lives;
    drawArray[drawMe]();
  }



  /**
   * Stickman
   * 
   */
  canvas = function () {

    myStickman = document.getElementById("stickman");
    context = myStickman.getContext('2d');
    context.beginPath();
    context.strokeStyle = "#fff";
    context.lineWidth = 2;
  };

  head = function () {
    myStickman = document.getElementById("stickman");
    context = myStickman.getContext('2d');
    context.beginPath();
    context.arc(60, 25, 10, 0, Math.PI * 2, true);
    context.stroke();
  }

  draw = function ($pathFromx, $pathFromy, $pathTox, $pathToy) {

    context.moveTo($pathFromx, $pathFromy);
    context.lineTo($pathTox, $pathToy);
    context.stroke();
  }

  frame1 = function () {
    draw(0, 150, 150, 150);
  };

  frame2 = function () {
    draw(10, 0, 10, 600);
  };

  frame3 = function () {
    draw(0, 5, 70, 5);
  };

  frame4 = function () {
    draw(60, 5, 60, 15);
  };

  torso = function () {
    draw(60, 36, 60, 70);
  };

  rightArm = function () {
    draw(60, 46, 100, 50);
  };

  leftArm = function () {
    draw(60, 46, 20, 50);
  };

  rightLeg = function () {
    draw(60, 70, 100, 100);
  };

  leftLeg = function () {
    draw(60, 70, 20, 100);
  };

  drawArray = [rightLeg, leftLeg, rightArm, leftArm, torso, head, frame4, frame3, frame2, frame1];



  /**
   * clicking functionality
   * 
   */
  check = function () {
    list.onclick = function () {
      var geuss = (this.innerHTML);
      this.setAttribute("class", "active");
      this.onclick = null;
      for (var i = 0; i < word.length; i++) {
        if (word[i] === geuss) {
          geusses[i].innerHTML = geuss;
          counter += 1;
        }
      }
      var j = (word.indexOf(geuss));
      if (j === -1) {
        lives -= 1;
        comments();
        animate();
      } else {
        comments();
      }
    }
  }



  /**
   * play the game
   * categories
   */
  play = function () {
    categories = [
      ["abstraction", "encapsulation", "inheritance", "polymorphism"],
      ["training", "regression", "decision trees", "discriminative model", "supervised learning", "unsupervised learning"],
      ["data mining", "predictive modeling", "text mining", "transforming", "data discovery"]
    ];

    chosenCategory = categories[Math.floor(Math.random() * categories.length)];
    word = chosenCategory[Math.floor(Math.random() * chosenCategory.length)];
    word = word.replace(/\s/g, "-");
    console.log(word);
    buttons();

    geusses = [];
    lives = 10;
    counter = 0;
    space = 0;
    result();
    comments();
    selectCat();
    canvas();
  }

  play();

  /**
   * Hints given based on category
   * 
   */
  hint.onclick = function () {

    hints = [
      ["a programmer hides all but the relevant data about an object in order to reduce complexity and increase efficiency", "to hide the values or state of a structured data object inside a class, preventing unauthorized parties' direct access to them", "a mechanism where you can to derive a class from another class for a hierarchy of classes that share a set of attributes and methods", "concept that refers to the ability of a variable, function or object to take on multiple forms"],
      ["learning (determining) good values for all the weights and the bias from labeled examples", "technique for investigating the relationship between independent variables or features and a dependent variable or outcome", "where the data is continuously split according to a certain parameter drama", "a class of models used in statistical classification, especially in supervised machine learning", "It is defined by its use of labeled datasets to train algorithms that to classify data or predict outcomes accurately", "These algorithms discover hidden patterns or data groupings without the need for human intervention"],
      ["the process of sorting through large data sets to identify patterns and relationships that can help solve business problems through data analysis", "a mathematical process used to predict future events or outcomes by analyzing patterns in a given set of input data", "the process of examining large collections of documents to discover new information or help answer specific research questions", "the process of changing the format, structure, or values of data", "a subset of business intelligence"]
    ];

    var catagoryIndex = categories.indexOf(chosenCategory);
    var hintIndex = chosenCategory.indexOf(word);
    showClue.innerHTML = "Clue: - " + hints[catagoryIndex][hintIndex];
  };

  // Reset

  document.getElementById('reset').onclick = function () {
    correct.parentNode.removeChild(correct);
    letters.parentNode.removeChild(letters);
    showClue.innerHTML = "";
    context.clearRect(0, 0, 400, 400);
    play();
  }
}


