import axios from 'axios';
//will need to move the main axios code elsewhere.
//Starting implementation here for now as its easier
//  to see how 'mock data' is being used in the app currently

const baseUrl = 'http://localhost:3005/api/challenges/';
//Will need to turn this into a constructor where our components can use
//use this later on to allow it run everytime the component mounts
const getChallenges = () => {
  axios.get(baseUrl).then((res) => {
    //We would recieve a array of all the challenges data here.
    res.data;
    // this.setState({ courses: res.data });;
  });
};

export const curChallenge = [
  {
    id: '1',
    title: '30 Days of Yoga',
    shortDescr:
      'Day one is always the hardest. Discover more about yourself and your teammates! #yoga',
    longDescr:
      'Day one is always the hardest. Discover more about yourself and your teammates! #yoga. Day one is always the hardest. Discover more about yourself and your teammates! #yoga.Day one is always the hardest. Discover more about yourself and your teammates! #yoga',
    image:
      'https://www.history.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTY0OTE4ODAzMDQwMzE0Njg1/yoga-gettyimages-1142820079-promo.jpg',
    status: true,
    tags: [
      'yoga',
      'relaxation',
      'zen',
      'Swami',
      'Tantra',
      'namaste',
      'Pranayama',
      'Sleep',
    ],
    location: 'Davis, CA',
    date: new Date(),
  },
  {
    id: '2',
    title: 'Summit Countdown',
    shortDescr:
      'Lost the lbs and gain elevation with your colleagues! #hiking # nature',
    longDescr:
      'Lost the lbs and gain elevation with your colleagues! #hiking # nature.Lost the lbs and gain elevation with your colleagues! #hiking # nature. Lost the lbs and gain elevation with your colleagues! #hiking # nature',
    image:
      'https://images.fineartamerica.com/images-medium-large-5/climber-standing-on-a-mountain-summit-buena-vista-images.jpg',
    status: 'In progress',
    tags: ['mountain', 'nature', 'love'],
    location: 'Davis, CA',
    date: new Date(),
  },
  {
    id: '3',
    title: '5K for May',
    shortDescr:
      'The 5k challenge is an opportunity to get out, run, and have fun! #run #marathon',
    longDescr:
      'The 5k challenge is an opportunity to get out, run, and have fun! #run #marathon. The 5k challenge is an opportunity to get out, run, and have fun! #run #marathon. The 5k challenge is an opportunity to get out, run, and have fun! #run #marathon.',
    image:
      'https://static01.nyt.com/images/2021/05/18/sports/00nycmarathon-print/merlin_163791969_3b7f7b3e-7a75-4afc-a494-f210cb8e1824-superJumbo.jpg',
    status: false,
    tags: ['5k', 'run', 'marathon'],
    location: 'Davis, CA',
    date: new Date(),
  },
  {
    id: '4',
    title: 'Green Fun',
    shortDescr:
      'Improve your food choices with fun and healthy recipes! #recipes #food #nutrition',
    longDescr:
      'Improve your food choices with fun and healthy recipes! #recipes #food #nutrition. Improve your food choices with fun and healthy recipes! #recipes #food #nutrition. Improve your food choices with fun and healthy recipes! #recipes #food #nutrition',
    image:
      'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/slideshows/powerhouse_vegetables_slideshow/650x350_powerhouse_vegetables_slideshow.jpg',
    status: true,
    tags: ['veggies', 'green', 'health'],
    location: 'Davis, CA',
    date: new Date(),
  },
  {
    id: '5',
    title: 'Vacation Extravaganza',
    shortDescr:
      'Enjoy those well-deserved vacation days and take a vacation somewhere ney! #vacation',
    longDescr:
      'Enjoy those well-deserved vacation days and take a vacation somewhere ney! #vacation. Enjoy those well-deserved vacation days and take a vacation somewhere ney! #vacation. Enjoy those well-deserved vacation days and take a vacation somewhere ney! #vacation',
    image:
      'https://www.libertytravel.com/sites/default/files/styles/full_size/public/luxury-hero%20%281%29.jpg?itok=eHbThPZQ',
    status: false,
    tags: ['vacation', 'fun', 'family'],
    location: 'Davis, CA',
    date: new Date(),
  },
];
export const pastChallenge = [
  {
    id: '1',
    title: 'Vacation Extravaganza',
    shortDescr:
      'Enjoy those well-deserved vacation days and take a vacation somewhere ney! #vacation',
    longDescr:
      'Enjoy those well-deserved vacation days and take a vacation somewhere ney! #vacation. Enjoy those well-deserved vacation days and take a vacation somewhere ney! #vacation. Enjoy those well-deserved vacation days and take a vacation somewhere ney! #vacation',
    image:
      'https://www.libertytravel.com/sites/default/files/styles/full_size/public/luxury-hero%20%281%29.jpg?itok=eHbThPZQ',
    status: 'Completed',
    tags: ['vacation', 'fun', 'family'],
    location: 'Davis, CA',
    date: new Date(),
  },
  {
    id: '2',
    title: 'Green Fun',
    shortDescr:
      'Improve your food choices with fun and healthy recipes! #recipes #food #nutrition',
    longDescr:
      'Improve your food choices with fun and healthy recipes! #recipes #food #nutrition. Improve your food choices with fun and healthy recipes! #recipes #food #nutrition. Improve your food choices with fun and healthy recipes! #recipes #food #nutrition',
    image:
      'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/slideshows/powerhouse_vegetables_slideshow/650x350_powerhouse_vegetables_slideshow.jpg',
    status: 'Completed',
    tags: ['vaggies', 'health', 'green'],
    location: 'Davis, CA',
    date: new Date(),
  },
  {
    id: '3',
    title: '5K for May',
    shortDescr:
      'The 5k challenge is an opportunity to get out, run, and have fun! #run #marathon',
    longDescr:
      'The 5k challenge is an opportunity to get out, run, and have fun! #run #marathon. The 5k challenge is an opportunity to get out, run, and have fun! #run #marathon. The 5k challenge is an opportunity to get out, run, and have fun! #run #marathon.',
    image:
      'https://static01.nyt.com/images/2021/05/18/sports/00nycmarathon-print/merlin_163791969_3b7f7b3e-7a75-4afc-a494-f210cb8e1824-superJumbo.jpg',
    status: 'Completed',
    tags: ['run', '5k', 'marathon'],
    location: 'Davis, CA',
    date: new Date(),
  },
  {
    id: '4',
    title: 'Summit Countdown',
    shortDescr:
      'Lost the lbs and gain elevation with your colleagues! #hiking # nature',
    longDescr:
      'Lost the lbs and gain elevation with your colleagues! #hiking # nature.Lost the lbs and gain elevation with your colleagues! #hiking # nature. Lost the lbs and gain elevation with your colleagues! #hiking # nature',
    image:
      'https://images.fineartamerica.com/images-medium-large-5/climber-standing-on-a-mountain-summit-buena-vista-images.jpg',
    status: 'Completed',
    tags: ['nature', 'mountain', 'relax'],
    location: 'Davis, CA',
    date: new Date(),
  },
  {
    id: '5',
    title: '30 Days of Yoga',
    shortDescr:
      'Day one is always the hardest. Discover more about yourself and your teammates! #yoga',
    longDescr:
      'Day one is always the hardest. Discover more about yourself and your teammates! #yoga. Day one is always the hardest. Discover more about yourself and your teammates! #yoga.Day one is always the hardest. Discover more about yourself and your teammates! #yoga',
    image:
      'https://www.history.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTY0OTE4ODAzMDQwMzE0Njg1/yoga-gettyimages-1142820079-promo.jpg',
    status: 'Completed',
    tags: ['zen', 'yoga', 'relaxation'],
    location: 'Davis, CA',
    date: new Date(),
  },
];
export const allChallenge = [
  {
    id: '1',
    title: 'Vacation Extravaganza',
    shortDescr:
      'Enjoy those well-deserved vacation days and take a vacation somewhere ney! #vacation',
    longDescr:
      'Enjoy those well-deserved vacation days and take a vacation somewhere ney! #vacation. Enjoy those well-deserved vacation days and take a vacation somewhere ney! #vacation. Enjoy those well-deserved vacation days and take a vacation somewhere ney! #vacation',
    image:
      'https://www.libertytravel.com/sites/default/files/styles/full_size/public/luxury-hero%20%281%29.jpg?itok=eHbThPZQ',
    status: 'Completed',
    tags: ['vacation', 'fun', 'family'],
    location: 'Davis, CA',
    date: new Date(),
  },
  {
    id: '2',
    title: 'Green Fun',
    shortDescr:
      'Improve your food choices with fun and healthy recipes! #recipes #food #nutrition',
    longDescr:
      'Improve your food choices with fun and healthy recipes! #recipes #food #nutrition. Improve your food choices with fun and healthy recipes! #recipes #food #nutrition. Improve your food choices with fun and healthy recipes! #recipes #food #nutrition',
    image:
      'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/slideshows/powerhouse_vegetables_slideshow/650x350_powerhouse_vegetables_slideshow.jpg',
    status: 'Completed',
    tags: ['vaggies', 'health', 'green'],
    location: 'Davis, CA',
    date: new Date(),
  },
  {
    id: '3',
    title: '5K for May',
    shortDescr:
      'The 5k challenge is an opportunity to get out, run, and have fun! #run #marathon',
    longDescr:
      'The 5k challenge is an opportunity to get out, run, and have fun! #run #marathon. The 5k challenge is an opportunity to get out, run, and have fun! #run #marathon. The 5k challenge is an opportunity to get out, run, and have fun! #run #marathon.',
    image:
      'https://static01.nyt.com/images/2021/05/18/sports/00nycmarathon-print/merlin_163791969_3b7f7b3e-7a75-4afc-a494-f210cb8e1824-superJumbo.jpg',
    status: 'Completed',
    tags: ['run', '5k', 'marathon'],
    location: 'Davis, CA',
    date: new Date(),
  },
  {
    id: '4',
    title: 'Summit Countdown',
    shortDescr:
      'Lost the lbs and gain elevation with your colleagues! #hiking # nature',
    longDescr:
      'Lost the lbs and gain elevation with your colleagues! #hiking # nature.Lost the lbs and gain elevation with your colleagues! #hiking # nature. Lost the lbs and gain elevation with your colleagues! #hiking # nature',
    image:
      'https://images.fineartamerica.com/images-medium-large-5/climber-standing-on-a-mountain-summit-buena-vista-images.jpg',
    status: 'Completed',
    tags: ['nature', 'mountain', 'relax'],
    location: 'Davis, CA',
    date: new Date(),
  },
  {
    id: '5',
    title: '30 Days of Yoga',
    shortDescr:
      'Day one is always the hardest. Discover more about yourself and your teammates! #yoga',
    longDescr:
      'Day one is always the hardest. Discover more about yourself and your teammates! #yoga. Day one is always the hardest. Discover more about yourself and your teammates! #yoga.Day one is always the hardest. Discover more about yourself and your teammates! #yoga',
    image:
      'https://www.history.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTY0OTE4ODAzMDQwMzE0Njg1/yoga-gettyimages-1142820079-promo.jpg',
    status: 'Completed',
    tags: ['zen', 'yoga', 'relaxation'],
    location: 'Davis, CA',
    date: new Date(),
  },
];
