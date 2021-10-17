import axios from 'axios';

//will need to move the main axios code elsewhere.
//Starting implementation here for now as its easier
//  to see how 'mock data' is being used in the app currently

const baseURL = 'http://localhost:3005/api/challenges/';

export default class ChallengeList {
  getChallengesListNoId = () => {
    //Will need to turn this into a constructor where our components can use
    // use this later on to allow it run everytime the component mounts
    axios
      .get(baseURL)
      .then((res) => {
        //We would recieve a array of all the challenges data here.
        res.data;
      })
      .catch((error) => console.log(error));
  };

  getChallengesListWithId = (_id) => {
    axios
      .get(baseURL + _id)
      .then((res) => {
        //We would recieve the array of data for 1 id
        res.data;
      })
      .catch((error) => console.log(error));
  };

  //could call this function and pass in the data as parameters
  postChallenge = (
    _name,
    _creator,
    _tags,
    _description,
    _location,
    _timestamp,
    _start_date,
    _end_date,
    _participants
  ) => {
    //Will need to turn this into a constructor where our components can use
    // use this later on to allow it run everytime the component mounts
    axios
      .post(baseURL, {
        data: {
          challenge: {
            name: _name,
            creator: _creator,
            tags: [_tags],
            description: _description,
            location: _location,
            timestamp: _timestamp,
            start_date: _start_date,
            end_date: _end_date,
            participants: _participants,
          },
        },
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err));
  };
}
