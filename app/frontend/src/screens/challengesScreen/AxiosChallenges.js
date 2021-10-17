import axios from 'axios';

//will need to move the main axios code elsewhere.
//Starting implementation here for now as its easier
//  to see how 'mock data' is being used in the app currently

const baseURL = 'http://localhost:3005/api/challenges/';

export default class ChallengeList {
  state = {
    challenges: [],
  };

  getChallengesList() {
    //Will need to turn this into a constructor where our components can use
    // use this later on to allow it run everytime the component mounts
    const getChallenges = () => {
      axios.get(baseUrl).then((res) => {
        //We would recieve a array of all the challenges data here.
        res.data;
        // this.setState({ courses: res.data });;
      });
    };
  }
}
