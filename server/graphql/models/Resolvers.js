const { createJob } = require('../../middleware/controller');
const controller = require('../../middleware/controller');
const { handleOAuth } = require('../../middleware/oAuth');

module.exports = {
  Query: {
    jobs: async (_, args) => {
      const { userId } = args;
      //TODO: Create function that gets users jobs
      // Return dummy data for now
      return {
        jobs: [
          {
            id: 1,
            ownerId: 1,
            jobTitle: ' String',
            status: 'String',
            company: 'String',
            location: 'String',
            hyperlink: 'String',
            positionType: 'String',
            applicationData: 'String',
          },
        ],
      };
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
      const { signinType, email, password } = args;

      if (signinType === 'oauth') {
        await handleOAuth();
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
