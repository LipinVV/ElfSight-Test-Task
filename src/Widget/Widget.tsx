import React, {useEffect, useState} from "react";
import './widget.scss';
import {characterInterface} from "../interfaces";
import {v4 as uuidv4} from 'uuid';
import {fetchCharacters} from "../App";
import { unstable_batchedUpdates } from 'react-dom'

// It's possible to filter Characters by name, status, species, type and gender.

export const Widget = ({pageSize}: any) => {

    const [characters, setCharacters] = useState<characterInterface[]>([]);
    const [filteredCharacters, setFilteredCharacters] = useState<characterInterface[]>([]);
    const [checkedFilterOption, setCheckedFilterOption] = useState<string[]>([]);
    const filterOptions = ['name', 'status', 'species', 'type', 'gender', 'all'];

    const filterHandler = (value: string, array: characterInterface[]) => {
        if (Boolean(value === 'name')) {
            let sortingArray = array.sort((productA: characterInterface, productB: characterInterface) => {
                return productA.name.localeCompare(productB.name)
            })
            setCheckedFilterOption((prevState: string[]) => {
                if (prevState.includes(value)) {
                    return prevState.filter(element => element !== value)
                } else {
                    return [...prevState, value]
                }
            })
            setFilteredCharacters(sortingArray)
        }
        if (Boolean(value === 'status')) {
            let sortingArray = array.sort((productA: characterInterface, productB: characterInterface) => {
                return productB.name.localeCompare(productA.name)
            })
            setCheckedFilterOption((prevState: string[]) => {
                if (prevState.includes(value)) {
                    return prevState.filter(element => element !== value)
                } else {
                    return [...prevState, value]
                }
            })
            setFilteredCharacters(sortingArray)
        }
        return filteredCharacters
    }


    const getAllWords = async () => {
        try {
            const allWordsFromServer = await fetchCharacters(pageSize)
            setCharacters(allWordsFromServer)
            setFilteredCharacters(allWordsFromServer)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getAllWords().then(r => r)
    }, [])

    useEffect(() => {
        fetchCharacters(pageSize).then(data => {
            setCharacters(data)
        })
        // setFilteredCharacters(characters);
    }, [pageSize, filteredCharacters]);

    const filter = (name: string, allCharacters: characterInterface[]) => {
        const arrangedWords = allCharacters.filter((value: characterInterface) => {
            if (name === '') {
                return value;
            }
            if (value.name.toLowerCase().includes(name.toLowerCase()) ||
                value.name.toLowerCase().includes(name.toLowerCase())) {
                return value;
            }
        })
        setFilteredCharacters(arrangedWords)
    }
    console.log('checkedFilterOption', checkedFilterOption)

    return (
        <div className='widget'>
            <div className='widget__filter'>Filter
                <input
                    className='dictionary__input'
                    type='text'
                    placeholder='Type a name...'
                    onChange={(evt) => filter(evt.target.value, characters)}
                />
                {filterOptions.map((option: string) => {
                    return (
                        <div key={uuidv4()}
                             className='widget__filter-options'>
                            <label className='widget__filter-option'>
                                <input
                                    value={option}
                                    onChange={(evt: React.ChangeEvent<HTMLInputElement>) => filterHandler(evt.target.value, characters)}
                                    className='filtered-results-category-input'
                                    type='checkbox'
                                    checked={checkedFilterOption.includes(option)}
                                />{option}
                            </label>
                        </div>
                    )
                })}
            </div>
            <div className='widget__characters'>
                {Boolean(filteredCharacters) && filteredCharacters.map((character: characterInterface) => {
                    return (
                        <ul
                            key={uuidv4()}
                            className='widget__character'
                        >
                            <li className='widget__character-info'>{character.name}</li>
                            <li className='widget__character-info'>
                                <img className="widget__character-img" src={character.image} alt={character.name}></img>
                            </li>
                            <button
                                className='widget__character-info-button'
                                type='button'
                            >Show information
                            </button>
                        </ul>
                    )
                })}
            </div>
        </div>
    )
}