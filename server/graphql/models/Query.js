const Query = `
    type Query {    
        jobs(userId: Int): Jobs, 
        user(userId: Int): User
    }

    type Mutation {
        createJob(
            userId: Int,
            jobTitle: String,
            status: String,
            company: String,
            location: String, 
            hyperlink: String,
            positionType: String,
            applicationData: String )
                : JobResponse,
        
        updateJob(jobId: Int, jobField: String, value: String): JobResponse
        
        deleteJob(jobId: Int): JobResponse,        
        signin(signinType: String, email: String, password: String): AuthorizationResponse,
        register(registerType: String,
            name: String, 
            email: String,
            password: String )
                : AuthorizationResponse

        
    }
        
        
    type Jobs {
        jobs: [JobEntry]
    }

    type User {
        id: Int, 
        name: String, 
        email: String,
        dailyJobsApplied: Int
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
    
    type JobResponse {
        success: Boolean, 
        updateType: String,
        jobId: Int
    }
    
    type AuthorizationResponse {
        success: Boolean, 
        token: String
    }
    
    `;

module.exports = Query;
