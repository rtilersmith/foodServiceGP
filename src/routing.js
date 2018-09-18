import React from 'react'
import { Route, Switch } from 'react-router-dom'

//importing components 
import Landing from './App'
import PrimaryView from './Components/Pages/PrimaryView'
import FullView from './Components/Pages/FullView'
import Favorites from './Components/Pages/Favorites'

export default function () {
    return (
        <Switch>
            <Route exact path='/' component={Landing} />
            <Route path='/restaurants' component={PrimaryView} />
            <Route path='/restaurants/:restId' component={FullView} />
            <Route path='/favorites' component={Favorites} />
        </Switch>
    )
}