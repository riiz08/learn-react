import { useState } from 'react';


function App() {
  
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  
  const fullname = firstname + ' ' + lastname;
  
  
  function handleFirstNameChange(e) {
    setFirstName(e.target.value);
  }
  
  function handleLastNameChange(e) {
    setLastName(e.target.value);
  }
  
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('typing');


  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('submitting');
    try {
      await submitForm(answer);
      setStatus('success');
    } catch (err) {
      setStatus('typing');
      setError(err);
    }
  }

  function handleTextareaChange(e) {
    setAnswer(e.target.value);
  }

  
  return (
    <div className="p-5 bg-dark min-vh-100">
    <div className="fw-bolder fs-6 text-white text-center">
    <h3 className="mb-6">Learn react state</h3>
    </div>
    <div className="container">
    <div className="row">
    <div className="col-md-6">
    <div className="card">
    <div className="card-body fw-semibold">
    <form>
    <div className="mb-3">
    <label htmlFor="firstname" className="form-label"> Firstname
    <input type="text" value={firstname} onChange={handleFirstNameChange} name="firstname" id="firstname" className="form-control"/>
    </label>
    </div>
    
    <div className="mb-3">
    <label htmlFor="lastname" className="form-label"> Lastname
    <input type="text" value={lastname} onChange={handleLastNameChange} name="lastname" id="lastname" className="form-control"/>
    </label>
    </div>
    </form>
    </div>
    <div className="card-footer text-center">
    My name is <b>{fullname}</b>
    </div>
    </div>
    </div>
    </div>
    </div>
    
    
     <div className="container mt-5">
    <div className="row">
    <div className="col-md-6">
    <div className="card">
    <form onSubmit={handleSubmit}>
    <div className="card-body">
    <h2>Quiz</h2>
    <p>Siapa presiden indonesia yang pertama ?</p>
    <label htmlFor="answer">
    <textarea className="form-control" placeholder="Your answer" value={answer} onChange={handleTextareaChange} disabled={status === 'submiting'} name="answer" id="answer"/>
    </label>
    {status === 'success' && <p className="alert alert-info">Jawaban kamu benar!!</p>}
    {error !== null && 
      <p className="alert alert-danger">{error.message}</p>
    }
    </div>
    <div className="card-footer text-center">
    <button className="btn btn-primary" disabled={answer.length === 0 && 'submitting'}>Submit</button>
    </div>
    </form>
    </div>
    </div>
    </div>
    </div>
    
    
    </div>
    )
}

function submitForm(answer) {
  // Pretend it's hitting the network.
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let shouldError = answer.toLowerCase() !== 'soekarno'
      if (shouldError) {
        reject(new Error('Jawaban kamu bagus tapi sayang sekali salah, Ayo coba lagi!'));
      } else {
        resolve();
      }
    }, 1500);
  });
}


export default App;