import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from '../Firebase/firebaseConfig'
import ReactTooltip from 'react-tooltip';

const Logout = () => {

    const [checked, setChecked] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        if(checked){
            signOut(auth)
            .then(() => {
                setTimeout(() => {
                    navigate('/');
                }, 1000);
            }).catch((error) => {
                console.log("error")
            })
        }
    }, [checked])

    const handleChange = e => {
        setChecked(e.target.checked)
    }
    const handleMouseEnter = () => {
        ReactTooltip.show(); // Affiche l'infobulle
    };

    const handleMouseLeave = () => {
        ReactTooltip.hide(); // Masque l'infobulle
    };
  return (
    <div className='logoutContainer'>
        <label className='switch'>
            <input onChange={handleChange} type='checkbox' checked={checked} onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}/>
            <span className='slider round' data-tip="Déconnexion"></span>
        </label>
  {/*<ReactTooltip place="left" effect="solid"/>*/}
      
    </div>
  )
}

export default Logout
