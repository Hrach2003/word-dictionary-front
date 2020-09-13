import React, { lazy, Suspense } from 'react'
import { Route, Switch, Redirect  } from 'react-router-dom'

import { Index } from '../pages/Index'
import { SignIn } from '../pages/SignIn'
import { useStore } from '../store/main'
import { Profile } from '../pages/Profile'
import { Default } from '../layout/Default'
import { Empty } from '../layout/Empty'
import { Opening } from '../components/Opening'

const SuggestedWords = lazy(() => import("../pages/SuggestedWords").then(module => ({ default: module.SuggestedWords })))
const GuessWord = lazy(() => import("../pages/GuessWord").then(module => ({ default: module.GuessWord })))
const Word = lazy(() => import("../pages/Word").then(module => ({ default: module.Word })))
// {
//   return (async () => {
//    const { SuggestedWords } = await 
//    return SuggestedWords
//   })()
// })

const SuspensedPage: React.FC<{}> = ({ children }) => (
  <Suspense fallback={<Opening />}>
    {children}
  </Suspense>)

export const Routes = () => {
  const { userState } = useStore()
  return (
    <Switch>
      <Route exact path="/">
        <Default>
          <Index />
        </Default> 
      </Route>
      <Route path="/word/:word" >
        <Empty>
          <SuspensedPage children={<Word />} />
        </Empty>
      </Route>
      {!userState.authorized 
        ? <><Route path="/login"> 
            <Default children={<SignIn />} />
          </Route></>
        : <Route path="/profile">
            <Default children={<Profile />} />
        </Route>
      }
      <Route path="/exercizes/:word"> 
        <Empty>
          <SuspensedPage children={<GuessWord />} />
        </Empty>
      </Route>
      <Route path="/suggested">
        <Empty>
          <SuspensedPage children={<SuggestedWords />} />  
        </Empty>
      </Route>

      <Redirect to="/" />
    </Switch>
  )
}