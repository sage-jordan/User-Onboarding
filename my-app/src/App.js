import React from 'react';
import ReactDOM from 'react-dom';
import MyForm from './MyForm';

function App() {
    return (
        <div>
            <MyForm/>
        </div>
    )
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App/>, rootElement);