import img1 from '../../../../../assets/template-image/1.jpg'
import img2 from '../../../../../assets/template-image/2.jpg'
import { v4 as uuidv4 } from 'uuid';

export const templateList = [
  {
    pdf: `${process.env.REACT_APP_REACT_URL}/pdf/1.pdf`,
    image: img1,
    name: 'default article',
    code: 'https://github.com/MHW2003/defaultTemplate/blob/master/default.tex',
    description: 'aaaaaaaaaa',
    key: uuidv4(),
  },
  {
    pdf: `${process.env.REACT_APP_REACT_URL}/pdf/2.pdf`,
    image: img2,
    name: 'test2',
    code: '',
    description: 'bbbbbbbbb',
    key: uuidv4(),
  }
]