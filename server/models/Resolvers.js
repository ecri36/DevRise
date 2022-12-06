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
      // Return dummy data for now
      return {
        id: 1,
        name: 'James Cyrus Bond',
        email: 'bond@mi6.uk',
        dailyJobsApplied: 2,
      };
    },
  },
  Mutation: {
    makeJob: async (_, args) => {
      //TODO: Create function that makes job
      const { jobData } = args;
      // Return dummy data for now
      return {
        success: true,
        updateType: 'create',
        jobId: 1,
      };
    },
    updateJob: async (_, args) => {
      //TODO: Create function that makes job
      const { jobId, jobData } = args;
      // Return dummy data for now
      return {
        success: true,
        updateType: 'update',
        jobId: 1,
      };
    },
    deleteJob: async (_, args) => {
      //TODO: Create function that makes job
      const { jobId } = args;
      // Return dummy data for now
      return {
        success: true,
        updateType: 'delete',
        jobId: 1,
      };
    },
    signin: async (_, args) => {
      const { signinType, email, password } = args;
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
