import { addDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import recipeCollectionRef from '../recipeCollectionRef';

const AddForm = () => {
    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        await addDoc(recipeCollectionRef, {
            title: title,
            ingredients: ingredients,
        })
            .then((response) => {
                console.log('Document added with id', response.id);
            })
            .catch((err) => console.log(err.message));

        setTitle('');
        setIngredients('');
    };

    return (
        <section className="bg-gray-50">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                            Add new recipe
                        </h1>
                        <form
                            className="space-y-4 md:space-y-6"
                            action="#"
                            onSubmit={(e) => handleSubmit(e)}
                        >
                            <div>
                                <label
                                    htmlFor="title"
                                    className="block mb-2 text-sm font-medium text-gray-900 "
                                >
                                    Title
                                </label>
                                <input
                                    type="title"
                                    name="title"
                                    id="email"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                                    placeholder="Tomato Soup"
                                    required=""
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="ingredients"
                                    className="block mb-2 text-sm font-medium text-gray-900 "
                                >
                                    Recipe
                                </label>
                                <textarea
                                    type="textarea"
                                    name="ingredients"
                                    id="passwingredientsord"
                                    value={ingredients}
                                    onChange={(e) =>
                                        setIngredients(e.target.value)
                                    }
                                    placeholder="Boil water and add tomatos..."
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    required=""
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                            >
                                Save recipe
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AddForm;
