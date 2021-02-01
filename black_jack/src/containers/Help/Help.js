import React,{useEffect} from 'react'
import classes from './Help.module.css'
import SurfacePicture from '../../pictures/surface.jpg'

function Help() {

    // const [renders,setRenderes] = useState(0)
    // let x = 0;
    useEffect(()=>{
        console.log('help component is rendering');
        // ssad
    },[])
    console.count();
    return (
        <div className={classes.Help}>
            <h1>BlackJack </h1>
            <img 
                alt="blackjack"
                src={SurfacePicture}></img>
            <p className={classes.firstP}>
                B lackjack is loremMagna qui elit do sit adipisicing minim 
                voluptate excepteur. Minim cillum veniam excepteur magna
                irure mollit ea ex labore proident
                laborum sunt veniam culpa. Dolor
                commodo enim magna in elit dolore
                ullamco in ut cillum minim voluptate ea deserunt. Id laboris in consectetur veniam consectetur elit elit commodo. Lorem labore laboris non officia. Et pariatur mollit incididunt irure consectetur occaecat veniam velit pariatur culpa velit eiusmod. Quis magna ullamco anim deserunt ullamco ex.
            </p>
            
        </div>
    )
}

export default Help
