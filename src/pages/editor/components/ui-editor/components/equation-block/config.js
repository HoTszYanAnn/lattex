const symbol = {
  title: 'Symbol',
  code: '+',
  buttonArray: [
    {
      title: 'Plus',
      code: '+',
    },
    {
      title: 'Minus',
      code: '-',
    },
    {
      title: 'Times',
      code: '\\times',
    },
    {
      title: 'Divide',
      code: '\\div',
    },
    {
      code: '\\mp',
      title: ''
    },
    {
      code: '\\pm',
      title: ''
    }
  ]
}

const letter = {
  title: 'Letter',
  code: '\\beta',
  buttonArray: [
    {
      title: 'Beta',
      code: '\\beta',
    },
    {
      title: 'Alpha',
      code: '\\alpha',
    },
    {
      title: 'Gamma',
      code: '\\gamma',
    },
    {
      title: 'Rho',
      code: '\\rho',
    },
    {
      title: 'Theta',
      code: '\\theta',
    },
    {
      code: '\\mp',
      title: ''
    },
    {
      code: '\\pm',
      title: ''
    }
  ]
}

const basicFunc = {
  title: 'Fraction',
  code: 'x^y',
  buttonArray: [
    {
      title: 'Super Script',
      code: 'x^y',
    },
    {
      title: 'Super Script',
      code: 'x^y',
    },
    {
      title: 'Super Script',
      code: 'x^y',
    },
  ]
}

exports.equationTools = [symbol, letter, basicFunc]