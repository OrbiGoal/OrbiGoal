<div align="center">
    <img src="https://imgur.com/XWrG8HP.png" alt="Orbigoal Logo" width="200">
    <h1>OrbiGoal</h1>
    <h3>[Orbital Apollo]</h3>
    <h2>README</h2>
    <p>Brian Lim Yen Sing, A0272973R, Year 1 Business Analytics<br>
    Li Han Lin, A0273744X, Year 1 Business Analytics</p>
</div>

<div style="page-break-after: always;"></div>
---

# Table of Contents

1. [**Project Overview**](#project-overview)
2. [**Foreword**](#foreword)
3. [**Getting Started**](#getting-started)
4. [**App Design**](#app-design)
5. [**App Features**](#app-features)
6. [**Overall Navigation Flow**](#overall-navigation-flow)
7. [**User Interface Design**](#user-interface-design)
8. [**User Testing**](#user-testing)
9. [**Software Engineering Practices**](#software-engineering-practices)
10. [**Tech Stack**](#tech-stack)
11. [**Project Timeline**](#project-timeline)
13. [**Project Log**](#project-log)
14. [**Contact**](#contact)

<div style="page-break-after: always;"></div>
---

## Project Overview

Team Name: OrbiGoal

Team Members: Brian Lim Yen Sing, Li Han Lin

Level of Achievement: Apollo 11

### Foreword

Han Lin and I, both avid La Liga supporters, tuned in to an English Premier League (EPL) game one day. As the game went on, we came to a realization — we were not all that familiar with many of the players on the pitch. Sure, the star players were known to us, but beyond that, we felt out of the loop. That was when it occurred to us: wouldn't it be great to have an app that could dish out detailed player and team stats, and even make predictions about matches in leagues we're not usually glued to?

This led us to this project and to develop a football analytics app.

Our main objective is to close the gap between different leagues and equip football fans like ourselves with the knowledge and insights they need to fully appreciate the game, no matter the league they are watching. From digging into a player's performance history, and sizing up team stats, to forecasting the outcomes of future matches, we aimed to create a platform that can inform and entertain.

Additionally, we also hope to change the way fans interact with football. As we work hard to develop this application, we are also excited about the prospect of not only enhancing the football viewing experience for enthusiasts across the globe but also for the people who are new to this sport trying to get into it.

To us, this project is more than just developing an app; it is about fostering a community of like-minded football fans who share our love for the game, irrespective of their geographical or league-based boundaries!

### Aim

To engage fans on a deeper level, enhancing their football experience. We recognize the passion of current football fans and we hope that through our application, we can offer detailed match analysis, insights into team strategies, and accurate predictions for upcoming matches, elevating current fans’ engagement with football.

To attract new fans to the sport and make it more accessible to a wider audience. By designing a user-friendly interface, we can ensure that even those new to football can easily interact with the app and gain valuable insights into the game. Features such as exploring player statistics or following the latest news and updates will be made intuitive for newcomers to discover and gain excitement for football.

To bring convenience and accessibility to our users by ensuring that all users can enjoy the benefits of our app anytime, anywhere. By offering a mobile platform, users can access football analysis and insights directly from their smartphones or tablets, eliminating the need for cumbersome interfaces or repetitive Google searches.

<div style="page-break-after: always;"></div>
---

## Getting Started

To access the OrbiGoal app, follow these steps:

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Git](https://github.com/git-guides/install-git)

Please do also bring along your mobile device (iOS or Android), or have a simulator ready.

### Install and Run

1. **Install Expo Go**

   Open up your app store or play store to install Expo Go

2. **Scan and Run**

   Scan the QR code below to run the application on Expo Go

<div align="left" style="margin-right: 20px;">
    <img src="https://i.imgur.com/Z0qsU8G.jpeg" alt="Log in" width="400" style="margin-bottom: 20px;">
</div>
   
### Troubleshooting Tips

- **Expo Account**: If you have an Expo account, logging into Expo Go with the same account can sometimes simplify the process.


<div style="page-break-after: always;"></div>
---

## App Design

### Architecture/Activity Diagram
<img width="1500" alt="image" src="https://imgur.com/3biJKM4.png">

An alternative implementation of profile and notifications would be to implement all within the same drawer as teams, players and predictions. However, that would cause the drawer to look cluttered and is against our principle of keeping the application user friendly. 
An alternative implementation of the landing page would be to remove the log in prompt and allow users to log in only in the profile tab. However, without logging in, favourited teams and players would not be kept track. Users may find it frustrating to realise they cannot favourite teams and players, and see their followed leagues in the home page. Therefore, we thought it would be more user friendly to prompt the users to log in as soon as they open up the application.

<img width="1500" alt="image" src="https://imgur.com/58yqCWL.png">
<img width="1500" alt="image" src="https://imgur.com/axzLSta.png">

While the search bar should function just as well independently, adding a filter option would smoothen the process and declutter the teams that pop up in the search in case the team that the user is looking for is far below in the search.

<img width="1500" alt="image" src="https://imgur.com/PVZGxBx.png">

An alternative explored previously was to predict the match score on the teams' next encounter regardless of home and away. However, in real life scenarios, teams tend to do better in their home stadium. Therefore, the model is split between home and away, making use of home and away data separately to make fairer predictions.
Another alternative explored was to build the predictive model on the spot, after users have selected two teams. However, training the model takes up significant time. If the user wants to make multiple predictions across multiple teams, doing so would significantly impact the user's experience.

### Design Principles

Modularity: Some components such as `ExploreHeader` were developed to be reusable. This modular pieces of code allows for easy integration into different parts of the application. This approach also allows for easier maintenance and updates as changes to the `ExploreHeader` component would automatically propagate to other parts of the app where it is used.

Single Responsibility Principle: Components such as `ExploreHeader` is responsible solely for one purpose. For instance, `ExploreHeader` renders the search header and handles search input only, ensuring that the component is focused and easy to manage/extend.

Encapsulation: By encapsulating data and certain functionality within modules, we ensured that each module's internal workings were hidden from the rest of the application. This promotes separation of concerns and reduces the risk of unintended interactions between different parts of the application.

Scalability and Performance Optimization: We designed the app with scalability in mind, ensuring that it can handle a growing number of users and data. Performance optimization techniques, such as efficient data fetching and caching, were implemented to provide a smooth user experience.

User-Centered Design: The app is designed with the user in mind, focusing on providing an intuitive and engaging experience. The interface is kept clean and straightforward to avoid overwhelming the users.

Error Prevention and Handling: Reducing the chance of user errors and providing clear instructions when errors occur. Alerts implemented provided descriptive error messages to guide users on how to correct their actions.

<div style="page-break-after: always;"></div>
---

## App Features

### User Account Authentication
#### Description
This feature allows users to create accounts, log in, and manage their profiles securely. It ensures that each user has a personalized experience navigating through the app. Users may also choose sign up or log in with their phone number and Google.

#### Implementation Challenges
- Integrating with social login options, especially with Apple since that requires an Apple Developer account.
- Ensuring the security of user data

#### Diagrams 
<div align="left" style="margin-right: 20px;">
    <img src="https://i.imgur.com/rysE88R.png" alt="Log in" width="400" style="margin-bottom: 20px;">
</div>

As the first core feature, we followed an online tutorial and developed it with the aid of the package clerk-expo. Upon user sign up or login with google, user data is automatically stored in Firebase to keep track of favourited players and teams.

<div style="page-break-after: always;"></div>

### Teams & Players Search
#### Description
This feature allows users to search for detailed information about teams and players, including statistics, performance history, and other relevant data. The filter option on the top right corner allows users to select a league to narrow down their search results.

#### Implementation Challenges
- Integrating dataset, uploading Kaggle data onto Firebase
  The raw data from Kaggle had issues displaying accented alphabets. We faced errors using encoding="utf" within read_csv(), the other encodings could not display them correctly either. To tackle the issue, we converted the csv into json and edited the characters manually to clean them before uploading them to Firebase.
- Handling large datasets efficiently
- Ensuring the accuracy and relevancy of search results
- Providing a user-friendly search interface
- Ensuring high performance and minimizing lags with the great number of teams and players
- Difficulty in finding a dataset with both the relevant player information as well as player faces

#### Diagrams
<div align="left" style="margin-right: 20px;">
    <img src="https://imgur.com/BLDH8tT.png" alt="Player Search" width="400" style="margin-bottom: 20px;">
    <img src="https://imgur.com/CHaUb2i.png" alt="Team Search" width="400" style="margin-bottom: 20px;">
</div>

After working on the team search page for Milestone 2, we managed to create a more intuitive and efficient team search page. Utilizing the `Flatlist` component, we were able to achieve greater performance as compared to the `ScrollView` component which we were using initially. We also implemented a league filter for the teams so users can filter for those teams in relevant leagues. We plan to integrate more filters in the future for teams and players alike. Due to the significantly expansive size of the players dataset, coupled with a lack of suitable dataset that mapped the player's faces to their statistics, we are unable to create the player's search page by Milestone 2. However, Milestone 2 allowed us to experiment with different types of the teams page and implementations, which will undoubtedly help us in expediting the process to build the player's page. This is our updated team search page.

<div align="left" style="margin-right: 20px;">
    <img src="https://i.imgur.com/urSELJv.png" alt="Updated Team Search" width="400" style="margin-bottom: 20px;">
</div>

In Milestone 2, we also implemented the filter for leagues and working search bar. 

<div align="left" style="margin-right: 20px;">
    <img src="https://imgur.com/6mi8aEd.png" alt="Filter button that allows filtering by league" width="400" style="margin-bottom: 20px;">
    <img src="https://imgur.com/jWnGUBw.png" alt="Filter button that allows filtering by league" width="400" style="margin-bottom: 20px;">
    <img src="https://imgur.com/jr2ofZ0.png" alt="Using search bar" width="400" style="margin-bottom: 20px;">
</div>

In Milestone 3, the teams search page was further updated with a heart-shaped button to favourite and unfavourite teams. User's favourited teams are automatically updated on Firebase with each interaction with the button. Moreover, the home page was updated to display upcoming matches from the league of the favourited team, providing more information of the league in hopes of introducing more teams to and sparking a deeper interest in the user.

<div align="left" style="margin-right: 20px;">
    <img src="https://imgur.com/iW3l43v.png" alt="Updated Team Search" width="400" style="margin-bottom: 20px;">
</div>

Additionally, from Milestone 2 to Milestone 3, a major development was the players search page. Due to the large size of the dataset compared to teams, it was more challenging to process the data. Despite the setbacks, we have managed to develop the following functionalities.
Firstly, we managed to create player cards to display player information in card format, making it visually appealing and easy to browse through the list of players. Each card includes basic information such as the player's name, nationality, and squad. Using the same `ExploreHeader` component we developed for the teams’ page, we were able to quickly integrate the same search and filter features onto the players’ search page.  

<div align="left" style="margin-right: 20px;">
    <img src="https://i.imgur.com/zXChUCb.jpeg" alt="Updated Team Search" width="400" style="margin-bottom: 20px;">
    <img src="https://i.imgur.com/ianKqMX.jpeg" alt="Updated Team Search" width="400" style="margin-bottom: 20px;">
    <img src="https://i.imgur.com/LDiMovg.jpeg" alt="Updated Team Search" width="400" style="margin-bottom: 20px;">
    <img src="https://i.imgur.com/ZTjDIxI.jpeg" alt="Updated Team Search" width="400" style="margin-bottom: 20px;">
</div>

Similar to the teams page, in each card, there is an intuitive heart icon that allows users to favourite players, which involved storing user preferences on the backend. Our app is thus able to display the users’ favourite players when they open or log back into the app. 

<div align="left" style="margin-right: 20px;">
    <img src="https://i.imgur.com/uCS6qE0.png" alt="Updated Team Search" width="400" style="margin-bottom: 20px;">
    <img src="https://i.imgur.com/itnjG9A.png" alt="Updated Team Search" width="400" style="margin-bottom: 20px;">
</div>

<div style="page-break-after: always;"></div>  

### Team Details Page
#### Description
A dedicated page for displaying comprehensive details about a team to analyse historical trends and compare with teams in the same league. Users can filter by season if there is enough information for both seasons.

#### Implementation Challenges
- Designing a detailed and informative layout
- Fetching and displaying dynamic data efficiently
- Ensuring the page is user-friendly and visually appealing

#### Diagrams
<div align="left" style="margin-right: 20px;">
    <img src="https://i.imgur.com/RE7F8BK.png" alt="Team Details Page" width="400" style="margin-bottom: 20px;">
    <img src="https://i.imgur.com/mpLG9Nr.png" alt="Team Details Page" width="400" style="margin-bottom: 20px;">
</div>

<div style="page-break-after: always;"></div>

### Player Details Page
####
A dedicated page for displaying comprehensive details about a player to analyse and compare player performance. 

#### Implementation Challenges
- In developing the players’ search page, there were some data fetching issues which resulted in the detailed page not displaying content properly.
- Integrating the backend with Firebase and ensuring smooth communication between the frontend and backend posed some difficulties. Many errors only showed up after a while, which reminded us of the importance of keeping a sanitary code base so we could easily rectify errors.
- Faced issues with deploying the app on Expo Go, including dealing with environment variables and network requests.

#### Diagrams
When users click into the card on the players’ search page, there is a detailed page for each player that displays comprehensive information, including player statistics, team, position, and profile picture. Additionally, a spider chart is created to showcase detailed statistics such as pace and dribbling attributes relevant to the player's performance. This helps users get a deeper understanding of the player's capabilities. The overall rating is also placed strategically in a hexagon to help users understand the overall competency of the player in his position.

<div align="left" style="margin-right: 20px;">
    <img src="https://i.imgur.com/HDcQzo5.jpeg" alt="Updated Team Search" width="400" style="margin-bottom: 20px;">
</div>

<div style="page-break-after: always;"></div>

### Match Predictions
#### Description
This feature provides users with predictions for upcoming football matches based on historical data and performance metrics. This feature was implemented through the usage of artificial neural networks, and the TensorFlow package in python. The predictions were weighted against key performance indicators of a team's previous few games such as goals scored, red cards, yellow cards and possession.

#### Implementation Challenges
- Collecting and preprocessing large volumes of match data
- Choosing and tuning the appropriate machine learning models
- Continuously updating the prediction model with new data
- Integrating predictions into actual application

In Milestone 2, we created our working machine learning model which can make score predictions based on certain features of a match up that we deem important. Some of these features include the team scores and team yellow card that is measured by each player's performance in the match. To this end, we had to perform extensive data manipulation and data processing such as encoding categorical features. 

In Milestone 3, the models are further updated and exported as .h5. The models are then converted to .json and .bin using tensorflowjs's converter to be used in our typescript code. Drop pickers were added to select Home and Away teams to find their next encounter. Alerts were also implemented to deal with invalid matches to warn users to eliminate the possibility for an error. The prediction card, onPress, makes a prediction of the match score using the predictive model.


#### Diagrams
<div align="left" style="margin-right: 20px;">
    <img src="https://imgur.com/gHHrUKR.png" alt="Predictions" width="400" style="margin-bottom: 20px;">
    <img src="https://imgur.com/PGw96uA.png" alt="Predictions" width="400" style="margin-bottom: 20px;">
    <img src="https://imgur.com/zdiIUJu.png" alt="Predictions" width="400" style="margin-bottom: 20px;">
    <img src="https://imgur.com/K2CDWeP.png" alt="Predictions" width="400" style="margin-bottom: 20px;">
    <img src="https://imgur.com/wOFzXgx.png" alt="Predictions" width="400" style="margin-bottom: 20px;">
</div>

While the entire process of building the model can be found in this repository – "PredictiveModel.ipynb", we have outlined some steps that we took to build this model below.

<div align="left" style="margin-right: 20px;">
    <img src="https://i.imgur.com/igvRl9m.png" alt="Tensorflow model building" width="400" style="margin-bottom: 20px;">
    <img src="https://i.imgur.com/6LK8PSA.png" alt="Tensorflow model building" width="400" style="margin-bottom: 20px;">
    <img src="https://i.imgur.com/pdal5NB.png" alt="Tensorflow model building" width="400" style="margin-bottom: 20px;">
</div>

<div style="page-break-after: always;"></div>

A limitation faced was fully integrating the usage of Firebase to store the data used for predictions. As the model is trained using features such as goal counts and yellow card counts, it only makes sense to make predictions using such features. Since such data would never be available before the match, averages of such data are taken from the past encounters of the two teams selected. To make a fair prediction, large amounts of such data would be required. However, Firebase only allows 20,000 writes into the collections per day on a free subscription. Therefore, we decided to store such data locally, although it would cause the application to be of a bigger size. This limitation could be overcame with a paid subscription to Firebase.

Additionally, there are limited free football data APIs available online. Footballorg was the best we found as it offered unlimited fetches for free. However, data from Footballorg would not merge well with the kaggle dataset we used to train our model and make predictions, as the only candidate key that was somewhat similar was the team names. Mapping each team name from one dataset to another would have to be done manually and would have taken up too much time. Moreover, making such a substantial number of API calls would either have resulted in AxiosError 429 or, with sufficient timeout implemented to avoid the error, cause the user to wait for too long before making a prediction. As such, we decided to only map the top teams in the top 5 leagues available to make predictions. This limitation could be potentially overcame with a paid football data API if its data would merge better with the kaggle dataset used to make predictions.

### Notifications 
#### Description
This feature sends notifications to users about important updates and latest results of matches from top 5 leagues globally. The results of football matches are retrieved from API calls to https://www.football-data.org/.

#### Implementation Challenges
- Push notifications without an Apple Developer Account are not possible
- Certain images retrieved are in .svg instead of .png and therefore experience problems rendering

In Milestone 2, we created the notifications page to display the latest 30 days of match results from the top 5 leagues around the globe. These data are retrieved from a free online source. The notifications are arranged from the latest to the earliest, giving the user a brief summary of each match at one glance. Users are able to click a notification to view the match in detail (in development), a new tab created with parallax image. 

In Milestone 3, the notifications page was updated to retrieve the latest 90 days of match results from the top 5 leagues. A drop picker was added to filter the leagues further to only display the matches of a specific league. Users are now able to click into a notification card to view further details such as the referee, the stadium used and the stage of the league. Images that were previously in .svg are now handled by react native's svg package, alongside tweaks to metro.config.js to render images which could not render properly previously.

#### Diagrams
<div align="left" style="margin-right: 20px;">
    <img src="https://imgur.com/oyZZoNh.png" alt="Notifications" width="400" style="margin-bottom: 20px;">
    <img src="https://imgur.com/LO4BpHK.png" alt="Notifications" width="400" style="margin-bottom: 20px;">
    <img src="https://imgur.com/fDNWGWC.png" alt="Notifications" width="400" style="margin-bottom: 20px;">
</div>

<div style="page-break-after: always;"></div>

### Deployment on Expo Go and Hosting Backend on Google Cloud Platform

#### Description
One of our greater struggles was deploying our application. Since both members are users of iOS, we were only familiar with hosting the app on the app store, which required a subscription of USD99 a year for a Apple Developer account. Thankfully, with the help of our advisor, we were able to find a workaround and deployed the application on Expo Go. Apart from using Expo Go CLI to deploy our application, Expo Go also allows us to easily post updates to our application, similar to how we commit and push changes onto Github.
After deploying the application on Expo Go, the next step was to host the backend. Up till this point, we had been using our local device as a server, which was not feasible if we were to allow other users to use the app seamlessly. As such, we chose to host the backend using Google Cloud Platform (GCP). GCP provides serverless functions using Google Cloud Functions to handle backend logic and API requests. This streamlined the process of managing backend operations without worrying about server management.
As we have utilised Firebase, a part of GCP, for storing and retrieving player data and other relevant information, it provided a robust way to synchronise data and ensure that it is always up-to-date to handle real-time database needs and user authentication. 

#### Implementation Challenges
- Retrieving user tokens from Clerk and ensuring that it is written correctly to our database required a fair bit of studying and debugging. We thoroughly debugged the data fetching process by logging responses and errors to identify and fix issues
- Integration the backend by clearly defining API endpoints and using Axios for HTTP requests. Ensured proper error handling and loading states to provide a smooth user experience. Switching from local development to production required careful management of environment variables using the .env file. This ensures that we align with good software engineering habits of keeping sensitive credentials safe

<div style="page-break-after: always;"></div>

---

## Overall Navigation Flow

Watch [this video](https://drive.google.com/file/d/1gjAvnkLFX5tYebkHPtpCdLzUEE7t8HBQ/view?usp=drive_link) to help you get started!

### Logging in
<div align="left" style="margin-right: 20px;">
    <p>If this is the first time you are opening the app, you should be automatically prompted to create an account with your email or log in with other methods.</p>
    <img src="https://i.imgur.com/rysE88R.png" alt="Log in" width="400" style="margin-bottom: 20px;">
    <img src="https://imgur.com/d07Hj85.png" alt="Log in" width="400" style="margin-bottom: 20px;">
    <p>Complete authentication to get into the homepage.</p>
    <img src="https://imgur.com/k5tV3Sx.png" alt="Log in" width="400" style="margin-bottom: 20px;">
</div>

<div style="page-break-after: always;"></div>

### View profile

<div align="left" style="margin-right: 20px;">
    <p>Click on the hamburger icon on the top-left corner to access your profile.</p>
    <img src="https://imgur.com/y9Kj3sN.png" alt="Log in" width="400" style="margin-bottom: 20px;">
</div>

<div style="page-break-after: always;"></div>

### See notifications

<div align="left" style="margin-right: 20px;">
    <p>View important updates and results from latest football matches.</p>
    <img src="https://imgur.com/oyZZoNh.png" alt="Notifications" width="400" style="margin-bottom: 20px;">
    <img src="https://imgur.com/LO4BpHK.png" alt="Notifications" width="400" style="margin-bottom: 20px;">
    <img src="https://imgur.com/fDNWGWC.png" alt="Notifications" width="400" style="margin-bottom: 20px;">
</div>

<div style="page-break-after: always;"></div>

### Team/player data and statistics

<div align="left" style="margin-right: 20px;">
    <p>Search for your favourite teams under the teams tab.</p>
    <img src="https://imgur.com/iW3l43v.png" alt="Updated Team Search" width="400" style="margin-bottom: 20px;">
    <img src="https://imgur.com/6mi8aEd.png" alt="Filter button that allows filtering by league" width="400" style="margin-bottom: 20px;">
    <img src="https://imgur.com/jWnGUBw.png" alt="Filter button that allows filtering by league" width="400" style="margin-bottom: 20px;">
    <img src="https://imgur.com/jr2ofZ0.png" alt="Using search bar" width="400" style="margin-bottom: 20px;">
    <p>Search for your favourite players under the players tab.</p>
    <div align="left" style="margin-right: 20px;">
    <img src="https://i.imgur.com/zXChUCb.jpeg" alt="Updated Player Search" width="400" style="margin-bottom: 20px;">
    <img src="https://i.imgur.com/ianKqMX.jpeg" alt="Updated Player Search" width="400" style="margin-bottom: 20px;">
    <img src="https://i.imgur.com/LDiMovg.jpeg" alt="Updated Player Search" width="400" style="margin-bottom: 20px;">
    <img src="https://i.imgur.com/ZTjDIxI.jpeg" alt="Updated Player Search" width="400" style="margin-bottom: 20px;">
</div>
</div>

<div style="page-break-after: always;"></div>

### Match predictions

<div align="left" style="margin-right: 20px;">
    <p>Select valid Home and Away teams to perform a prediction on their next encounter.</p>
    <img src="https://imgur.com/gHHrUKR.png" alt="Predictions" width="400" style="margin-bottom: 20px;">
    <img src="https://imgur.com/PGw96uA.png" alt="Predictions" width="400" style="margin-bottom: 20px;">
    <img src="https://imgur.com/zdiIUJu.png" alt="Predictions" width="400" style="margin-bottom: 20px;">
    <img src="https://imgur.com/K2CDWeP.png" alt="Predictions" width="400" style="margin-bottom: 20px;">
    <p>Predict!</p>
    <img src="https://imgur.com/wOFzXgx.png" alt="Predictions" width="400" style="margin-bottom: 20px;">
</div>

<div style="page-break-after: always;"></div>
---

## User Interface Design

Visit [Figma](https://www.figma.com/design/94azhs4ECr4WR69Abwqa6i/OrbiGoal?node-id=0-1&t=m2z2fqamrWJDFhiv-1) for our UI design!

<div style="page-break-after: always;"></div>
---

## User Testing

### Landing Page
| User ID | Issue                                                                                                  | Solution                                                                                               | Solution Philosophy/Reasoning                                                                                           |
|---------|--------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------|
| 1       | Loading times were very slow due to showing all matches for liked teams                                | Limited to showing the top 8 most recent matches                                                       | Improve performance by reducing the data load, ensuring a smoother user experience                                     |
| 2       | Displayed "No upcoming matches" while data was still loading                                           | Implemented an activity indicator to show loading status and display "No upcoming matches" only if no team is favorited | Provide users with feedback during data loading to avoid confusion and enhance user experience                         |

### Team Page
| User ID | Issue                                                                                                  | Solution                                                                                               | Solution Philosophy/Reasoning                                                                                           |
|---------|--------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------|
| 3       | Information took time to load, causing users to think there was a bug                                   | Implemented an activity indicator to show data is loading                                               | Inform users of the loading process to improve transparency and perceived responsiveness                               |
| 4       | Favorited teams were at the bottom, making it troublesome for users                                     | Bubbled favorited teams to the top of the search page                                                   | Prioritize user-preferred content to enhance usability and satisfaction                                                 |

### Notifications Page
| User ID | Issue                                                                                                  | Solution                                                                                               | Solution Philosophy/Reasoning                                                                                           |
|---------|--------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------|
| 5       | League selection drop picker did not render properly on certain devices                                | Adjusted the size of the drop picker in the stylesheet to match regular iPhone size                    | Ensure consistent and responsive UI across different device sizes                                                      |
| 1       | Selecting the default "Select League" option caused errors                                             | Invalidated the "Select League" option after selecting a league to prevent manual selection             | Prevent user errors and ensure a smooth user experience by avoiding invalid selections                                 |
| 2       | Images of team crests or country flags did not render properly due to being in .svg format             | Modified metro.config.js to include an svg transformer and updated notifications page to handle .svg and .png images | Ensure proper image rendering to maintain visual integrity and user experience                                          |

### Predictions Page
| User ID | Issue                                                                                                  | Solution                                                                                               | Solution Philosophy/Reasoning                                                                                           |
|---------|--------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------|
| 3       | Predicted score displayed NaN - NaN when the same team was selected for home and away                  | Implemented an alert to prevent selecting the same team for home and away                              | Guide users to make valid selections, preventing errors and ensuring accurate predictions                              |
| 4       | Issues rendering images in .svg format                                                                 | Applied the same svg handling logic from notifications page                                            | Maintain consistency in handling image formats across different app components                                          |
| 5       | AxiosError 429 occurred when navigating around the page too quickly                                    | Implemented filtering during initial data fetch and added a 1-second delay between league data fetches to reduce API call frequency | Reduce API call frequency to prevent rate limiting and improve data retrieval efficiency                                |


<div style="page-break-after: always;"></div>
---

## Software Engineering Practices

1. **Agile Methodology**: We follow an agile approach to project management, breaking down our development process into small, manageable tasks or sprints. This allows us to adapt quickly to changes and deliver features incrementally.

2. **Version Control with Git**: We used GitHub for version control to manage and streamline our development process efficiently. GitHub enabled us to track changes to our codebase, collaborate seamlessly, and manage multiple versions of our project. By creating branches for new features and bug fixes, we ensured that our main codebase remained stable while allowing for parallel development. Pull requests and code reviews facilitated rigorous scrutiny and integration of new code, maintaining high-quality standards. This structured approach ensured transparency, accountability, and effective collaboration among team members, ultimately leading to a more robust and well-maintained application.

<img width="1316" alt="image" src="https://imgur.com/L3BsYXm.png">

3. **Code Reviews**: We conducted code reviews extensively throughout the development of OrbiGoal to ensure the highest quality of code and maintain consistency across the project. Regular code reviews allowed team members to share knowledge, identify potential issues, and provide constructive feedback, which led to more robust and efficient code. This practice helped us catch bugs early, enforce coding standards, and improve the overall readability and maintainability of our codebase. By fostering a culture of collaboration and continuous improvement, code reviews contributed to a more reliable and scalable application, ultimately enhancing the user experience.

4. **Testing**: Built with a user-centric approach, OrbiGoal is designed to be an application to engage users. We used user testing extensively in the development of OrbiGoal to ensure the application met the needs and expectations of our target audience. We approached 5 users of different demographics to test out the different features OrbiGoal has to offer. By engaging real users throughout the development process, we were able to gather valuable feedback on the usability, functionality, and overall user experience of the app. This iterative approach allowed us to identify and address potential issues early, refine features based on user preferences, and ultimately create a more intuitive and engaging product. User testing helped us validate our design decisions, prioritize features, and ensure that OrbiGoal provides a seamless and enjoyable experience for football fans. Details to the outcomes of user testing can be found in [**User Testing**](#user-testing).

5. **Documentation**: We maintain thorough documentation throughout our development process. This includes README files, code comments, and user guides. Documentation helps us communicate effectively, onboard new team members, and ensure the long-term maintainability of our project. Additionally, our README files include links to further documentation, application user interface diagrams and project log, which foster consistency and clarity across the development team. By maintaining thorough documentation, we enhance collaboration, streamline project management, and ensure that the knowledge is easily accessible and transferable.

<img width="1316" alt="image" src="https://imgur.com/vjBGtLk.png">
<img width="1316" alt="image" src="https://imgur.com/lmrWJxT.png">

<div style="page-break-after: always;"></div>
---

## Tech Stack

- **Python**: Python was used for backend development and data processing.
1. app.py <br />
  <img width="839" alt="image" src="https://imgur.com/poSCMj7.png"> <br />
  <img width="839" alt="image" src="https://imgur.com/c7q1HTb.png"> <br />
2. cleaning.ipynb <br />
  <img width="839" alt="image" src="https://imgur.com/n5TNnjh.png"> <br />
  <img width="839" alt="image" src="https://imgur.com/1ecU2Nm.png"> <br />
3. uploaddata.py <br />
  <img width="839" alt="image" src="https://imgur.com/1t5Bpf0.png"> <br />
4. PredictiveModel.ipynb <br />
  <img width="839" alt="image" src="https://imgur.com/MgeZQvJ.png"> <br />
  <img width="839" alt="image" src="https://imgur.com/E7Wi7yN.png"> <br />


- **React Native/Expo Go**: Mobile application development <br />
<img width="173" alt="image" src="https://imgur.com/iw8uHWp.png"> <br />


- **TypeScript**: Typescript was used for most of the frontend development, with some splashes of javascript.
1. index.tsx <br />
  <img width="1499" alt="image" src="https://imgur.com/GV2vSnK.png"> <br />
2. notifications.tsx <br />
  <img width="1499" alt="image" src="https://imgur.com/HJt5qu1.png"> <br />
2.1 [notifId].tsx <br />
  <img width="1499" alt="image" src="https://imgur.com/ggKXjqU.png"> <br />
3. teams.tsx <br />
  <img width="1499" alt="image" src="https://imgur.com/ByfwRR6.png"> <br />
3.1 [teamId].tsx <br />
  <img width="1499" alt="image" src="https://imgur.com/EG1chYG.png"> <br />
4. predictions.tsx <br />
  <img width="1499" alt="image" src="https://imgur.com/qOybM82.png"> <br />
5. _layout.tsx <br />
  <img width="1499" alt="image" src="https://imgur.com/NiqT8Nc.png"> <br />

- **Firebase**: Firebase was used for convenient database management.
Teams data used for teams page <br />
<img width="1498" alt="image" src="https://imgur.com/6EmaxyV.png"> <br />
Top clubs data used for predictions page <br />
<img width="1498" alt="image" src="https://imgur.com/HYGw4QF.png"> <br />
User data used for favouriting and home page <br />
<img width="1498" alt="image" src="https://imgur.com/4XeQgD5.png"> <br />
<img width="1498" alt="image" src="https://imgur.com/DQeeLqj.png"> <br />

- **Scikit-learn, TensorFlow, Keras**: Along with Python, these packages were used to develop machine learning algorithms.
<img width="845" alt="image" src="https://imgur.com/Fcl2ucB.png"> <br />
<img width="845" alt="image" src="https://imgur.com/BGgvMzH.png"> <br />

<div style="page-break-after: always;"></div>
---

## Project Timeline

### Milestones

| Milestone         | Description                                        | Deadline       | Status       |
|-------------------|----------------------------------------------------|----------------|--------------|
| Project Liftoff   | Initial project planning and team formation        | May 20, 2024 | Completed    |
| Milestone 1 | Designing system architecture and user interfaces | June 3, 2024 | Completed    |
| Milestone 2      | Developing core features    | July 1, 2024 | Completed    |
| Milestone 3 | Developing extension features                        | July 29, 2024 | Completed  |
| Splashdown | Project presentation         | August 19, 2024 | Planned      |

### Detailed Schedule

| Task                        | Description                                                                                                 | Start Date       | End Date         | Dependencies                   |
|-----------------------------|-------------------------------------------------------------------------------------------------------------|------------------|------------------|--------------------------------|
| Project Initialization | Produceed detailed project planning, liftoff poster and video to showcase project vision                      | May 13, 2024 | May 20, 2024 | Project Liftoff                |
| Setup Development Environment | Set up the initial development environment including visual studio code, react native expo, firebase and github                    | May 21, 2024 | May 23, 2024 | Milestone 1                |
| Home Page and Profile Page            | Designed home page and profile page for account sign up and log in authentication                                          | May 24, 2024 | June 2, 2024| Milestone 1       |
| Navigation        | Developed the sidebar and tab bar navigation interface                                                     | June 3, 2024| June 16, 2024   | Milestone 2                 |
| Teams and Players Page         | Developed logic to filter and search up teams and players with API calls                                        | June 17, 2024| June 30, 2024   | Milestone 2                  |
| Notifications Page                | Developed logic to retrieve latest match results with API calls                                                             | July 1, 2024   | July 11, 2024    | Milestone 3           |
| Predictions Page             | Developed predictive model and developed logic to make predictions on teams upcoming matches                                    | July 12, 2024    | July 18, 2024   | Milestone 3                   |
| User Testing               | Approach users for testing of the application                                                          | July 19, 2024   | July 26, 2024   | Milestone 3                 |
| Final Review                | Conduct a final review of the system, ensuring all requirements are met and deploy     | July 27, 2024      | July 28, 2024      | Milestone 3        |


<div style="page-break-after: always;"></div>
---

## Project Log

For the detailed project log, please refer to [this Google Sheet](https://docs.google.com/spreadsheets/d/179DmH_i8CaoBr9kc0jjaFGT2cqZNFjx_ze_DIgwsXuE/edit?usp=sharing).

| Date       | Description of Activity                                                                                                                                                                      | Hours |
|------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------|
| 5/16/2024  | Designed lift-off poster on Figma                                                                                                                                                            | 3     |
| 5/18/2024  | Mission Control #1 – Mobile App Development Part 1                                                                                                                                           | 2     |
| 5/18/2024  | Designed presentation for lift-off video                                                                                                                                                     | 2     |
| 5/19/2024  | Produced lift-off video                                                                                                                                                                      | 2     |
| 5/20/2024  | **Tutorial**: Airbnb Clone with React Native (Expo Router, Authentication, Reanimated, Clerk) <br> - Learnt to create tab bar navigation and stack pages using Expo Router <br> - Learnt to authenticate users using Clerk <br> - Learnt to create custom headers for pages | 3     |
| 5/21/2024  | **Developed technical proof-of-concept** <br> - Set up React Native environment <br> - Created template for homepage, including header component, logo and other frontend features <br> - Created tab bar and skeletal pages for other tabs, including dynamic changes to the icons when it is pressed <br> - Designed app splash and loading page on Figma <br> - Set up GitHub repository and made first few commits of current progress onto GitHub, including writing first README.md draft  | 8     |
| 5/23/2024  | **Developed technical proof-of-concept** <br> - Refactored code to make it more readable and scalable <br> - Set up general layout for home, teams, and players page <br> - Learnt and set up log-in authentication with Google using Clerk and Google Platform Console <br> - Created custom headers for homepage, teams page, and players page | 8     |
| 5/24/2024  | **Developed technical proof-of-concept** <br> - Learnt how to create card component to represent match <br> - Learnt to fetch football API into the app                                      | 4     |
| 5/25/2024  | Mission Control #2 – Mobile App Development Part 2                                                                                                                                           | 2     |
| 5/26/2024  | **Developed technical proof-of-concept** <br> - Studied how to integrate sidebar navigation with tab bar navigation <br> - Integrated sidebar navigation with tab bar navigation               | 4     |
| 5/27/2024  | **Developed technical proof-of-concept** <br> - Learnt to create branches in GitHub and create fork and pull request workflow                                                                | 2     |
| 5/29/2024  | **Developed technical proof-of-concept** <br> - Learnt to fetch data from Firebase <br> - Wrote functions that fetched, wrote, and updated data from Firebase <br> - Wrote function that saved data into local device from Firebase. This form of data is constant and does not need to be constantly called from the Firebase API, effectively reducing the number of API calls to our database | 8   |
| 5/31/2024  | **Tutorial**: Airbnb Clone with React Native (Expo Router, Authentication, Reanimated, Clerk) <br> - Learnt to create parallax effect in pages                                               | 2     |
| 6/1/2024   | **Milestone 1** <br> - Designed prototype of features in app for visualisation purposes in Milestone 1 video <br> - Produced and edited video for milestone 1                                | 5     |
| 6/3/2024   | **Product Development** <br> - Learnt TensorFlow from YouTube tutorial <br> - Experimented with building machine learning model with past match data from Kaggle                              | 10    |
| 6/5/2024   | Mission Control #3: Machine Learning Part 1                                                                                                                                                   | 2     |
| 6/7/2024   | **Product Development** <br> - Trained multiple machine learning models locally using past match data <br> - Studied and compared various ways to encode different features of data <br> - Experimented with different parameters in learning model, such as learning rate and different optimizers <br> - Researched on how others built similar football analytics model in the past | 8   |
| 6/8/2024   | Mission Control #4: Machine Learning Part 2                                                                                                                                                   | 2     |
| 6/9/2024   | **Product Development** <br> - Studied how to create Flask app, make routes and get data from Firebase onto local server <br> - Created routes and processed data from database using Pandas   | 6     |
| 6/11/2024  | **Product Development** <br> - Manipulated database to create unique team ID for each team as its primary key <br> - Sourced for data on teams logo and uploaded to GitHub <br> - Created Python script to map team name to URL of team logo using fuzzywuzzy package | 7   |
| 6/15/2024  | **Product Development** <br> - Studied how to implement FlatList for better performance on React Native compared to ScrollView component <br> - Created the team search page using FlatList   | 4   |
| 6/20/2024  | **Product Development** <br> - Studied using Axios to get data from local host <br> - Used Axios to hook data from local host into React Native app in Team Details page <br> - Created Stat component to ease creation of team statistics | 6   |
| 6/22/2024  | **Product Development** <br> - Studied how to create a dropdown picker in React Native <br> - Created the detailed teams page that checks if the team has one or two seasons worth of data and with a filter function using the seasons dropdown menu | 4  |
| 6/25/2024  | **Product Development** <br> - Researched for player data online to find player faces <br> - Experimented and created another function for player data processing <br> - Faced difficulty in creating this function due to complexity of player names which lie in their similarity | 4 |  
| 6/30/2024  | **Milestone 2** <br> - Designed the poster                                                                                                                                                   | 2     |
| 7/1/2024   | **Milestone 2** <br> - Produced and edited the video for our Milestone 2 prototype <br> - Updated the README.md                                                                              | 6     |
| 7/2/2024   | **Product Development** <br> - Studied and experimented with Expo notifications                                                                                                             | 2     |
| 7/5/2024   | **Product Development** <br> - Fixed bugs on Teams search page that caused details page to not load <br> - Conducted first round of user testing to get feedback on the app | 3 |  
| 7/10/2024  | **Product Development** <br> - Created players' tab with explore header <br> - Bubbled favorited teams up to the top of search page based on feedback received by users <br> - Implemented an activity indicator to indicate that the information from our database was still loading as users thought that there was a bug with the app because the information took some time to load and nothing was displaying on the search page | 3 |  
| 7/12/2024  | **Product Development** <br> - Updated heart icon in team card to allow favoriting of teams in the teams search page <br> - Planned how to use user token of Clerk authentication to map each user's favorite team and player in Firebase <br> - Studied how to write to Firebase within React Native to store users' favorited teams and players <br> - Integrated working favorite feature within teams page | 6 |  
| 7/15/2024  | **Product Development** <br> - Data cleaning on players' dataset <br> - Uploaded players' dataset onto database and ensured it was working and consistent | 3 |  
| 7/17/2024  | **Product Development** <br> - Created players' search page with working player card, and favoriting function similar to teams' page <br> - Bubbled favorited players to the top of the page <br> - Created new routes and data processing functions in the backend for players' data | 3 |  
| 7/19/2024  | **Product Development** <br> - Learnt to deploy app on Expo Go <br> - Deployed app on Expo Go | 3 |  
| 7/20/2024  | **Product Development** <br> - Leveraged users' favorite team data on the database to create an upcoming matches function on the homepage <br> - Conducted the second round of user testing | 3 |  
| 7/22/2024  | **Product Development** <br> - Improved landing page initially displayed "No upcoming matches" even though the page was still loading the data from our API. After it finished loading, it will suddenly change from "No upcoming matches" to a list of upcoming matches which made the user quite confused. As such, we implemented an activity indicator to indicate to the user that the information is still loading and will only display "No upcoming matches" if the user has not favorited a team | 4     |
| 7/26/2024  | **Product Development** <br> - Developed spider chart for players' detailed page to create intuitive visualization for users when browsing players' data <br> - Improved the layout of the statistics on players' page | 3     |
| 7/28/2024  | **Milestone 3** <br> - Produced and edited the video for Milestone 3 submission <br> - Contributed to README | 4     |
**Total Hours: 153**

| Date       | Description of Activity                                                                                                                                                                      | Hours |
|------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------|
| 5/16/2024  | Designed lift-off 1 poster on Figma                                                                                                                                                            | 3     |
| 5/18/2024  | Mission Control #1 Web App Development - Part 1                                                                                                                                               | 2     |
| 5/18/2024  | Mission Control #1 Mobile App Development - Part 2                                                                                                                                             | 2     |
| 5/18/2024  | Designed presentation for lift-off video                                                                                                                                                       | 2     |
| 5/23/2024  | **Tutorial**: React Native Full 8 Hours Course (Expo, Expo Router, Supabase)                                                                                                                   | 8     |
| 5/23/2024  | Set up local development environment                                                                                                                                                           | 2     |
| 5/25/2024  | Mission Control #2 Web App Development - Part 1                                                                                                                                               | 2     |
| 5/25/2024  | Mission Control #2 Mobile App Development - Part 2                                                                                                                                             | 2     |
| 5/27/2024  | **Developed technical proof-of-concept** <br> - Downloaded and cleaned data from Kaggle <br> - Learned different encodings for the datasets, and how to deal with special characters <br> - Learned how to upload data onto Firebase through Firebase SDK, and how to retrieve them in TypeScript | 8  |
| 5/27/2024  | **Developed technical proof-of-concept** <br> - Manually cleaned rows in the datasets that couldn't be done easily with code                                                                  | 3     |
| 6/1/2024   | Wrote milestone 1 README.md on GitHub                                                                                                                                                         | 6     |
| 6/5/2024   | Milestone Control #3 Machine Learning - Part 1                                                                                                                                                 | 2     |
| 6/12/2024  | Milestone Control #4 Machine Learning - Part 2                                                                                                                                                 | 2     |
| 6/14/2024  | **Tutorial**: Airbnb Clone with React Native (Expo Router, Authentication, Reanimated, Clerk)                                                                                                 | 6     |
| 6/18/2024  | CS50: AI with Python lectures 4                                                                                                                                                                | 2     |
| 6/18/2024  | CS50: AI with Python lectures 5, 6                                                                                                                                                             | 4     |
| 6/22/2024  | **Product Development** <br> - Learned how to use Jupyter Notebook <br> - Followed along CS50: AI with Python lectures to develop the basic predictive model <br> - Tested model with various optimizers and types of neural networks | 8     |
| 6/24/2024  | **Product Development** <br> - Enhanced predictive model by splitting features from what was one <br> - Debugged and refined predictive model                                                 | 8     |
| 6/26/2024  | **Product Development** <br> - Learned how to use expo-router to push and Axios to get data with API call <br> - Developed a basic notifications page with API calls to retrieve the latest match results | 8  |
| 6/29/2024  | **Product Development** <br> - Developed interactive match result notifications for users to click into <br> - Learned and implemented react native's reanimated package to add animations <br> - Styled notification page to match theme | 8 |
| 6/30/2024  | **Milestone 2** <br> - Designed poster <br> - Updated README.md                                                                                                                               | 6     |
| 7/1/2024   | **Milestone 2** <br> - Scripted video                                                                                                                                                          | 1     |
| 7/2/2024   | **Product Development** <br> - Learned how to push notifications to users' devices                                                                                                           | 5     |
| 7/9/2024   | **Product Development** <br> - Created first draft of the predictions page with API calls to football.org                                                                                     | 4     |
| 7/11/2024  | **Product Development** <br> - Updated each prediction card to be an interactive TouchableOpacity <br> - Simulated predictions onPress using a random number generator                        | 4     |
| 7/15/2024  | **Product Development** <br> - Updated predictive model to predict with appropriate and available weights to match the data used for predictions <br> - Exported predictive model as .h5, then converted to .json and .bin using tensorflowjs converter | 7  |
| 7/17/2024  | Mission Control #5 - Poster and video                                                                                                                                                          | 2     |
| 7/18/2024  | **Product Development** <br> - Bug fix package dependency errors, especially those to do with tensorflowjs and expo-camera <br> - Identify and bug fix model conversion issues by modifying model.json manually | 6  |
| 7/19/2024  | **Product Development** <br> - Added drop picker to predictions page with RNPickerSelect <br> - Added logic to trigger alerts to reduce potential bad request errors <br> - Finalized predictions page | 5   |
| 7/20/2024  | **Product Development** <br> - Updated notifications page to correctly make API calls to football.org <br> - Added logic to display error messages                                           | 3     |
| 7/22/2024  | **Product Development** <br> - Updated each notification card and the page that displays onPress <br> - Finalized notification cards and notifications page                                  | 5     |
| 7/24/2024  | **Product Development** <br> - Bug fix .svg images not rendering properly on home page, notification page, and prediction page by using react-native-svg and modifying metro.config.js         | 4     |
| 7/26/2024  | **Product Development** <br> - Data cleaning for players page                                                                                                                                  | 4     |
| 7/27/2024  | **Milestone 3** <br> - Designed poster <br> - Updated README.md with drawn diagrams and user testing <br> - Updated other parts of README.md                                                 | 5     |
**Total Hours: 149**


<div style="page-break-after: always;"></div>
---

## Contact

*Brian Lim Yen Sing: e1122376@u.nus.edu.*
*Li Han Lin: lihanlin@u.nus.edu.*

<div style="page-break-after: always;"></div>
---

# Appendices 

## Local Development

Step 1: Clone the repo
```
git clone https://github.com/brianxlim/OrbiGoal.git
```

Step 2: Navigate to the project directory

Step 3: Create a file called `.env` at the root and put in 
```
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=API_KEY
```
where `API_KEY` is known only to developers of the app.

Step 4: Create new branch for new feature/bug fix
```
git checkout -b feature/your-feature-name
```

Step 5: Add, commit and push the changes
```
git add .
git commit -m "Description of your changes"
git push origin feature/your-feature-name
```

Step 6: Open a pull request and describe the changes

