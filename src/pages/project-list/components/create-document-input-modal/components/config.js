import img1 from '../../../../../assets/template-image/article-1.jpg'
import img2 from '../../../../../assets/template-image/report-1.jpg'
import img3 from '../../../../../assets/template-image/beamer-1.jpg'
import { v4 as uuidv4 } from 'uuid';

export const templateList = [
  {
    pdf: `${process.env.REACT_APP_REACT_URL}/pdf/default.pdf`,
    image: img1,
    name: 'article',
    path: 'default.tex',
    description: 'default article',
    key: uuidv4(),
  },
  {
    pdf: `${process.env.REACT_APP_REACT_URL}/pdf/report.pdf`,
    image: img2,
    name: 'report',
    path: 'report.tex',
    description: 'default report',
    key: uuidv4(),
  },
  {
    pdf: `${process.env.REACT_APP_REACT_URL}/pdf/beamer.pdf`,
    image: img3,
    name: 'beamer',
    path: 'beamer.tex',
    description: 'default beamer(Madrid)',
    key: uuidv4(),
  }
]