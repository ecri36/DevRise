import axios from 'axios';
import jwt from 'jsonwebtoken';

import { userController } from './userController';

const clientID = '6d90f6ec2d021298591c';
const clientSecret = 'f88c5b69a6d1a72a1b76c132764e6ba6395e49d9';

export async function getOAuthToken(code) {
  try {
    const gitHubOAuthAccessTokenUrl =
      'https://github.com/login/oauth/access_token';

    const params = {
      client_id: clientID,
      client_secret: clientSecret,
      code: code,
    };

    const headers = {
      Accept: 'application/json',
    };

    const accessTokenResponse = await axios.post(
      gitHubOAuthAccessTokenUrl,
      {},
      { params, headers }
    );

    return { gitHubToken: accessTokenResponse.data.access_token };
  } catch (error) {
    console.log(error.message);
    return { gitHubToken: 'Invalid code' };
  }
}

export function buildNewGitHubUserData(gitHubUserData){
    return {
        oauthUser: true,
        name: gitHubUserData.name,
        username: gitHubUserData.login,
        avatarUrl: gitHubUserData.avatar_url,
    };
 }

export function generateJWT(userObject) {
    const token = jwt.sign(
        {
        username: userObject.username,
        userId: userObject.userId,
        name: userObject.name,
        avatarUrl: userObject.avatarUrl,
        },
        JWT_SECRET,
        {
        expiresIn: 3_600_000,
        }
    );

    return {
        token,
    };
}

export async function handleOAuth( code, type ) {
    try {
      const { gitHubToken } = await getOAuthToken(code);
  
      if (!gitHubToken) throw new Error('Invalid credentials');
  
      const { gitHubUserData } = await getGitHubUserData(gitHubToken);
  
      if (type === 'register') {
        const exisitingUser = await userController.getQuilUser(
          gitHubUserData.login
        );
  
        if (exisitingUser) {
          return generateJWT(exisitingUser);
        } else {
          const newUserObj = buildNewGitHubUserData(gitHubUserData);
          const createdUser = await userController.createAccount(newUserObj);
          if (createdUser.success) {
            return generateJWT(createdUser);
          } else throw new Error('Error creating account');
        }
      }
  
      if (type === 'signin') {
        const { login } = gitHubUserData;
        const user = await userController.getQuilUser(login);
        if (user.success) {
          return generateJWT(user);
        } else throw new Error('Error fetching account');
      }
    } catch (error) {
      return { token: null };
    }
}