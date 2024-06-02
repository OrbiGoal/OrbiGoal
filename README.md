<div align="center">
    <div style="background-color: #4b0082; padding: 10px; display: inline-block;">
        <img src="https://imgur.com/XWrG8HP.png" alt="Orbigoal Logo" width="200">
    </div>
    <h1>OrbiGoal</h1>
    <h3>[Orbital Apollo]</h3>
    <h2>README</h2>
    <p>Brian Lim Yen Sing, A0272973R, Year 1 Business Analytics<br>
    Li Han Lin, A0273744X, Year 1 Business Analytics</p>
</div>

---

# Table of Contents

1. [**Project Overview**](#project-overview)
2. [**Foreword**](#foreword)
3. [**Getting Started**](#getting-started)
4. [**Features**](#features)
5. [**Overall Navigation Flow**](#overall-navigation-flow)
6. [**User Interface Design**](#user-interface-design)
7. [**Model-Entity Relationship**](#model-entity-relationship)
8. [**Software Engineering Practices**](#software-engineering-practices)
10. [**Tech Stack**](#tech-stack)
13. [**Project Log**](#project-log)
14. [**Contact**](#contact)

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

---

## Getting Started

To access the OrbiGoal app, follow these steps:

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

Please do also bring along your mobile device (iOS or Android), or have a simulator ready.

### Installation

1. **Clone the Repository**
   
   Open up your terminal and run
   
   ```bash
   git clone https://github.com/brianxlim/OrbiGoal.git
   cd OrbiGoal
   ```

3. **Create .env file**
   
  Create a file called `.env` at the root and put in the following
  
  ```
  EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=API_KEY
  ```
  where `API_KEY` is known only to developers of the app. Please contact the developers to get the API key. Developers contacts are available at the end of this document.

3. **Install Dependencies**

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
   - **Android:**
     (Coming soon!)

### Building the App

  (Coming soon!)

---

## Features

### User Account Authentication
#### Description
This feature allows users to create accounts, log in, and manage their profiles securely. It ensures that each user has a personalized experience navigating through the app.

#### Implementation Philosophy & Details
The authentication system is built with a focus on security and user convenience.
**Other details**

#### Implementation Challenges
- Integrating with social login options (e.g., Google, Facebook)
- Ensuring the security of user data

#### Diagrams
(Include any relevant diagrams here)

### Teams & Players Search
#### Description
This feature allows users to search for detailed information about teams and players, including statistics, performance history, and other relevant data.

#### Implementation Philosophy & Details
The search functionality is designed to be fast and intuitive, providing users with quick access to comprehensive football data. We focus on delivering accurate and up-to-date information.
**Other details**

#### Implementation Challenges
- Integrating dataset, uploading kaggle data onto Firebase
- Handling large datasets efficiently
- Ensuring the accuracy and relevancy of search results
- Providing a user-friendly search interface

#### Diagrams
(Include any relevant diagrams here)

### Match Predictions
#### Description
This feature provides users with predictions for upcoming football matches based on historical data and performance metrics.

#### Implementation Philosophy & Details
The prediction model leverages machine learning algorithms to analyze past match data and predict future outcomes. Our goal is to offer reliable and insightful predictions to enhance user engagement.
**Other details**

#### Implementation Challenges
- Collecting and preprocessing large volumes of match data
- Choosing and tuning the appropriate machine learning models
- Continuously updating the prediction model with new data

#### Diagrams
(Include any relevant diagrams here)

### Customize Dashboard
#### Description
Users can customize their dashboard to display their preferred teams, players, and statistics, providing a personalized experience.

#### Implementation Philosophy & Details
The customizable dashboard aims to enhance user engagement by allowing users to tailor their experience according to their interests and preferences.
**Other details**

#### Implementation Challenges
- Designing a flexible and intuitive user interface
- Ensuring the customization options are comprehensive and easy to use
- Maintaining performance while rendering customized content

#### Diagrams
(Include any relevant diagrams here)

### Notifications
#### Description
This feature sends notifications to users about important updates, match results, and other relevant football news.

#### Implementation Philosophy & Details
The notification system is designed to keep users informed and engaged without overwhelming them with too many alerts. We focus on delivering timely and relevant notifications.
**Other details**

#### Implementation Challenges
- Ensuring timely delivery of notifications
- Allowing users to customize their notification preferences
- Avoiding notification spam while keeping users informed

#### Diagrams
(Include any relevant diagrams here)

### Forum Posts (Coming soon!)
#### Description
This upcoming feature will allow users to participate in discussions, share opinions, and engage with the community through forum posts.

#### Implementation Philosophy & Details
The forum will be built to foster community engagement and provide a platform for users to discuss football-related topics. We aim to create a vibrant and respectful community space.
**Other details**

#### Implementation Challenges
- Implementing a robust and scalable forum system
- Moderating content to maintain a positive community environment
- Integrating forum features seamlessly with the rest of the app

#### Diagrams
(Include any relevant diagrams here)

---

## Overall Navigation Flow

View [this video](https://drive.google.com/file/d/1gjAvnkLFX5tYebkHPtpCdLzUEE7t8HBQ/view?usp=drive_link) to help you get started!

### Logging in
<div align="left" style="margin-right: 20px;">
    <p>If this is the first time you are opening the app, you should be automatically prompted to create an account with your email or log in with other methods.</p>
    <img src="https://i.imgur.com/rysE88R.png" alt="Log in" width="400" style="margin-bottom: 20px;">
    <img src="https://imgur.com/d07Hj85.png" alt="Log in" width="400" style="margin-bottom: 20px;">
    <p>Complete authentication to get into the homepage.</p>
    <img src="https://imgur.com/k5tV3Sx.png" alt="Log in" width="400" style="margin-bottom: 20px;">
</div>

### View profile

<div align="left" style="margin-right: 20px;">
    <p>Click on the hamburger icon on the top-left corner to access your profile and manage your settings.</p>
    <img src="https://imgur.com/y9Kj3sN.png" alt="Log in" width="400" style="margin-bottom: 20px;">
</div>

### See notifications

<div align="left" style="margin-right: 20px;">
    <p>View your notifications.</p>
    <img src="https://imgur.com/W1jInyb.png" alt="Log in" width="400" style="margin-bottom: 20px;">
</div>

### Team/player data and statistics

<div align="left" style="margin-right: 20px;">
    <p>Search for your favourite teams under the teams tab.</p>
    <img src="https://imgur.com/sd6J431.png" alt="Log in" width="400" style="margin-bottom: 20px;">
    <img src="https://imgur.com/CHaUb2i.png" alt="Log in" width="400" style="margin-bottom: 20px;">
    <p>Search for your favourite players under the players tab.</p>
    <img src="https://imgur.com/rYde3M4.png" alt="Log in" width="400" style="margin-bottom: 20px;">
    <img src="https://imgur.com/BLDH8tT.png" alt="Log in" width="400" style="margin-bottom: 20px;">
</div>

### Match predictions

<div align="left" style="margin-right: 20px;">
    <p>Access predicted match results by the model we produced or by other AI platforms under the predictions tab.</p>
    <img src="https://imgur.com/m9koacj.png" alt="Log in" width="400" style="margin-bottom: 20px;">
</div>

---

## User Interface Design

*Detailing design decisions and user interface components.*

---

## Software Engineering Practices

1. **Agile Methodology**: Adopting an agile approach to project management, breaking down the development process into small, manageable tasks or sprints.
2. **Version Control with Git**: Using Git for version control to allow multiple team members to collaborate on the codebase simultaneously.
3. **Code Reviews**: Conducting regular code reviews to ensure code quality, identify potential issues, and share knowledge among team members.
4. **Testing**: Implementing a combination of unit tests, integration tests, and end-to-end tests to ensure the reliability and functionality of the application.
5. **Continuous Integration and Deployment (CI/CD)**: Setting up CI/CD pipelines to automate the build, testing, and deployment processes.
6. **Documentation**: Maintaining comprehensive documentation throughout the development process.


---

## Tech Stack

- **Python**: Backend development and data analysis
- **React Native/Expo Go**: Mobile application development
- **HTML/CSS/JavaScript/TypeScript**: Frontend development
- **Firebase**: Database management
- **Scikit-learn**: Machine learning algorithms

---

## Project Log

| S/N | Task                                            | Date          | Brian (hrs) | Han Lin (hrs) | Remarks                                                           |
| --- | ----------------------------------------------- | ------------- | ----------- | ------------- | ----------------------------------------------------------------- |
| 1   | First sketch of wireframe                       | 12 May        | 4           | 4             | Met up physically to finalize project direction, color scheme... |
| 2   | Consultation with advisor                      | 13 May        | 1           | 1             | Feedback from initial proposal                                    |
| 3   | Start on user interface design                  | 14 May        | 10          | 10            | Designed main screens (Home, Analytics, Navigation, Tasks)       |
| 4   | Design additional screens and overlays         | 15 May        | 8           | 10            | Wireframe creation, poster design, 1-minute pitch script...      |
| 5   | Technical knowledge research                   | Start: 10 May| 20          | 20            | YouTube tutorials, online notes on Flutter, Dart, State...       |
| 6   | Welcome Page and Login Page                    | 16 May        | 5           | 0             | Coded Welcome page, Firebase setup for authentication             |
| 7   | Home Page                                      | 16 May        | 0           | 5             | Completed Home page                                               |
| 8   | User account authentication for email and password login | 17 May | 8     | 0             | Implemented email and password login, reset password feature      |
| 9   | Analytics Page                                 | 18 May        | 0           | 6             | Completed Analytics page, UI design changes to insights category  |
| 10  | User account authentication for Google and Facebook | 18 May | 8     | 0             | Implemented Google and Facebook login, Firebase Authentication    |
| 11  | User Onboarding Flow, Database Design          | 21 May        | 6           | 6             | Planned user onboarding flow, Explored data modeling, Firestore |
| 12  | User Flow Diagram                              | 22 May        | 3           | 3             | Created user flow diagram using Google Flowchart maker           |
| 13  | Report Writing for milestone 1 submission      | 23 May        | 4           | 4             |                                                                   |
| 14  | Onboarding Screens and redesign of check in page | Start: 24 May | 8          | 3             | Created onboarding screens, Redesigned check-in page             |
| 15  | Onboarding Screens and redesign of check in page | End: 27 May  |             |               |                                                                   |
| 16  | Introduction Screens                           | 28 May        | 0           | 4             | Rendered introduction pages with skip button                     |
| 17  | Communicating with Firestore                   | 31 May        | 6           | 0             | Query and set data to Firestore                                  |
| 18  | Calendar package                               | 1 June        | 6           | 0             | Unpackaged table calendar package from Flutter                   |
| 19  | Nutrition Log Frontend                         | 2 June        | 8           | 0             | Initial nutrition log UI without backend                         |
| 20  | Focus Log Frontend                             | 3 June        | 6           | 0             | Focus Log frontend without working countdown timer               |
| 21  | Security Measures                              | 4 June        | 0           | 6             | Sorted out security measures, Created .env file                  |
| 22  | UI updates                                     | 5 June        | 0           | 7             |                                                                   |
| 23  | Nutrition Backend                              | Start: 6 June | 16          | 16            | Connected nutrition search to Calorie Ninja API, Defined data...  |
|     |                                                | End: 8 June   |             |               |                                                                   |
| 24  | Focus Backend                                  | 9 June        | 5           | 0             | Completed focus backend, Circular slider displaying updated...   |
| 25  | Mood and Sleep Tracker Backend                 | 10 June       | 3           | 0             | Bottom sheet for mood and sleep tracker, Created controllers...  |
| 26  | Test and debug                                 | 11 June       | 4           | 4             | Fixed issues with countdown timer                                |
| 27  | Task and Project Backend                       | Start: 13 June| 20          | 20            | Completed tasks page backend, Added new projects, Milestone...   |
|     |                                                | End: 17 June  |             |               |                                                                   |
| 28  | Fitness Log Backend                            | Start: 17 June| 15          | 15            | Completed fitness log backend, Automatic calorie calculation... |
|     |                                                | End: 19 June  |             |               |                                                                   |
| 29  | Integrate Fitness data with Navigation Page    | 19 June       | 0           | 4             | Wrote query and logic to display workout data on navigation...   |
| 30  | Insights Algorithm Initial Write               | 20 June       | 0           | 3             | Setup with Firestore, Loaded statistics libraries               |
| 31  | Insights Algorithm Initial Write               | Start: 21 June| 35          | 35            | Implementing modified DFS algorithm, Correlation analysis...     |
|     |                                                | End: 26 June  |             |               | Fine-tuning, testing, Converting to REST API, Deployment...      |
| 32  | Post milestone 2 test and bug fixes            | 5 July & 6 July | 4         | 4             | Implemented dialog box for Task and Milestone, Fixed focus...    |
|     |                                                |               |             |               | Set up test environment for insights algo                        |
| 33  | Setting screen                                 | 7 July        | 6           | 6             | Implemented log in streak, Tested award system for sleep log...  |
|     |                                                |               |             |               | Built the main setting page                                      |
| 34  | Moving algo to class part 1                    | 8 July        | 6           | 6             | Moved the main data structures into a class for the algorithm    |
| 35  | Update data client                             | 11 July       | 0           | 4             | Clean up data client                                             |
| 36  | Moving algo to class part 2                    | 13 July       | 8           | 4             | Completed changing insights algo to OOP, Added badges designs...  |
|     |                                                |               |             |               | Implementation of Profile Picture feature                        |
| 37  | Setting pages                                  | 15 July       | 6           | 2             | Contact us and FAQ pages, Started on unit test for auth...       |
| 38  | Implementation of edit goals in settings page  | 16 July       | 0           | 3             | Calories recommended updates in real time depending...           |
| 39  | Unit test and theme implementation             | 17 July       | 4           | 6             | Unit testing up till task controller, Update theme               |
| 40  | Completion of unit tests cases and bug fixes   | 18 July       | 6           | 6             |                                                                   |
| 41  | Initial integration tests                      | 19 July       | 5           | 2             | Set up the initial integration test cases                        |
| 42  | Widget tests                                   | 20 July       | 0           | 4             | Complete widget tests.                                           |
|     | **Total**                                       |               | **259**     | **237**       |                                                                   |


---

## Contact

*Brian Lim Yen Sing: e1122376@u.nus.edu.*
*Li Han Lin: lihanlin@u.nus.edu.*

---

# OrbiGoal 2024

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

