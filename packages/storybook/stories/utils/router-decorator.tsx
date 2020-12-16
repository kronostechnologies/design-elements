import { BrowserRouter } from 'react-router-dom';
import { decorateWith, Decorator } from './decorator';

export const RouterDecorator: Decorator = decorateWith(BrowserRouter);
