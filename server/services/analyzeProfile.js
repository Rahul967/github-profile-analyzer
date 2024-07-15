const fetch = require('node-fetch');
const { checkHumanFace } = require('./checkHumanFace');
require('dotenv').config();

const GITHUB_GRAPHQL_API = 'https://api.github.com/graphql';
const GITHUB_TOKEN = ;//add your github token here directly not by importing from .env file.

const commonSkills = [
  'JavaScript', 'Python', 'Java', 'C++', 'C#', 'Ruby', 'PHP', 'Swift', 'Kotlin', 
  'HTML', 'CSS', 'React', 'Angular', 'Vue', 'Node.js', 'Django', 'Flask', 'Spring', 
  'Hibernate', 'SQL', 'NoSQL', 'MongoDB', 'GraphQL', 'REST', 'Docker', 'Kubernetes', 
  'AWS', 'Azure', 'GCP', 'Git', 'GitHub', 'GitLab', 'CI/CD', 'Agile', 'Scrum'
];

async function fetchGraphQL(query, variables = {}) {
  const response = await fetch(GITHUB_GRAPHQL_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GITHUB_TOKEN}`,
    },
    body: JSON.stringify({ query, variables }),
  });
  const data = await response.json();
  if (data.errors) {
    throw new Error(data.errors.map(error => error.message).join('\n'));
  }
  return data.data;
}

function checkSkills(bio, readme) {
  const content = `${bio} ${readme || ''}`.toLowerCase();
  for (const skill of commonSkills) {
    if (content.includes(skill.toLowerCase())) {
      return 'Present';
    }
  }
  return 'Not Present';
}

async function analyzeProfile(profileData, username) {
  const result = {
    profilePicture: profileData.avatar_url ? 'Present' : 'Not Present',
    bio: profileData.bio ? 'Present' : 'Not Present',
    pinnedRepo: 'Not Present',
    socialLinks: profileData.blog || profileData.twitter_username ? 'Present' : 'Not Present',
    location: profileData.location ? 'Present' : 'Not Present',
    projectTitles: 'Not Present',
    skills: 'Not Present',
    readme: 'Not Present',
    projectDescription: 'Not Present',
    feedback: []
  };

  if (result.profilePicture === 'Present') {
    result.profilePicture = await checkHumanFace(profileData.avatar_url);
    if (result.profilePicture === 'Not Present') {
      result.feedback.push('Upload a professional or clear profile picture. Avoid AI generated images.');
    }
  } else {
    result.feedback.push('Upload a professional or clear profile picture. Avoid AI generated images.');
  }

  if (result.bio === 'Not Present') {
    result.feedback.push('Write a concise and informative bio that highlights your expertise, familiar tech stacks, interests, and goals.');
  }

  const query = `
    query($username: String!) {
      user(login: $username) {
        pinnedItems(first: 6, types: REPOSITORY) {
          totalCount
          nodes {
            ... on Repository {
              name
              description
              object(expression: "HEAD:README.md") {
                ... on Blob {
                  text
                }
              }
            }
          }
        }
      }
    }
  `;

  const variables = { username };

  try {
    const data = await fetchGraphQL(query, variables);
    const pinnedItems = data.user.pinnedItems.nodes;

    let readmeContent = '';
    if (pinnedItems.length > 0) {
      result.pinnedRepo = 'Present';
      result.projectTitles = 'Present';
      result.projectDescription = 'Present';

      readmeContent = pinnedItems.map(item => item.object && item.object.text).join(' ');

      if (readmeContent) {
        result.readme = 'Present';
      } else {
        result.feedback.push('Document your repository with details about the project, instructions, help, or details about the patches or updates. Refer: https://www.readme-templates.com/');
      }
    } else {
      result.feedback.push('Pin repositories that showcase your best work or projects you want to highlight (apart from Crio projects).');
    }

    result.skills = checkSkills(profileData.bio, readmeContent);

    if (result.skills === 'Not Present') {
      result.feedback.push('List your skills and technologies in your profile and README.');
    }

  } catch (error) {
    console.error(error);
  }

  if (result.socialLinks === 'Not Present') {
    result.feedback.push('Include links to your social media profiles (LinkedIn, Crio portfolio, personal portfolio). Also, update your current location.');
  }

  if (result.projectTitles === 'Not Present') {
    result.feedback.push('Choose a catchy name for your project\'s root folder on GitHub. Use the same name in your README file for consistency. Make sure it reflects your project\'s essence and purpose. Avoid using generic placeholders like v1, x, 101, p_01, etc.');
  }

  if (result.projectDescription === 'Not Present') {
    result.feedback.push('Write a clear and precise (max 2 lines) description of the purpose and scope of your project.');
  }

  if (result.feedback.length === 0) {
    result.feedback.push('Your GitHub profile is up to date. Keep it up!');
  }

  return result;
}

module.exports = { analyzeProfile };
