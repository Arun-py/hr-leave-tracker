import request from 'supertest';
import mongoose from 'mongoose';
import SimpleLeave from '../models/SimpleLeave.js';

// Import express and setup test app
import express from 'express';
import cors from 'cors';
import simpleLeaveRoutes from '../routes/simpleLeaveRoutes.js';

// Create test app
const app = express();
app.use(cors());
app.use(express.json());
app.use('/', simpleLeaveRoutes);

// Test database connection
const MONGODB_URI = process.env.MONGODB_URI_TEST || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/hr_leave_tracker_test';

beforeAll(async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Test database connected');
  } catch (error) {
    console.error('Database connection error:', error);
  }
});

afterAll(async () => {
  try {
    await SimpleLeave.deleteMany({});
    await mongoose.connection.close();
  } catch (error) {
    console.error('Cleanup error:', error);
  }
});

beforeEach(async () => {
  await SimpleLeave.deleteMany({});
});

describe('Leave API Tests', () => {
  describe('POST /addLeave', () => {
    test('should create a leave', async () => {
      const leaveData = {
        employeeName: 'John Doe',
        startDate: '2025-08-10',
        endDate: '2025-08-15',
        reason: 'Medical leave',
        status: 'Pending',
      };

      const response = await request(app)
        .post('/addLeave')
        .send(leaveData)
        .expect(201);

      expect(response.body).toHaveProperty('_id');
      expect(response.body.employeeName).toBe(leaveData.employeeName);
      expect(response.body.startDate).toBe(leaveData.startDate);
      expect(response.body.endDate).toBe(leaveData.endDate);
      expect(response.body.reason).toBe(leaveData.reason);
      expect(response.body.status).toBe(leaveData.status);
    });

    test('should fail to create leave with missing fields', async () => {
      const incompleteData = {
        employeeName: 'John Doe',
        startDate: '2025-08-10',
      };

      const response = await request(app)
        .post('/addLeave')
        .send(incompleteData)
        .expect(400);

      expect(response.body).toHaveProperty('message');
    });

    test('should create leave even with string dates', async () => {
      const leaveData = {
        employeeName: 'Jane Smith',
        startDate: '2025-09-01',
        endDate: '2025-09-05',
        reason: 'Vacation',
        status: 'Pending',
      };

      const response = await request(app)
        .post('/addLeave')
        .send(leaveData)
        .expect(201);

      expect(response.body).toHaveProperty('_id');
      expect(typeof response.body.startDate).toBe('string');
      expect(typeof response.body.endDate).toBe('string');
    });

    test('should have createdAt and updatedAt fields', async () => {
      const leaveData = {
        employeeName: 'Alice Johnson',
        startDate: '2025-10-01',
        endDate: '2025-10-03',
        reason: 'Personal work',
        status: 'Pending',
      };

      const response = await request(app)
        .post('/addLeave')
        .send(leaveData)
        .expect(201);

      expect(response.body).toHaveProperty('createdAt');
      expect(response.body).toHaveProperty('updatedAt');
    });
  });

  describe('GET /getAllLeave', () => {
    test('should get all leaves', async () => {
      // Create test leaves
      await SimpleLeave.create([
        {
          employeeName: 'John Doe',
          startDate: '2025-08-10',
          endDate: '2025-08-15',
          reason: 'Medical leave',
          status: 'Pending',
        },
        {
          employeeName: 'Jane Smith',
          startDate: '2025-09-01',
          endDate: '2025-09-05',
          reason: 'Vacation',
          status: 'Approved',
        },
      ]);

      const response = await request(app)
        .get('/getAllLeave')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(2);
    });
  });

  describe('PUT /updateLeave/:id', () => {
    test('should update a leave', async () => {
      const leave = await SimpleLeave.create({
        employeeName: 'John Doe',
        startDate: '2025-08-10',
        endDate: '2025-08-15',
        reason: 'Medical leave',
        status: 'Pending',
      });

      const updateData = {
        status: 'Approved',
      };

      const response = await request(app)
        .put(`/updateLeave/${leave._id}`)
        .send(updateData)
        .expect(200);

      expect(response.body.status).toBe('Approved');
      expect(response.body._id).toBe(leave._id.toString());
    });

    test('should return 400 for invalid leave id', async () => {
      const response = await request(app)
        .put('/updateLeave/invalid-id')
        .send({ status: 'Approved' })
        .expect(400);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('Invalid');
    });

    test('should return 404 for non-existing leave', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      
      const response = await request(app)
        .put(`/updateLeave/${fakeId}`)
        .send({ status: 'Approved' })
        .expect(404);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('not found');
    });
  });

  describe('DELETE /deleteLeave/:id', () => {
    test('should delete a leave', async () => {
      const leave = await SimpleLeave.create({
        employeeName: 'John Doe',
        startDate: '2025-08-10',
        endDate: '2025-08-15',
        reason: 'Medical leave',
        status: 'Pending',
      });

      const response = await request(app)
        .delete(`/deleteLeave/${leave._id}`)
        .expect(200);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('deleted');

      // Verify deletion
      const deletedLeave = await SimpleLeave.findById(leave._id);
      expect(deletedLeave).toBeNull();
    });

    test('should return 404 for non-existing leave', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      
      const response = await request(app)
        .delete(`/deleteLeave/${fakeId}`)
        .expect(404);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('not found');
    });
  });
});
