import  {useRef, useState} from 'react';

enum Operator {
  sum,
  substract,
  multiply,
  divide,
}

export const useCalculator = () => {
  const [number, setNumber] = useState('0');
  const [previousNumber, setPreviousNumber] = useState('0');

  const lastOperation = useRef<Operator>();

  const clean = () => {
    setNumber('0');
    setPreviousNumber('0');
  };

  const deleteLastCharacter = () => {
    if (number.length === 1) {
      setNumber('0');
    } else {
      setNumber(number.slice(0, -1));
    }
  };

  const toggleSign = () => {
    if (number.includes('-')) {
      setNumber(number.replace('-', ''));
    } else {
      setNumber(`-${number}`);
    }
  };

  const buildNumber = (numberString: string) => {
    if (number.includes('.') && numberString === '.') return;

    if (number.startsWith('0') || number.startsWith('-0')) {
      // Punto decimal
      if (numberString === '.') {
        return setNumber(number + numberString);
      }

      // Evaluar si es otro cero y no hay punto
      if (numberString === '0' && number.includes('.')) {
        return setNumber(number + numberString);
      }

      // Evaluar si es diferente de cero, no hay punto, y es el primer numero
      if (numberString !== '0' && !number.includes('.')) {
        return setNumber(numberString);
      }

      // Evitar 000000.00
      if (numberString === '0' && !number.includes('.')) {
        return;
      }

      return setNumber(number + numberString);
    }

    setNumber(number + numberString);
  };

  const setLastNumber = () => {
    if (number.endsWith('.')) {
      setPreviousNumber(number.slice(0, -1));
    } else {
      setPreviousNumber(number);
    }

    setNumber('0');
  };

  const divedeOperation = () => {
    console.log('Dividir');
    setLastNumber();
    
    lastOperation.current = Operator.divide;
 
  }

  const multiplyOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.multiply;
  };

  const substractOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.substract;
  };

  const addOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.sum;
  }; 


  const calculateResult = () => {
    const num1 = Number(number);
    const num2 = Number(previousNumber);

    switch (lastOperation.current) {
      case Operator.sum:
        setNumber(`${num1 + num2}`);
        break;
      case Operator.substract:
        setNumber(`${num2 - num1}`);
        break;
      case Operator.multiply:
        setNumber(`${num1 * num2}`);
        break;
      case Operator.divide:
        setNumber(`${num2 / num1}`);
        break;
    }
    setPreviousNumber('0');
  
  }


  return {
    number,
    buildNumber,
    clean,
    deleteLastCharacter,
    toggleSign,
    divedeOperation,
    multiplyOperation,
    substractOperation,
    addOperation,
    previousNumber,
    calculateResult
  };
};
