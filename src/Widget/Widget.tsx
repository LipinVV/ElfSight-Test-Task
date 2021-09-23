import React, {useEffect, useState} from "react";
import './widget.scss';
import {characterInterface} from "../interfaces";
import {v4 as uuidv4} from 'uuid';
import {fetchCharacters} from "../App";


export const Widget = ({pageSize}: any) => {
// It's possible to filter Characters by name, status, species, type and gender.
    // Dead', 'Alive', 'unknown'
    // 'Male', 'unknown', 'Female'
    // Human', 'Alien', 'Poopybutthole', 'Myth'
    // 'Fish-Person', '', 'Cromulon', 'Self-aware arm'
    const [characters, setCharacters] = useState<characterInterface[]>([]);
    const [filteredCharacters, setFilteredCharacters] = useState<characterInterface[]>([]);
    const [checkedFilterOption, setCheckedFilterOption] = useState<string[]>([]);
    const filterOptions = ['name', 'status', 'species', 'type', 'gender', 'all'];
    const [showFilterSection, setShowFilterSection] = useState(false);


    useEffect(() => {
        getAllData()
    }, [pageSize])

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
                return productB.status.localeCompare(productA.status)
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
        return array
    }

    const getAllData = async () => {
        try {
            const allWordsFromServer = await fetchCharacters(pageSize)
            setCharacters(allWordsFromServer)
            setFilteredCharacters(allWordsFromServer)
        } catch (error) {
            console.error(error)
        }
    }

    const inputFilterHandler = (inputValue: string, allCharacters: characterInterface[]) => {
        const filteredArray = allCharacters.filter((value: characterInterface) => {
            if (inputValue === '') {
                return value;
            }
            if (value.name.toLowerCase().includes(inputValue.toLowerCase()) ||
                value.name.toLowerCase().includes(inputValue.toLowerCase())) {
                return value;
            }
            if (value.gender.toLowerCase().includes(inputValue.toLowerCase()) ||
                value.gender.toLowerCase().includes(inputValue.toLowerCase())) {
                return value;
            }
        })
        setFilteredCharacters(filteredArray)
    }
    const [openedCard, setOpenedCard] = useState<any>([])
    const popUpHandler = (index : number) => {
        setOpenedCard((prevState : number[]) => prevState.includes(index) ? prevState.filter((value : number) => value !== index) : [...prevState, index])
    }

    return (
        <div className='widget'>
            <button className='widget__menu-button' onClick={() => setShowFilterSection(prevState => !prevState)}>Filter</button>
            {showFilterSection &&<div className='widget__filter'>
                <label className='widget__filter-label'>
                    <input
                        className='widget__filter-input'
                        type='text'
                        placeholder='type a name...'
                        onChange={(evt : React.ChangeEvent<HTMLInputElement>) => inputFilterHandler(evt.target.value, characters)}
                    />
                </label>
                {filterOptions.map((option: string) => {
                    return (
                        <div key={uuidv4()}
                             className='widget__filter-options'>
                            <label      className={checkedFilterOption.includes(option) ? 'widget__filter-option widget__filter-option-checked' : 'widget__filter-option'}>
                                <input
                                    value={option}
                                    onChange={(evt: React.ChangeEvent<HTMLInputElement>) => filterHandler(evt.target.value, characters)}
                                    className='widget__filter-checkbox'
                                    type='checkbox'
                                    checked={checkedFilterOption.includes(option)}
                                />{option}
                            </label>
                        </div>
                    )
                })}
            </div>}
            <div className='widget__characters'>
                {Boolean(filteredCharacters) && filteredCharacters.map((character: characterInterface, index) => {
                    let showStatus = false
                    if (openedCard.includes(index)) {
                        showStatus = true;
                    }
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
                                onClick={() => popUpHandler(index)}
                            >Show information
                            </button>
                            {
                                showStatus === true &&
                                <ul className='widget__pop-up'>
                                    <button onClick={() => popUpHandler(index)}>Close</button>
                                    <li>{character.id}</li>
                                    <li>{character.species}</li>
                                    <li></li>
                                </ul>
                            }
                        </ul>
                    )
                })}
            </div>
        </div>
    )
}