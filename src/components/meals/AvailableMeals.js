import classes from './AvailableMeals.module.css'

import Card from '../ui/Card'
import MealItem from './meal-item/MealItem'

import { useEffect, useState } from 'react'

// const DUMMY_MEALS = [
//     {
//         id: 'm1',
//         name: 'Sushi',
//         description: 'Finest fish and veggies',
//         price: 22.99,
//     },
//     {
//         id: 'm2',
//         name: 'Schnitzel',
//         description: 'A german specialty!',
//         price: 16.5,
//     },
//     {
//         id: 'm3',
//         name: 'Barbecue Burger',
//         description: 'American, raw, meaty',
//         price: 12.99,
//     },
//     {
//         id: 'm4',
//         name: 'Green Bowl',
//         description: 'Healthy...and green...',
//         price: 18.99,
//     },
// ];

const AvailableMeals = () => {

    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [httpError, setHttpError] = useState(null);

    useEffect(() => {
        setIsLoading(true)
        const fetchMeals = async () => {
            const response = await fetch('https://react-demo-58101-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json')

            if (!response.ok) {
                throw new Error('Something went wrong!')
            }
            const responseData = await response.json()
            const loadMeals = []

            for (const key in responseData) {
                loadMeals.push({
                    id: key,
                    name: responseData[key].name,
                    description: responseData[key].description,
                    price: responseData[key].price
                })
            }
            setMeals(loadMeals);
            setIsLoading(false);
        };

        fetchMeals().catch(err => {
            setHttpError(err.message)
            setIsLoading(false);
        })
    }, []);

    if (isLoading) {
        return (
            <section className={classes.MealsLoading}>
                <h1>Loading...</h1>
            </section>
        )
    }

    if (httpError) {
        return (
            <section className={classes.MealsError}>
                <h3>{httpError}</h3>
            </section>
        )
    }

    const mealsList = meals.map(meal => (
        <MealItem
            id={meal.id}
            key={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
        />))

    return (
        <section className={classes.meals}>
            <Card>
                <ul>
                    {mealsList}
                </ul>
            </Card>
        </section>
    )
};

export default AvailableMeals;