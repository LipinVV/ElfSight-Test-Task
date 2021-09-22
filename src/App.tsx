import React, {useState} from 'react';
import './App.scss';
import {Widget} from "./Widget/Widget";
import {characterInterface} from "./interfaces";

const firstPageNumber = 1;

export const fetchCharacters = (page: number) => {
    return fetch(`https://rickandmortyapi.com/api/character/?page=${page}`).then(response => {
        return response.json();
    }).then(data => {
        return data.results.map((character: characterInterface) => {
            return character
        })
    }).catch((reason => console.log(reason)))
}


function App() {

    const [currentPageNumber, setCurrentPageNumber] = useState(firstPageNumber);

    const handleClickIncreasePageNumber = () => {
        setCurrentPageNumber(prevState => prevState + 1);
    }

    const handleClickDecreasePageNumber = () => {
        setCurrentPageNumber(prevState => prevState - 1);
    }

    return (
        <div className="app">
            <h1 className='app__header'>Rick and Morty</h1>
            <Widget pageSize={currentPageNumber}/>
            <div className='app__control-buttons'>
                <button
                    className='app__control-button'
                    type='button'
                    onClick={handleClickDecreasePageNumber}
                    disabled={currentPageNumber === 1}
                >Previous page
                </button>
                <button
                    className='app__control-button'
                    type='button'
                    onClick={handleClickIncreasePageNumber}
                    disabled={currentPageNumber === 34}
                >Next page</button>
                {currentPageNumber === 34 &&
                <button
                    className='app__control-button'
                    type='button'
                    onClick={() => setCurrentPageNumber(1)}
                >
                    To the first page
                </button>}
                <span className='app__control-current-page'>current page is: {currentPageNumber}</span>
            </div>
        </div>
    );
}

export default App;
