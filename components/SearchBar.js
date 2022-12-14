import { useState } from "react"

export default function SearchBar({inputValue, setInputValue, searchOnCityArray} ){

    return(
        <>
        <form onSubmit={(e)=>{e.preventDefault()}}>   
            <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
            <div className="flex flex-row justify-center items-center ">
                <input onChange={searchOnCityArray} defaultValue={inputValue} type="search" id="default-search" className=" w-2/4 p-4 rounded pl-10 text-sm text-gray-900 bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search a new city" required/>
            </div>
        </form>
    </>
    )
}