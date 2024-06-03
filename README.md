<div align="center">
    <img src="https://imgur.com/XWrG8HP.png" alt="Orbigoal Logo" width="200">
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

## Troubleshooting Tips

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

## Troubleshooting Tips

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

---

## Features (In development)

### User Account Authentication
#### Description
This feature allows users to create accounts, log in, and manage their profiles securely. It ensures that each user has a personalized experience navigating through the app. Users may also choose sign up or log in with their phone number, Apple ID, Google and Facebook.

#### Implementation Challenges
- Integrating with social login options (e.g., Google, Facebook)
- Ensuring the security of user data

#### Diagrams 
<div align="left" style="margin-right: 20px;">
    <img src="https://i.imgur.com/rysE88R.png" alt="Log in" width="400" style="margin-bottom: 20px;">
</div>

### Teams & Players Search
#### Description
This feature allows users to search for detailed information about teams and players, including statistics, performance history, and other relevant data.

#### Implementation Challenges
- Integrating dataset, uploading kaggle data onto Firebase
  The raw data from kaggle had issues displaying accented alphabets. We faced errors using encoding="utf" within read_csv(), the other encodings could not display them correctly either. To tackle the issue, we converted the csv into json and edited the characters manually to clean them before uploading onto Firebase.
- Handling large datasets efficiently
- Ensuring the accuracy and relevancy of search results
- Providing a user-friendly search interface

#### Diagrams
<div align="left" style="margin-right: 20px;">
    <img src="https://imgur.com/BLDH8tT.png" alt="Log in" width="400" style="margin-bottom: 20px;">
    <img src="https://imgur.com/CHaUb2i.png" alt="Log in" width="400" style="margin-bottom: 20px;">

</div>

### Match Predictions
#### Description
This feature provides users with predictions for upcoming football matches based on historical data and performance metrics.

#### Implementation Challenges
- Collecting and preprocessing large volumes of match data
- Choosing and tuning the appropriate machine learning models
- Continuously updating the prediction model with new data

#### Diagrams
<div align="left" style="margin-right: 20px;">
    <img src="https://imgur.com/m9koacj.png" alt="Log in" width="400" style="margin-bottom: 20px;">
</div>

### Customize Dashboard
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

### Notifications
#### Description
This feature sends notifications to users about important updates, match results, and other relevant football news.

#### Implementation Challenges
- Ensuring timely delivery of notifications
- Allowing users to customize their notification preferences

#### Diagrams
<div align="left" style="margin-right: 20px;">
    <img src="https://imgur.com/W1jInyb.png" alt="Log in" width="400" style="margin-bottom: 20px;">
</div>

### Forum Posts (Coming soon!)
#### Description
This upcoming feature will allow users to participate in discussions, share opinions, and engage with the community through forum posts.

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

Visit [Figma](https://docs.google.com/spreadsheets/d/179DmH_i8CaoBr9kc0jjaFGT2cqZNFjx_ze_DIgwsXuE/edit?usp=sharing) for our UI design!

---

## Software Engineering Practices

1. **Agile Methodology**: We follow an agile approach to project management, breaking down our development process into small, manageable tasks or sprints. This allows us to adapt quickly to changes and deliver features incrementally.

2. **Version Control with Git**: We use Git for version control, enabling our team to collaborate seamlessly on the codebase. With Git, we can track changes, manage branches, and merge code efficiently.

3. **Code Reviews**: We conduct regular code reviews to ensure the quality of our codebase. By reviewing each other's code, we can identify potential issues, share knowledge, and maintain consistency across our project.

4. **Testing**: We implement a comprehensive testing strategy, including unit tests, integration tests, and end-to-end tests. Testing helps us validate the functionality of our application, catch bugs early, and ensure a reliable user experience.

5. **Continuous Integration and Deployment (CI/CD)**: We set up CI/CD pipelines to automate our build, testing, and deployment processes. With CI/CD, we can streamline our development workflow, reduce manual errors, and deliver updates to our users faster.

6. **Documentation**: We maintain thorough documentation throughout our development process. This includes README files, code comments, and user guides. Documentation helps us communicate effectively, onboard new team members, and ensure the long-term maintainability of our project.


---

## Tech Stack

- **Python**: Backend development and data analysis
- **React Native/Expo Go**: Mobile application development
- **HTML/CSS/JavaScript/TypeScript**: Frontend development
- **Firebase**: Database management
- **Scikit-learn**: Machine learning algorithms

---

## Project Log

For the detailed project log, please refer to [this Google Sheet](https://docs.google.com/spreadsheets/d/179DmH_i8CaoBr9kc0jjaFGT2cqZNFjx_ze_DIgwsXuE/edit?usp=sharing).

---

## Contact

*Brian Lim Yen Sing: e1122376@u.nus.edu.*
*Li Han Lin: lihanlin@u.nus.edu.*

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

