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
      const { signinType, email, code, password } = args;

      if (signinType === 'oauth') {
        await handleOAuth(code);
      }

      // Return dummyData for now
      return {
        success: true,
        token: 'dummy token',
      };
    },
    register: async (_, args) => {
      const { registerType, UserData } = args;
      // Return dummy data for now
      return {
        success: true,
        token: 'dummy token',
      };
    },
  },
};
