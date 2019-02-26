var friends = require("../data/friends");

// ROUTING

module.exports = function(app) {
 
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });


  app.post("/api/friends", function(req, res) {
    //Our "server" will respond to a user"s survey result.
    // It will then calculate the difference between each of the numbers and the user"s numbers.
    // The difference is used to calculate the compatibility
   
    // loop through all of the options
    var bestMatch = {
      name: "",
      photo: "",
      friendDifference: Infinity
    };

    
    var userData = req.body;
    var userScores = userData.scores;

    var totalDifference;

    // Here we loop through all the friend possibilities
    for (var i = 0; i < friends.length; i++) {
      var currentFriend = friends[i];
      totalDifference = 0;

      console.log(currentFriend.name);

      // We then loop through all the scores of each 
      for (var j = 0; j < currentFriend.scores.length; j++) {
        var currentFriendScore = currentFriend.scores[j];
        var currentUserScore = userScores[j];

        // We calculate the difference
        totalDifference += Math.abs(parseInt(currentUserScore) - parseInt(currentFriendScore));
      }

      // If the sum of differences is less then the differences of the current "best match"
      if (totalDifference <= bestMatch.friendDifference) {
        
        bestMatch.name = currentFriend.name;
        bestMatch.photo = currentFriend.photo;
        bestMatch.friendDifference = totalDifference;
      }
    }

    friends.push(userData);

  
    res.json(bestMatch);
  });
};
