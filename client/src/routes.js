import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {LinksPage} from '../src/pages/LinksPage'
import {CreatePage} from '../src/pages/CreatePage'
import {DetailPage} from '../src/pages/DetailPage'
import {AuthPage} from '../src/pages/AuthPage'


export const useRoutes = isAuthentivated => {
    
    if (isAuthentivated) {
        return(
            <Switch>
                <Route path="/links" exact component={LinksPage}/>
                <Route path="/create" exact component={CreatePage}/>
                <Route path="/detail/:id" component={DetailPage}/>
                <Redirect to="/create" />
            </Switch>
        )
    }
    
    return (
        <Switch>
            <Route path="/" exact component={AuthPage}/>
            <Redirect to="/" />
        </Switch>
    )
    
}