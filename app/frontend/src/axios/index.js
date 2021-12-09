import axios from "axios";

// DIGITAL_API_KEY = process.env.REACT_APP_API_DIGITAL_ACCESS_KEY;
export default axios.create({
  baseURL: "https://uc-davis-wellness-dk24p.ondigitalocean.app/api/",
});
