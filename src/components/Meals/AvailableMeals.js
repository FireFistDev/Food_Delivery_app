import {React, useEffect, useState} from 'react'
import Card from '../UI/Card';
import classes from './AvailableMeals.module.css'
import MealItem from './MealItems/MealItem';

const AvailableMeals = () => {
  const [meals,setMeals]=useState([])
  const [isLoading,setIsloading] = useState(false)
  const [httpsError, setHttpsError] = useState(null)
  useEffect(()=>{
    const fetchMeals = async ()=>{
      try{setIsloading(true)
      const response = await fetch('https://react-learn-3d4e2-default-rtdb.firebaseio.com/meals.json')
      if(!response.ok){
        throw new Error('something went wrong !')
      }
      const ResponseData = await response.json()
      const mealsData = []
      for(let key in ResponseData){
        mealsData.push({
          id:key,
          name:ResponseData[key].name,
          description:ResponseData[key].description,
          price:ResponseData[key].price
        })
      }
      setMeals(mealsData)
      setIsloading(false)
    }catch(error){
      setHttpsError(error.message)
    }
    }
    fetchMeals()
  },[]) 
    const mealsList = meals.map(meal=> <MealItem id={meal.id} key={meal.id} name={meal.name} description={meal.description} price={meal.price} />)
  return (
    <section className={classes.meals}>
        <Card>
        {httpsError && <p>{httpsError}</p>}
        {isLoading && <p>Loading...</p>}
        <ul>
        {!isLoading && mealsList}
        </ul>
        </Card>
    </section>
  )
}

export default AvailableMeals