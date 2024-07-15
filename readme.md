# GitHub Profile Analyzer

A web application built using the MERN stack to analyze GitHub profiles for specific elements and provide feedback. This project also includes a Python-based machine learning model to check if the profile picture contains a human face.

## Features

- Analyze GitHub profiles for the presence of:
  - Profile Picture
  - Bio
  - Pinned Repositories
  - Social Links and Location
  - Project Titles of Pinned Repositories
  - Skills and Technologies
  - README files
  - Project Descriptions
- Provide feedback based on the analysis
- Check if the profile picture contains a human face using a Python ML model

## Tech Stack

- **Frontend:** React
- **Backend:** Node.js, Express
- **Authentication:** Firebase
- **Machine Learning:** Python, OpenCV

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- Python
- pip
- GitHub Access Token

### Installation

1. **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/github-profile-analyzer.git
    cd github-profile-analyzer
    ```

2. **Backend Setup:**
    ```sh
    cd server
    npm install
    ```

3. **Frontend Setup:**
    ```sh
    cd ../client
    npm install
    ```

4. **Python Setup:**
    ```sh
    cd ../python-model
    pip install -r requirements.txt
    ```

### Configuration

1. **GitHub Access Token:**

   To access the GitHub API, you need a GitHub Access Token. Follow these steps to generate one:

   1. Go to [GitHub Settings](https://github.com/settings/tokens).
   2. Click on "Generate new token".
   3. Give your token a descriptive name.
   4. Select the scopes `repo` and `user`.
   5. Click "Generate token".
   6. Copy the generated token.



  Add your github token in analyzeprofile.js file line number 6

  

### Running the Application

1. **Start the backend server:**
    ```sh
    cd server
    npm start
    ```

2. **Start the frontend development server:**
    ```sh
    cd ../client
    npm start
    ```

3. **Start the Python server:**
    ```sh
    cd ../python-model
    python checkHumanFace.py
    ```

### Usage

1. Open your browser and go to `http://localhost:3000`.
2. Enter the GitHub profile URL you want to analyze.
3. Click the "Analyze" button.
4. View the analysis results and feedback.

## Project Structure

```plaintext
github-profile-analyzer/
│
├── client/                # React frontend
│   ├── public/
│   └── src/
│       ├── components/
│       ├── App.css
│       ├── App.js
│       ├── index.css
│       └── index.js
│
├── server/                # Node.js backend
│   ├── services/
│   │   ├── analyzeProfile.js
│   │   └── checkHumanFace.js
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── python-model/          # Python ML model
│   ├── checkHumanFace.py
│   ├── requirements.txt
│   └── model/             # Model files
│
├── .gitignore
├── README.md
└── package.json
