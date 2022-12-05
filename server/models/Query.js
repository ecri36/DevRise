const Query = `
    type Query {    
        jobs(userId: Int): Jobs, 
    }

    type Jobs {
        jobs: [JobEntry]
    }

    type JobEntry {
        id: Int, 
        ownerId: Int, 
        jobTitle: String, 
        status: String, 
        company: String, 
        location: String, 
        hyperlink: String,
        positionType: String,
        applicationData: String
    }
`;

module.exports = Query;
