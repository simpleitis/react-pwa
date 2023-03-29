import { collection } from 'firebase/firestore';
import { db } from './firebase';

const recipeCollectionRef = collection(db, 'recipies');

export default recipeCollectionRef;
