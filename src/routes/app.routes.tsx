import React, { lazy, Suspense } from 'react'
import { Route, Switch, Redirect  } from 'react-router-dom'

import { useUserNampespace } from '../store/main'
import { Default } from '../layout/Default'
import { Empty } from '../layout/Empty'
import { Opening } from '../components/Opening'


const Index = lazy(() => import("../pages/Index").then(module => ({ default: module.Index })))

const SuggestedWords = lazy(() => import("../pages/SuggestedWords").then(({SuggestedWords}) => ({ default: SuggestedWords })))
const SignIn = lazy(() => import("../pages/SignIn").then(({ SignIn }) => ({ default: SignIn })))
const GuessWord = lazy(() => import("../pages/GuessWord").then(({GuessWord}) => ({ default: GuessWord })))
const Word = lazy(() => import("../pages/Word").then(({Word}) => ({ default: Word })))
const Learning = lazy(() => import("../pages/Learning").then(({ Learning }) => ({ default: Learning })));
const Profile = lazy(() => import("../pages/Profile").then(({ Profile }) => ({ default: Profile })));
const MatchSynonyms = lazy(() => import("../pages/MatchSynonyms").then(({ MatchSynonyms }) => ({ default: MatchSynonyms })));


const SuspensedPage: React.FC<{}> = ({ children }) => (
  <Suspense fallback={<Opening />}>
    {children}
  </Suspense>)

export const Routes: React.FC<{}> = () => {
  const { userState } = useUserNampespace()!
  return (
    <Switch>
      <Route exact path="/"> 
        <Default>
          <SuspensedPage children={<Index />} />
        </Default> 
      </Route>
      <Route path="/word/:word" >
        <Empty>
          <SuspensedPage children={<Word />} />
        </Empty>
      </Route>
      <Route path="/exercises/guesswords/:word"> 
        <Empty>
          <SuspensedPage children={<GuessWord />} />
        </Empty>
      </Route>
      <Route path="/exercises/matchsynonyms"> 
        <Empty>
          <SuspensedPage children={<MatchSynonyms />} />
        </Empty>
      </Route>
      <Route path="/suggested">
        <Empty>
          <SuspensedPage children={<SuggestedWords />} />  
        </Empty>
      </Route>

      <Route path="/learning">
        <Empty>
          <SuspensedPage children={<Learning />} />  
        </Empty>
      </Route>

      {!userState.authorized 
        ? <>
            <Route exact path="/login"> 
              <Default>
                <SuspensedPage children={<SignIn />} />
              </Default>
            </Route>
          </>
        : <>
            <Route path="/profile">
              <Default>
                <SuspensedPage children={<Profile />} />
              </Default>
            </Route>
          </>
      }

      <Redirect to="/" />
    </Switch>
  )
}
