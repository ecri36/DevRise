const { createJob, getJobs } = require('../../middleware/controller');
const controller = require('../../middleware/controller');
const { handleOAuth } = require('../../middleware/oAuth');

module.exports = {
  Query: {
    jobs: async (_, args) => {
      const { userId } = args;
      console.log('ARe we here?');

      return getJobs(userId);
    },
    user: async (_, args) => {
      const { userId } = args;
      return await controller.getUser(userId);
    },
  },
  Mutation: {
    createJob: async (_, args) => {
      return controller.createJob(args);
    },
    updateJob: async (_, args) => {
      return controller.updateJob(args);
    },
    deleteJob: async (_, args) => {
      return controller.deleteJob(args.jobId);
    },
    signin: async (_, args) => {
      const { signinType, code } = args;
      const authResponse = {};
      if (signinType === 'oauth') {
        const { token } = await handleOAuth(code, 'login');
        authResponse.success = true;
        authResponse.token = token;
      }

      // Return dummyData for now
      return authResponse;
    },
    register: async (_, args) => {
      const { registerType, code } = args;
      const authResponse = {};
      if (registerType === 'oauth') {
        const { token } = await handleOAuth(code, 'register');
        authResponse.success = true;
        authResponse.token = token;
      }
      return authResponse;
    },
  },
};
