const bcrypt = require('bcrypt');

const db = require('../models/dbConnection');

module.exports = {
  getUser: async userId => {
    try {
      const query = `SELECT * FROM users WHERE _id = $1`;
      const values = [userId];
      const { rows } = await db.query(query, values);
      return {
        id: rows[0]._id,
        name: rows[0].name,
        email: rows[0].email,
        password: rows[0].password,
        dailyJobsApplied: rows[0].daily_job_count,
      };
    } catch (error) {
      console.log('an error occured in getUser');
      console.log(`Error message: ${error.message}`);
    }
  },
  createUser: async userData => {
    try {
      const { name, email, password, registerType } = userData;
      let values = [name, email, null];
      if (registerType !== 'oauth') {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        values[2] = hashedPassword;
      }

      const query = `INSERT INTO users (name, email, password)\
      VALUES ($1, $2, $3) RETURNING *;`;

      const { rows } = await db.query(query, values);
    } catch (error) {
      console.log('an error occured in createUSer');
      console.log(`Error message: ${error.message}`);
    }
  },

  validatePassword: async (submittedPassword, hashedPassword) => {
    try {
      const result = await bcrypt.compare(submittedPassword, hashedPassword);
      return result ? true : false;
    } catch (error) {
      console.log('an error occured in createUSer');
      console.log(`Error message: ${error.message}`);
    }
  },

  createJob: async jobData => {
    try {
      const {
        userId,
        jobTitle,
        status,
        company,
        location,
        hyperlink,
        positionType,
        applicationData,
      } = jobData;
      const queryString = `INSERT INTO jobs (owner_id, job_title, status, company, location, hyperlink, position_type, application_date)\
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;`;

      const values = [
        userId,
        jobTitle,
        status,
        company,
        location,
        hyperlink,
        positionType,
        applicationData,
      ];

      const { rows } = await db.query(queryString, values);
      if (rows[0]) {
        return {
          success: true,
          updateType: 'create',
          jobId: rows[0]._id,
        };
      } else {
        throw new Error('Error in creating job');
      }
    } catch (error) {
      console.log('an error occured in createJob');
      console.log(`Error message: ${error.message}`);
      return {
        success: false,
        updateType: 'create',
        jobId: null,
      };
    }
  },

  deleteJob: async jobId => {
    try {
      const queryString = 'DELETE FROM jobs WHERE _id = $1 RETURNING *;';
      const values = [jobId];
      const { rows } = await db.query(queryString, values);

      if (rows[0]) {
        return {
          success: true,
          updateType: 'delete',
          jobId,
        };
      } else {
        throw new Error('Error in deleting job');
      }
      
    } catch (error) {
      console.log('an error occured in deleteJob');
      console.log(`Error message: ${error.message}`);
      return {
        success: false,
        updateType: 'delete',
        jobId,
      };
    }
  },

  updateJob: async jobData => {
    try {
      const { jobId, jobField, value } = jobData;
      // TODO: Fix this to not ber a template literal
      const queryString = `
      UPDATE jobs\
      SET ${jobField} = $1\
      WHERE _id = $2 RETURNING *;`;

      const values = [value, jobId];

      const { rows } = await db.query(queryString, values);
      if (rows[0]) {
        return {
          success: true,
          updateType: 'update',
          jobId,
        };
      } else {
        return {
          success: false,
          updateType: 'update',
          jobId,
        };
      }
    } catch (error) {
      console.log('an error occured in editJob');
      console.log(`Error message: ${error.message}`);
    }
  },
};
