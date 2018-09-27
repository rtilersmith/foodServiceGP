import React, { Component } from 'react'
import Map from '../RP/Map'
import Nav from '../Reuse/Nav'
import LessRandom from '../Reuse/lessRandom';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { createFavorite } from '../../Redux/reducers/favorites'

class ListView extends Component {

    componentDidMount(){
        if(!this.props.fiveList.length){
            this.props.history.push('/')
        }
    }

    render() {
        let { fiveList, user } = this.props
        return (
            <div>
                <Nav/>
                <div>
                    <Map styles={{ height: '40vh'}} zoom='10'/>
                </div>
                <div style={{ height: '60vh', backgroundColor: 'render'}}>
                   <ul>
                        {fiveList.map((rest)=>(
                       <li className="restListItem" key={rest.id} >
                        <h3>Name:{rest.name}</h3>
                        <h3>Address: {rest.location.address1}</h3>
                        <h3>Type: {rest.categories[0].alias}</h3>
                        <h3>Price Range: {rest.price}</h3>
                        <button onClick={() => {this.props.createFavorite(rest.id, user.id)}}>Add To Favorites</button>
                        <Link to={`/restaurants/${rest.id}`} restaurant={rest}>View More</Link>
                       </li>
                    ))}
                   </ul>                       
                </div>
                <LessRandom/>
            </div>
        )
    }
}

let mapStateToProps=(state)=>{
    return {
        fiveList:state.rest.fiveList,
        user: state.user.data
    }
}

export default connect(mapStateToProps, {createFavorite})(ListView)
