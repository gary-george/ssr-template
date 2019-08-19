import { clientEnv } from '../config';
import path from 'path';

const handleCSR = (req, res) => {
  // eslint-disable-line
  const pathToIndex = path.join(__dirname, '../', 'dist', 'index.html');
  return res.render(pathToIndex, {
    clientEnv: JSON.stringify(clientEnv),
  });
};

export { handleCSR }; // eslint-disable-line
