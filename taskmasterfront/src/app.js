import React, {useState, useEffect} from 'react';
import './app.scss';

const API = 'http://taskmaster123cr.us-west-2.elasticbeanstalk.com/tasks'

function Tasks() {

  const [tasks, setTasks] = useState([]);

  const _getTasks = () => {
    // fetch from deployed backend
    fetch( API, {
      mode:'cors',
    })
    .then( data => data.json() )
    .then( tasks => setTasks(tasks) )
    .catch( console.error );

  };

  useEffect(_getTasks, []);

  return (
    <ul>
      {tasks.map( (task) =>
        <li className={`-${task.title}`} key={task.id}>
          <details>
            <Details task={task} />
          </details>
        </li>
      )}
    </ul>
  )
}

function Details(props) {
  let task = props.task || {};
  return (

    <section>
        <div>
          <span>{task.title}</span>
          <span>{task.description}</span>
          <span>{task.status}</span>
          <span>{task.assignee}</span>
        </div>
    </section>

  )
}

function App() {
  return (
    <>
      <header>The Task Master</header>
      <main>
        <Tasks />
      </main>
      <footer>&copy; Cristian 2019</footer>
     </>
  );
}

export default App;