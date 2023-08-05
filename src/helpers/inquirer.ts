import inquirer from 'inquirer';
import colors from 'colors';

interface Cities {
  id: string;
  name: string;
  lat: number;
  lng: number;
}

const questions = [
  {
    type: 'list',
    name: 'option',
    message: '¿Qué desea hacer?',
    choices: [
      {
        value: 1,
        name: 'Buscar ciudad',
      },
      {
        value: 2,
        name: 'Historial',
      },
      {
        value: 0,
        name: 'Salir',
      },
    ],
  }
]

const inquirerMenu = async () => {

    console.clear();
    console.log(colors.blue('========================'));
    console.log(colors.blue(' Seleccione una opción'));
    console.log(colors.blue('========================\n'));

    const { option } = await inquirer.prompt(questions);

    return option;
}


const pauseQuestion = [{
  type:'input',
  name:'enter',
  message:`Presione ${colors.green('enter') } para continuar`,
}]

const pause = async() => {
  console.log('\n');
  const { enter } = await inquirer.prompt(pauseQuestion);
  return enter;
}

const readInput = async(message:string) => {
  const question = [{
    type: 'input',
    name: 'desc',
    message,
    validate( value:string ){
      if( value.length === 0 ){
        return 'Por favor, ingrese un valor';
      }
      return true;
    }
  }]

  const { desc } = await inquirer.prompt(question);
  return desc;
}

const listPlaces = async( places: Cities[]) => {
  const choices = places.map((place, index) => {
    return{
      value: place.id,
      name: `${colors.blue(index + 1 + '.')} ${place.name}`,
    }
  });

  choices.unshift({
    value: '0',
    name: `${colors.blue('0.')} Cancelar`
  })

  const questions = [
    {
      type: 'list',
      name: 'id',
      message: 'Seleccione la ciudad:',
      choices
    }
  ]
  const { id } = await inquirer.prompt(questions);
  return id;
}

const confirm = async(message:string) => {
  const question = [
    {
      type: 'confirm',
      name: 'ok',
      message,
    }
  ]
  const { ok } = await inquirer.prompt(question);
  return ok;
}

const showChecklist  = async( tasks: any[]) => {
  const choices = tasks.map((task, index) => {
    return{
      value: task.id,
      name: `${colors.blue(index + 1 + '.')} ${task.desc}`,
      checked: (task.completedAt) ? true : false
    }
  });

  const question = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Selecciones',
      choices
    }
  ]
  const { ids } = await inquirer.prompt(question);
  return ids;
}

export {
  Cities,
  confirm,
  inquirerMenu, 
  listPlaces,
  pause,
  readInput,
  showChecklist
}