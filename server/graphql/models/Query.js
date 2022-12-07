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
        
        signin(signinType: String, code: String, email: String, password: String): AuthorizationResponse,
        register(registerType: String,
            code: String, 
            name: String, 
            email: String,
            password: String )
                : AuthorizationResponse
    }
        
    type Jobs {
        jobs: [JobsInBoard]
    }

    type User {
        id: Int, 
        name: String, 
        email: String,
        dailyJobsApplied: Int
    }
    
    type JobsInBoard {
        name: String, 
        items: [JobEntry]
    }

    type JobEntry {
        _id: Int, 
        owner_id: Int, 
        job_title: String, 
        status: String, 
        company: String, 
        location: String, 
        hyperlink: String,
        position_type: String,
        application_data: String
    }
    
    type JobResponse {
        success: Boolean, 
        updateType: String,
        job: JobEntry
    }
    
    type AuthorizationResponse {
        success: Boolean, 
        token: String
    }
    
    `;

module.exports = Query;
