const bcrypt = require('bcrypt');

const db = require('../models/dbConnection');

module.exports = {
  getUser: async email => {
    try {
      const query = `SELECT * FROM users WHERE email = $1`;
      const values = [email];
      const { rows } = await db.query(query, values);
      return rows[0];
    } catch (error) {
      console.log('an error occured in getUser');
      console.log(`Error message: ${error.message}`);
    }
  },
  getJobs: async userId => {
    try {
      const query = `SELECT * FROM jobs WHERE owner_id = $1`;
      const values = [userId];
      const { rows } = await db.query(query, values);

      const jobs = [
        { name: 'Prospective', items: [] },
        { name: 'App Submitted', items: [] },
        { name: 'Interview Scheduled', items: [] },
        { name: 'Rejected', items: [] },
      ];

      rows.forEach(e => {
        jobs.forEach((j, i) => {
          if (e.status === j.name) {
            jobs[i].items.push(e);
          }
        });
      });

      return {
        jobs,
      };
    } catch (error) {
      console.log('an error occured in getJobs');
      console.log(`Error message: ${error.message}`);
    }
  },
  createUser: async userData => {
    try {
      const { name, email, password, registerType } = userData;
      let values = [name, email, null, 0];

      if (registerType !== 'oauth') {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        values[2] = hashedPassword;
      }

      const query = `INSERT INTO users (name, email, password, daily_job_count)\
      VALUES ($1, $2, $3, $4) RETURNING *;`;

      const { rows } = await db.query(query, values);
      return rows[0];
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
          job: rows[0],
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
          job: rows[0],
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
          job: rows[0],
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
  incrementApplicationsSubmitted: async userData => {
    try {
      const { userId } = userData;
      const queryString = `
      UPDATE users\
      SET daily_job_count = daily_job_count + 1\
      WHERE _id = $1 RETURNING *;`;

      const values = [userId];
      const { rows } = await db.query(queryString, values);
      return {
        success: true,
      };
    } catch (error) {}
  },
};
