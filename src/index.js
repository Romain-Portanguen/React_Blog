import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import Blog from 'src/components/Blog';

const target = document.getElementById('root');

const root = createRoot(target);

const elementToRender = (
  <BrowserRouter>
    <Blog />
  </BrowserRouter>
);

root.render(elementToRender);
