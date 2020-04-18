import { Enrollment } from '@/models';
import { v4 as uuidv4 } from 'uuid';

const express = require('express');

const router = express.Router();

export default class Controller {
  constructor({ app, prefix, finale }) {
    this.enrollmentResource = finale.resource({
      model: Enrollment,
      endpoints: [prefix, `${prefix}/:id`],
    });

    router.post('/batch_create', this.batchCreate);
    app.use(prefix, router);
  }

  async batchCreate(req, res) {
    const { offer_id, batch } = req.body;
    const enrollments = [];

    for (let i = 0; i < batch; i += 1) {
      enrollments.push({
        offer_id,
        status: 'Inactivate',
        activation_code: uuidv4(),
      });
    }

    await Enrollment.bulkCreate(enrollments);

    return res.status(201).json({
      message: 'created',
    });
  }
}
