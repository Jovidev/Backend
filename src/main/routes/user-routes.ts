import { Router } from 'express';
import { adaptRoute } from '@/main/adapters';
import {  makeUserCreateController} from '@/factories/app/controller';

export default (router: Router): void => {
    router.post('/user', adaptRoute(makeUserCreateController()));
};