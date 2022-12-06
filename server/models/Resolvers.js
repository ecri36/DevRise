module.exports = {
  Query: {
    jobs: async (_, args) => {
      const { userId } = args;
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
  },
};
