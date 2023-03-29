import React, { useEffect, useState } from 'react';
import AddForm from './AddForm';
import { deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { AiFillDelete } from 'react-icons/ai';
import recipeCollectionRef from '../recipeCollectionRef';
import { db } from '../firebase';

const Homepage = () => {
    const [recipes, setRecipes] = useState([]);

    const handleDelete = (id) => {
        const docRef = doc(db, 'recipies', id);
        deleteDoc(docRef)
            // no response is send back on delete
            .then(() => console.log('Document deleted'))
            .catch((err) => console.log(err.message));
    };

    useEffect(() => {
        const unsubscribe = onSnapshot(recipeCollectionRef, (snapshot) => {
            setRecipes(
                snapshot.docs.map((doc) => {
                    return {
                        id: doc.id,
                        title: doc.data().title,
                        ingredients: doc.data().ingredients,
                    };
                })
            );
        });
        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 p-10">
            <div className="flex flex-col items-center">
                {recipes.map((recipe) => {
                    return (
                        <div
                            className="m-2 border rounded-sm w-[80%] "
                            key={recipe.id}
                        >
                            <div className="flex justify-between bg-slate-200 rounded-sm">
                                <p className="mb-1 p-2 bg-slate-200 rounded-sm">
                                    {recipe.title}
                                </p>
                                <button
                                    className="p-2 text-slate-500 hover:text-slate-900"
                                    onClick={() => handleDelete(recipe.id)}
                                >
                                    <AiFillDelete />
                                </button>
                            </div>
                            <p className="p-2">
                                Ingredients: {recipe.ingredients}
                            </p>
                        </div>
                    );
                })}
            </div>
            <AddForm />
        </div>
    );
};

export default Homepage;
