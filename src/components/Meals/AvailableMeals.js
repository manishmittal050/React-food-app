import { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";



const AvailableMeals = () => {

  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {

    const fetchMeals = async () => {
      try {
        const response = await fetch('https://react-http-efe63-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json');
        const responseData = await response.json();

        const loadedMeals = [];

        for (const key in responseData) {
          loadedMeals.push({
            id: key,
            name: responseData[key].name,
            description: responseData[key].description,
            price: responseData[key].price
          })
        }

        setMeals(loadedMeals);
        setIsLoading(false);
      }
      catch (error) {
        setIsLoading(false);
        setHttpError(error.message);
      }
    }

    try {
      fetchMeals();
    } catch (error) {

    }

  }, [])


  if (isLoading) {
    return <section>
      <p className={classes.MealsLoading}>Loading...</p>
    </section>
  }

  if(httpError){
    return (<section>
      <p className={classes.MealsError}>{httpError}</p>
    </section>)
  }

  const mealList = meals.map(meal => <MealItem
    key={meal.id}
    id={meal.id}
    name={meal.name}
    description={meal.description}
    price={meal.price} />);


  return (
    <section className={classes.meals}>
      <Card>
        <ul>
          {mealList}
        </ul>
      </Card>
    </section>
  )

}


export default AvailableMeals;