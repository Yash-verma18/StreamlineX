import Router from 'express';
import prismaClient from '../services/prisma';

const router = Router();

router.post('/', async (req: any, res: any) => {
  console.log('recieved', req.body);
  const { fullname } = req.body;
  try {
    await prismaClient.user.create({
      data: {
        name: fullname?.toString(),
      },
    });

    res.send('recieved');
  } catch {
    console.log('error occured');
  }
});

export default router;
