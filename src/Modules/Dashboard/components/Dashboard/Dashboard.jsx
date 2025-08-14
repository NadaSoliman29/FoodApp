import React from 'react'
import Header from '../../../Shared/components/Header/Header'
import FillRecipes from '../../../Shared/components/FillRecipes/FillRecipes'

export default function Dashboard({ loginData }) {
  console.log(loginData)
  return (
<>

   <Header  title={
    <>
      <span className="fw-bold">Welcome</span> {loginData?.userName || ''}
    </>
  } desc={'This is a welcoming screen for the entry of the application ,you can now see the options'}
   />
    <FillRecipes/>
    

</>
  )
}
