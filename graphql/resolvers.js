import { fetchMySQLData } from '../models/mysql.js';
import { fetchMongoData } from '../models/mongo.js';

const resolvers = {
  Query: {
    getPatient: async (_, { id }, context) => {
      const [mysqlData, mongoData] = await Promise.all([
        fetchMySQLData('patients', { id }),
        fetchMongoData('lab_reports', { patientId: id })
      ]);
      
      return {
        ...mysqlData[0],
        labReports: mongoData
      };
    },
    searchPatients: async (_, { name }, context) => {
      const patients = await fetchMySQLData('patients', name ? { name } : {});
      return patients;
    }
  },
  Mutation: {
    addPatient: async (_, args, context) => {
      return addMySQLPatient(args);
    },
    login: async (_, { username, password }) => {
      // Authentication logic (implement as needed)
      return { token: 'sample-token', user: { id: 1, username } };
    }
  }
};

export default resolvers;
