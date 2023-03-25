
import './App.css';
import WorkerProfile from './components/WorkerProfile';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function App() {
  return (
    
    <Card  className="App" >
      <Card.Header>

      </Card.Header>
      <Card.Body>
        <WorkerProfile  />
      </Card.Body>
      <Card.Footer>
        
      </Card.Footer>
      
     
    </Card>
    
  );
}

export default App;
