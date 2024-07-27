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
4. [**App Features**](#app-features)
5. [**Overall Navigation Flow**](#overall-navigation-flow)
6. [**User Interface Design**](#user-interface-design)
7. [**User Testinig**](#user-testing)
8. [**Software Engineering Practices**](#software-engineering-practices)
10. [**Tech Stack**](#tech-stack)
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

### Installation

1. **Clone the Repository**

   Open up your terminal and run:

   ```bash
   git clone https://github.com/brianxlim/OrbiGoal.git
   ```

2. **Create .env file**

   Navigate to the project directory:

   ```bash
   cd OrbiGoal
   ```

   Create a file called `.env` at the root and add the following content:

   ```env
   EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=API_KEY
   ```

   Replace `API_KEY` with the actual key, which is known only to the developers of the app. Please contact the developers to get the API key. Developer contacts are available at the end of this document.

3. **Install Dependencies**

   Run the following command to install the project dependencies:

   ```bash
   npm install
   ```

### Running the App

1. **Start the Expo Development Server**

   ```bash
   npx expo start
   ```

2. **Open the App on Your Device**

   - **iOS:**
     1. Install the Expo Go app from the App Store.
     2. Scan the QR code generated by the Expo CLI using the Camera app.
   - **Android: (Coming soon!)**

### Building the App (Coming soon!)

### Troubleshooting Tips

- **Network Issues**: Ensure your Mac and mobile device are on the same Wi-Fi network.
- **Expo Account**: If you have an Expo account, logging into Expo Go with the same account can sometimes simplify the process.
- **Dependencies**: If there are any issues with dependencies, try the following steps:
  1. Delete the `node_modules` folder:
     ```bash
     rm -rf node_modules
     ```
  2. Delete the `package-lock.json` file:
     ```bash
     rm package-lock.json
     ```
  3. Reinstall the dependencies:
     ```bash
     npm install
     ```

<div style="page-break-after: always;"></div>
---

## App Features

### User Account Authentication
#### Description
This feature allows users to create accounts, log in, and manage their profiles securely. It ensures that each user has a personalized experience navigating through the app. Users may also choose sign up or log in with their phone number and Google.
This feature allows users to create accounts, log in, and manage their profiles securely. It ensures that each user has a personalized experience navigating through the app. Users may also choose sign up or log in with their phone number and Google.

#### Implementation Challenges
- Integrating with social login options, especially with Apple since that requires an Apple Developer account.
- Integrating with social login options, especially with Apple since that requires an Apple Developer account.
- Ensuring the security of user data

#### Diagrams 
<div align="left" style="margin-right: 20px;">
    <img src="https://i.imgur.com/rysE88R.png" alt="Log in" width="400" style="margin-bottom: 20px;">
</div>

<div style="page-break-after: always;"></div>

### Teams & Players Search
#### Description
This feature allows users to search for detailed information about teams and players, including statistics, performance history, and other relevant data. The filter option on the top right corner allows users to select a league to narrow down their search results.
This feature allows users to search for detailed information about teams and players, including statistics, performance history, and other relevant data. The filter option on the top right corner allows users to select a league to narrow down their search results.

#### Implementation Challenges
- Integrating dataset, uploading Kaggle data onto Firebase
  The raw data from Kaggle had issues displaying accented alphabets. We faced errors using encoding="utf" within read_csv(), the other encodings could not display them correctly either. To tackle the issue, we converted the csv into json and edited the characters manually to clean them before uploading them to Firebase.
- Integrating dataset, uploading Kaggle data onto Firebase
  The raw data from Kaggle had issues displaying accented alphabets. We faced errors using encoding="utf" within read_csv(), the other encodings could not display them correctly either. To tackle the issue, we converted the csv into json and edited the characters manually to clean them before uploading them to Firebase.
- Handling large datasets efficiently
- Ensuring the accuracy and relevancy of search results
- Providing a user-friendly search interface
- Ensuring high performance and minimizing lags with the great number of teams and players
- Difficulty in finding a dataset with both the relevant player information as well as player faces
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
    <img src="https://i.imgur.com/aqLAY5y.png" alt="Filter button that allows filtering by league" width="400" style="margin-bottom: 20px;">
    <img src="https://i.imgur.com/3MJ0AAA.png" alt="Using search bar" width="400" style="margin-bottom: 20px;">
    <img src="https://imgur.com/AL49Fg4.png" alt="Players filter button" width="400" style="margin-bottom: 20px;">
</div>

<div style="page-break-after: always;"></div>

### Team Details Page
#### Description
A dedicated page for displaying comprehensive details about a team to analyse historical trends and compare with teams in the same league. Users can also filter by season if there is enough information for both seasons.

#### Implementation Challenges
- Designing a detailed and informative layout
- Fetching and displaying dynamic data efficiently
- Ensuring the page is user-friendly and visually appealing

#### Diagrams
<div align="left" style="margin-right: 20px;">
    <img src="https://i.imgur.com/RE7F8BK.png" alt="Team Details Page" width="400" style="margin-bottom: 20px;">
    <img src="https://i.imgur.com/mpLG9Nr.png" alt="Team Details Page" width="400" style="margin-bottom: 20px;">
    <img src="https://imgur.com/BLDH8tT.png" alt="Player Search" width="400" style="margin-bottom: 20px;">
    <img src="https://imgur.com/CHaUb2i.png" alt="Team Search" width="400" style="margin-bottom: 20px;">
</div>

After working on the team search page for Milestone 2, we managed to create a more intuitive and efficient team search page. Utilizing the `Flatlist` component, we were able to achieve greater performance as compared to the `ScrollView` component which we were using initially. We also implemented a league filter for the teams so users can filter for those teams in relevant leagues. We plan to integrate more filters in the future for teams and players alike. Due to the significantly expansive size of the players dataset, coupled with a lack of suitable dataset that mapped the player's faces to their statistics, we are unable to create the player's search page by Milestone 2. However, Milestone 2 allowed us to experiment with different types of the teams page and implementations, which will undoubtedly help us in expediting the process to build the player's page. This is our updated team search page.

<div align="left" style="margin-right: 20px;">
    <img src="https://i.imgur.com/urSELJv.png" alt="Updated Team Search" width="400" style="margin-bottom: 20px;">
</div>

In Milestone 2, we also implemented the filter for leagues and working search bar. 

<div align="left" style="margin-right: 20px;">
    <img src="https://i.imgur.com/aqLAY5y.png" alt="Filter button that allows filtering by league" width="400" style="margin-bottom: 20px;">
    <img src="https://i.imgur.com/3MJ0AAA.png" alt="Using search bar" width="400" style="margin-bottom: 20px;">
    <img src="https://imgur.com/AL49Fg4.png" alt="Players filter button" width="400" style="margin-bottom: 20px;">
</div>

<div style="page-break-after: always;"></div>

### Team Details Page
#### Description
A dedicated page for displaying comprehensive details about a team to analyse historical trends and compare with teams in the same league. Users can also filter by season if there is enough information for both seasons.

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

### Match Predictions (In development)
#### Description
This feature provides users with predictions for upcoming football matches based on historical data and performance metrics. This feature was implemented through the usage of artificial neural networks, and the TensorFlow package in python. The predictions were weighted against key performance indicators of a team's previous few games such as goals scored, red cards, yellow cards and possession.
This feature provides users with predictions for upcoming football matches based on historical data and performance metrics. This feature was implemented through the usage of artificial neural networks, and the TensorFlow package in python. The predictions were weighted against key performance indicators of a team's previous few games such as goals scored, red cards, yellow cards and possession.

#### Implementation Challenges
- Collecting and preprocessing large volumes of match data
- Choosing and tuning the appropriate machine learning models
- Continuously updating the prediction model with new data
- Integrating predictions into actual application

In Milestone 2, we created our working machine learning model which can make score predictions based on certain features of a match up that we deem important. Some of these features include the team formation, team scores, and team performance that is measured by each player's contribution to the match. To this end, we had to perform extensive data manipulation and data processing such as encoding categorical features. We also needed to create our own performance score layer to integrate into our model to account for various factors that may change in significance when the model learns from the dataset.
- Integrating predictions into actual application

In Milestone 2, we created our working machine learning model which can make score predictions based on certain features of a match up that we deem important. Some of these features include the team formation, team scores, and team performance that is measured by each player's contribution to the match. To this end, we had to perform extensive data manipulation and data processing such as encoding categorical features. We also needed to create our own performance score layer to integrate into our model to account for various factors that may change in significance when the model learns from the dataset.

#### Diagrams
<div align="left" style="margin-right: 20px;">
    <img src="https://imgur.com/m9koacj.png" alt="Log in" width="400" style="margin-bottom: 20px;">
</div>

While the entire process of building the model can be found in this repository – "Predictive Model.ipynb", we have outlined some steps that we took to build this model below.

<div align="left" style="margin-right: 20px;">
    <img src="https://i.imgur.com/igvRl9m.png" alt="Tensorflow model building" width="400" style="margin-bottom: 20px;">
    <img src="https://i.imgur.com/6LK8PSA.png" alt="Tensorflow model building" width="400" style="margin-bottom: 20px;">
    <img src="https://i.imgur.com/pdal5NB.png" alt="Tensorflow model building" width="400" style="margin-bottom: 20px;">
</div>

While the entire process of building the model can be found in this repository – "Predictive Model.ipynb", we have outlined some steps that we took to build this model below.

<div align="left" style="margin-right: 20px;">
    <img src="https://i.imgur.com/igvRl9m.png" alt="Tensorflow model building" width="400" style="margin-bottom: 20px;">
    <img src="https://i.imgur.com/6LK8PSA.png" alt="Tensorflow model building" width="400" style="margin-bottom: 20px;">
    <img src="https://i.imgur.com/pdal5NB.png" alt="Tensorflow model building" width="400" style="margin-bottom: 20px;">
</div>

<div style="page-break-after: always;"></div>

### Customize Dashboard (In development)
#### Description
Users can customize their dashboard to display their preferred teams, players, and statistics, providing a personalized experience.

#### Implementation Challenges
- Designing a flexible and intuitive user interface
- Ensuring the customization options are comprehensive and easy to use
- Maintaining performance while rendering customized content
- Introducing a favouriting option to display favourited teams and players on the homepage

#### Diagrams
<div align="left" style="margin-right: 20px;">
    <img src="https://imgur.com/k5tV3Sx.png" alt="Log in" width="400" style="margin-bottom: 20px;">
</div>

<div style="page-break-after: always;"></div>

### Notifications 
#### Description
This feature sends notifications to users about important updates and latest results of matches from top 5 leagues globally. The results of football matches are retrieved from API calls to https://www.football-data.org/.
This feature sends notifications to users about important updates and latest results of matches from top 5 leagues globally. The results of football matches are retrieved from API calls to https://www.football-data.org/.

#### Implementation Challenges
- Push notifications without an Apple Developer Account are not possible
- Certain images retrieved are in .svg instead of .png and therefore experience problems rendering
- Ensuring timely delivery of notifications onto the notifications page, could be done with a cron job (in development!)
- Allowing users to customize their notification preferences (various types of notifications in development)

In Milestone 2, we created the notifications page to display the latest 30 days of match results from the top 5 leagues around the globe. These data are retrieved from a free online source. The notifications are arranged from the latest to the earliest, giving the user a brief summary of each match at one glance. Users are able to click a notification to view the match in detail (in development), a new tab created with parallax image. 

#### Diagrams
<div align="left" style="margin-right: 20px;">
    <img src="https://imgur.com/T26AayY.png" alt="Log in" width="400" style="margin-bottom: 20px;">
    <img src="https://imgur.com/fR3kkPw.png" alt="Log in" width="400" style="margin-bottom: 20px;">
</div>

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
    <p>Click on the hamburger icon on the top-left corner to access your profile and manage your settings.</p>
    <img src="https://imgur.com/y9Kj3sN.png" alt="Log in" width="400" style="margin-bottom: 20px;">
</div>

<div style="page-break-after: always;"></div>

### See notifications

<div align="left" style="margin-right: 20px;">
    <p>View important updates and results from latest football matches.</p>
    <img src="https://imgur.com/T26AayY.png" alt="Log in" width="400" style="margin-bottom: 20px;">
    <img src="https://imgur.com/fR3kkPw.png" alt="Log in" width="400" style="margin-bottom: 20px;">
</div>

<div style="page-break-after: always;"></div>

### Team/player data and statistics

<div align="left" style="margin-right: 20px;">
    <p>Search for your favourite teams under the teams tab.</p>
    <img src="https://imgur.com/sd6J431.png" alt="Log in" width="400" style="margin-bottom: 20px;">
    <img src="https://imgur.com/CHaUb2i.png" alt="Log in" width="400" style="margin-bottom: 20px;">
    <img src="https://imgur.com/x52j9iE.png" alt="Log in" width="400" style="margin-bottom: 20px;">
    <img src="https://imgur.com/x52j9iE.png" alt="Log in" width="400" style="margin-bottom: 20px;">
    <p>Search for your favourite players under the players tab.</p>
    <img src="https://imgur.com/rYde3M4.png" alt="Log in" width="400" style="margin-bottom: 20px;">
    <img src="https://imgur.com/BLDH8tT.png" alt="Log in" width="400" style="margin-bottom: 20px;">
    <img src="https://imgur.com/AL49Fg4.png" alt="Log in" width="400" style="margin-bottom: 20px;">
    <img src="https://imgur.com/AL49Fg4.png" alt="Log in" width="400" style="margin-bottom: 20px;">
</div>

<div style="page-break-after: always;"></div>

### Match predictions

<div align="left" style="margin-right: 20px;">
    <img src="https://imgur.com/m9koacj.png" alt="Log in" width="400" style="margin-bottom: 20px;">
</div>

<div style="page-break-after: always;"></div>
---

## User Interface Design

Visit [Figma](https://docs.google.com/spreadsheets/d/179DmH_i8CaoBr9kc0jjaFGT2cqZNFjx_ze_DIgwsXuE/edit?usp=sharing) for our UI design!

<div style="page-break-after: always;"></div>
---

## User Testing
- Landing Page:
  1. Landing page initially wanted to put all the matches available for the player's liked teams, but realised that users of the app said it made the loading times very slow and it was unnecessary. As such, we only limited to showing the top 8 most recent matches.
  2. Landing page initially displayed "No upcoming matches" even though the page was still loading the data from our API. After it finished loading, it will suddenly change from "No upcoming matches" to a list of upcoming matches which made the user quite confused. As such, we implemented an activity indicator to indicate to the user that the information is still loading and will only display "No upcoming matches" if user has not favorited a team
- Team Page:
  1. User thought that there was a bug with the app because the information took some time to load and nothing was displaying on the search page. As such, we implemented an activity indicator to indicate that the information from our database was still loading
- Notifications Page:
  1. User noticed that the league selection drop picker does not render with the proper size on their devices (the bar would go beyond the screen). This was later identified to be due to the fact that the notifications page was developed on an iPhone 15 Pro Max simulator. The size of the drop picker was designed to fit the screen of a bigger iPhone model. As such, the size of the drop picker was adjusted in the stylesheet to match those of a regular iPhone size. 
  2. The notifications page would initially display all recent matches in the top 5 leagues. After selecting a league from the drop picker, the page would filter the matches to only display matches of the selected league. However, user noticed that after selecting a league, if the user were to selected the default "Select League" option of the drop picker, an error would show and the page would not render properly again when selecting another league. To tackle this, the "Select League" option in the drop picker was "invalidated" after selecting an actual league, such that when the user attempts to select it manually, the drop picker would automatically change to select the previously selected league, ensuring "Select League" can never be selected manually and therefore fixing the bug, using an if else statement in the function that handles league change.
  3. Users noticed that the images of the crests of the teams, or the country flags of the league, would not render properly. This was later identified to be due to the fact that the some of the images are in .svg format from the API. To tackle this, metro.config.js was modified to include an svg transformer. The notifications page was also updated to include import react native's svg package, and logic to render both svg and png images, depending on the format of the image.
- Predictions Page:
  1. User noticed that prediction card is pressed, the predicted score would sometimes display NaN - NaN. This was because the user selected the same team for home and away. As such, an alert was implemented to pop up when the user attempts to select the same team for home and away, and the prediction card would not be rendered so as to tackle the bug.
  2. As the predictions page also used the same API as the notifications page, user experienced the same issue rendering images in .svg format. The same package and logic was implemented to render images properly.
  3. User would sometimes experience AxiosError 429 when clicking navigating around the page too quickly. This was because the page retrieves all scheduled matches in the next 3 months first then filter down to the top 5 leagues. To tackle this, the filter was implemented during the fetching of scheduled matches in the initial fetch with the API, such that only matches in the top 5 leagues are fetched. A delay of 1 second was also implemented after fetching data of one league before moving on to the next (so in total, 4 seconds delay as there are 5 leagues) so as to eliminate other potential reasons of getting AxiosError 429, sacrificing a little performance speed for a better experience overall.

## Software Engineering Practices

1. **Agile Methodology**: We follow an agile approach to project management, breaking down our development process into small, manageable tasks or sprints. This allows us to adapt quickly to changes and deliver features incrementally.

2. **Version Control with Git**: We use Git for version control, enabling our team to collaborate seamlessly on the codebase. With Git, we can track changes, manage branches, and merge code efficiently.

<img width="1316" alt="image" src="https://github.com/user-attachments/assets/afb153b9-8cb4-484d-9d02-0e4295ef531d">

3. **Code Reviews**: We conduct regular code reviews to ensure the quality of our codebase. By reviewing each other's code, we can identify potential issues, share knowledge, and maintain consistency across our project.

4. **Testing**: We will implement a comprehensive testing strategy, including features such as end-to-end tests. Testing helps us validate the functionality of our application, catch bugs early, and ensure a reliable user experience.

5. **Documentation**: We maintain thorough documentation throughout our development process. This includes README files, code comments, and user guides. Documentation helps us communicate effectively, onboard new team members, and ensure the long-term maintainability of our project.

<img width="1316" alt="image" src="https://github.com/user-attachments/assets/20bfb882-26cd-4912-8d11-6fd042ba67a8">

<img width="1316" alt="image" src="https://github.com/user-attachments/assets/a062b479-9c69-43b1-9265-65fcd43fd74f">

<div style="page-break-after: always;"></div>
---

## Tech Stack

- **Python**: Backend development and data processing
  1. app.py
  <img width="839" alt="image" src="https://github.com/user-attachments/assets/28eaf4a8-edd3-4b8d-8f52-869447d4c1d1">
  <img width="839" alt="image" src="https://github.com/user-attachments/assets/99edc165-3828-463d-9d26-583d269add4e">
  2. cleaning.ipynb
  <img width="839" alt="image" src="https://github.com/user-attachments/assets/d4f9d5e9-7622-430c-9ce7-28a567d5982b">
  <img width="839" alt="image" src="https://github.com/user-attachments/assets/7d55bd3b-48b2-45c1-8e2c-4c98acef0db7">
  3. uploaddata.py
  <img width="839" alt="image" src="https://github.com/user-attachments/assets/6bba428c-5a28-4c2c-8a50-97629aa63dd5">
  4. PredictiveModel.ipynb
  <img width="839" alt="image" src="https://github.com/user-attachments/assets/a38c8baf-8eef-4182-be37-88f569e1282b">
  <img width="839" alt="image" src="https://github.com/user-attachments/assets/af653dd0-19db-4652-b284-924ae334a64b">


- **React Native/Expo Go**: Mobile application development
<img width="173" alt="image" src="https://github.com/user-attachments/assets/b46fed3b-0630-4535-b793-6707633c7770">


- **TypeScript**: Frontend development
  1. index.tsx
  <img width="1499" alt="image" src="https://github.com/user-attachments/assets/cd5654bb-8dee-445f-a97d-a8a8f753f80a">
  2. notifications.tsx
  <img width="1499" alt="image" src="https://github.com/user-attachments/assets/b296aec7-cd5a-4300-bf26-4f683e2aafe1">
  2.1 \[notifId].tsx
  <img width="1499" alt="image" src="https://github.com/user-attachments/assets/4eb3f67c-f43b-4dec-a885-46ce67cc8081">
  3. teams.tsx
  <img width="1499" alt="image" src="https://github.com/user-attachments/assets/af9e82f8-8b72-4b35-9b6b-6fe81cc3752c">
  3.1 \[teamId].tsx
  <img width="1499" alt="image" src="https://github.com/user-attachments/assets/11a1568c-3a33-4816-b2d4-a01b8ddffa77">
  4. predictions.tsx
  <img width="1499" alt="image" src="https://github.com/user-attachments/assets/afef3085-40c8-4864-aa72-f6d065020c17">
  5. _layout.tsx
  <img width="1499" alt="image" src="https://github.com/user-attachments/assets/a9b824fa-31a1-47ac-a56c-e6016ed06505">

- **Firebase**: Database management
Teams data used for teams page
<img width="1498" alt="image" src="https://github.com/user-attachments/assets/3e69a947-ece1-40c7-84ac-300662dde285">
Top clubs data used for predictions page
<img width="1498" alt="image" src="https://github.com/user-attachments/assets/27b9fead-037e-4d5d-90c3-110888c60a25">
User data used for favouriting and home page
<img width="1498" alt="image" src="https://github.com/user-attachments/assets/290788dd-2c61-449c-8ba5-58cae11f582d">
<img width="1498" alt="image" src="https://github.com/user-attachments/assets/bd8bb9a6-4c74-4bc1-b1bf-06a1572bbc3b">

- **Scikit-learn, TensorFlow, Keras**: Machine learning algorithms
<img width="845" alt="image" src="https://github.com/user-attachments/assets/c7480cd3-0f64-491e-814f-1652efb527fb">
<img width="845" alt="image" src="https://github.com/user-attachments/assets/adf5664a-c3a5-48c0-9987-80a94994ce6a">


<div style="page-break-after: always;"></div>
---

## Project Log

For the detailed project log, please refer to [this Google Sheet](https://docs.google.com/spreadsheets/d/179DmH_i8CaoBr9kc0jjaFGT2cqZNFjx_ze_DIgwsXuE/edit?usp=sharing).

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

