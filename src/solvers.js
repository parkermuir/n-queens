/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  // var solution = undefined; //fixme
  // togglePiece(rowI, colI);
  // let length = board.rows().length; // n

  //inst a new board
  var solution = new Board({n: n});

  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      solution.togglePiece(y, x);
      if (solution.hasAnyRooksConflicts()) {
        solution.togglePiece(y, x);
      }
    }
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution.rows()));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme
  

  // instantiate a new board
    //start to toggle a piece
    //check for conflicts
    //toggle off if conflicts
    //try again
  //once successfully toggled
  //recurse to the next row

  var solution = new Board({n: n});
  
  var recurseRow = function(row) {
    // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution.rows()));
    if (row === n) {
      solutionCount++;
      return;
    }

    for (var x = 0; x < n; x++) {
      solution.togglePiece(row, x);
      if (solution.hasAnyRooksConflicts() === false) {
        recurseRow(row + 1);
        //undo the last togglePiece
        solution.togglePiece(row, x);
      } else {
        solution.togglePiece(row, x);
      }
    }
  };

  recurseRow(0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = new Board({n: n});
  var tempCol = 0;

  if (n === 1) {
    solution.togglePiece(0, 0);
    return solution.rows();
  }
  
  if (n === 2 || n === 3) {
    return new Board({ n: n}).rows();
  }

  var recurseRow = function(row) {
    if (row === n) {
      return solution.rows();
    }

    for (var x = tempCol; x < n; x++) {
      solution.togglePiece(row, x);
      if (solution.hasAnyQueensConflicts() === false) {
        tempCol = 0;
        return recurseRow(row + 1);
        solution.togglePiece(row, x);
      } else {
        solution.togglePiece(row, x);
      }
    }
    tempCol = solution.get(row - 1).indexOf(1) + 1;
    solution.togglePiece(row - 1, tempCol - 1);
    recurseRow(row - 1);
  };

  recurseRow(0);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var solution = new Board({n: n});
  
  var recurseRow = function(row) {
    if (row === n) {
      solutionCount++;
      return;
    }

    for (var x = 0; x < n; x++) {
      solution.togglePiece(row, x);
      if (solution.hasAnyQueensConflicts() === false) {
        recurseRow(row + 1);
        //undo the last togglePiece
        solution.togglePiece(row, x);
      } else {
        solution.togglePiece(row, x);
      }
    }
  };

  recurseRow(0);
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
