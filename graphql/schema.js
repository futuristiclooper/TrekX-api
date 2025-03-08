
import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Patient {
    id: ID!
    name: String!
    age: Int!
    medicalHistory: String
    labReports: [LabReport]
  }

  type LabReport {
    patientId: ID!
    reportType: String!
    findings: String!
    date: String!
  }

  type AuthPayload {
    token: String!
    userId: ID!
  }

  type Query {
    getPatient(id: ID!): Patient
    searchPatients(name: String): [Patient]
  }

  type Mutation {
    login(username: String!, password: String!): AuthPayload
    addPatient(name: String!, age: Int!): Patient
  }
`;

export default typeDefs;
