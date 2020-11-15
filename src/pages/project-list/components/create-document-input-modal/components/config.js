import img1 from '../../../../../assets/template-image/article-1.jpg'
import img2 from '../../../../../assets/template-image/report-1.jpg'
import { v4 as uuidv4 } from 'uuid';

export const templateList = [
  {
    pdf: `${process.env.REACT_APP_REACT_URL}/pdf/default.pdf`,
    image: img1,
    name: 'article',
    path: 'default.tex',
    description: 'simple document',
    key: uuidv4(),
  },
  {
    pdf: `${process.env.REACT_APP_REACT_URL}/pdf/report.pdf`,
    image: img2,
    name: 'report',
    path: 'report.tex',
    description: 'simple report',
    key: uuidv4(),
  }
]