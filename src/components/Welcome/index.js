import React, {useState, Fragment, useEffect} from 'react'
import { onAuthStateChanged } from 'firebase/auth' 
import { auth, user } from '../Firebase/firebaseConfig'
import {useNavigate } from 'react-router-dom';
import { getDoc } from 'firebase/firestore'; 

import Logout from '../Logout'
import Quiz from '../Quiz'
import Loader from '../Loader';

const Welcome = () => {

  const navigate = useNavigate();
  const [userSession, setUserSession] = useState(null);
  const [userData, setUserData] = useState({});
  useEffect(() => {
    const listner = onAuthStateChanged(auth, user => {
      user ? setUserSession(user) : navigate('/')
    })
    if(!!userSession){
      const colRef = user(userSession.uid);
      getDoc(colRef) 
      .then(snapshot => {
        if(snapshot.exists()){
          const myData = snapshot.data()
          setUserData(myData)
        }
      })
      .catch(error => {
        console.log(error)
      })
    }
    
    return listner();
    
  }, [userSession])
  return userSession === null ? (
    <Loader 
      loadingMsg={"Authentification..."} 
      styling={{textAlign: 'center', color: 'red'}}
    /> 
    
  ) : (
    <div className='quiz-bg'>
      <div className='container'>
        <Logout/>
        <Quiz userData={userData}/>
      </div>
    </div>
    )
  
}

export default Welcome
